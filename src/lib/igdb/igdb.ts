import { createServerFn } from '@tanstack/react-start'
import { games } from '@/data/games'
import { env } from '@/env'

export type GameDetails = {
  summary?: string
  releaseYear?: number
  genres: string[]
  developers: string[]
  publishers: string[]
  heroUrl?: string
  iconUrl?: string
}

export type GameDetailsMap = Record<string, GameDetails>

type IgdbImage = {
  image_id: string
  width?: number
  height?: number
  alpha_channel?: boolean
}

type IgdbGame = {
  name: string
  summary?: string
  first_release_date?: number
  total_rating_count?: number
  genres?: { name: string }[]
  involved_companies?: {
    developer: boolean
    publisher: boolean
    company: { name: string }
  }[]
  cover?: IgdbImage
  artworks?: IgdbImage[]
  screenshots?: IgdbImage[]
}

const DETAILS_TTL = 24 * 60 * 60 * 1000
const MAX_RETRIES = 3
const MAX_RETRY_DELAY = 8_000

enum GameType {
  MAIN_GAME = 0,
  EXPANSION = 2,
  BUNDLE = 3,
  STANDALONE_EXPANSION = 4,
  EXPANDED_GAME = 10,
  REMAKE = 8,
  REMASTER = 9,
}

let token: { value: string; expiresAt: number } | null = null
let details: { value: GameDetailsMap; expiresAt: number } | null = null
let inflight: Promise<GameDetailsMap> | null = null

function imageUrl(image: IgdbImage | undefined, size: string) {
  return image
    ? `https://images.igdb.com/igdb/image/upload/${size}/${image.image_id}.jpg`
    : undefined
}

function retryDelay(response: Response, attempt: number) {
  const fallback = 1000 * 2 ** attempt
  const header = response.headers.get('retry-after')
  if (!header) return fallback
  const seconds = Number(header)
  const ms = Number.isFinite(seconds)
    ? seconds * 1000
    : Date.parse(header) - Date.now()
  if (!Number.isFinite(ms) || ms < 0) return fallback
  return Math.min(ms, MAX_RETRY_DELAY)
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function fetchWithRetry(input: string, init: RequestInit, label: string) {
  for (let attempt = 0; ; attempt++) {
    const response = await fetch(input, init)
    if (
      (response.status !== 429 && response.status < 500) ||
      attempt >= MAX_RETRIES
    )
      return response
    const delay = retryDelay(response, attempt)
    console.error(
      `[igdb] ${label} responded ${response.status}, retrying in ${delay}ms (${attempt + 1}/${MAX_RETRIES})`,
    )
    await response.text()
    await wait(delay)
  }
}

async function accessToken() {
  if (token && token.expiresAt > Date.now()) return token.value
  const params = new URLSearchParams({
    client_id: env.TWITCH_IGDB_CLIENT_ID,
    client_secret: env.TWITCH_IGDB_SECRET,
    grant_type: 'client_credentials',
  })
  const response = await fetchWithRetry(
    `https://id.twitch.tv/oauth2/token?${params}`,
    { method: 'POST' },
    'token',
  )
  if (!response.ok) {
    console.error(
      `[igdb] Twitch token request responded ${response.status}: ${await response.text()}`,
    )
    throw new Error('Failed to authenticate with IGDB')
  }
  const body = (await response.json()) as {
    access_token: string
    expires_in: number
  }
  token = {
    value: body.access_token,
    expiresAt: Date.now() + (body.expires_in - 60) * 1000,
  }
  return token.value
}

function isBanner(image: IgdbImage) {
  return (
    !image.alpha_channel &&
    image.width !== undefined &&
    image.height !== undefined &&
    image.width / image.height >= 1.5
  )
}

function widestBanner(images: IgdbImage[] = []) {
  return images
    .filter(isBanner)
    .toSorted((a, b) => (b.width ?? 0) - (a.width ?? 0))
    .at(0)
}

function heroImage(game: IgdbGame) {
  return (
    widestBanner(game.artworks) ??
    widestBanner(game.screenshots) ??
    game.artworks?.at(0) ??
    game.screenshots?.at(0) ??
    game.cover
  )
}

function nameKey(name: string) {
  return name.trim().toLowerCase()
}

function quote(name: string) {
  return `"${name.replaceAll('\\', '\\\\').replaceAll('"', '\\"')}"`
}

async function fetchGames(names: string[]): Promise<IgdbGame[]> {
  const query = [
    'fields name,summary,first_release_date,total_rating_count,genres.name,involved_companies.developer,involved_companies.publisher,involved_companies.company.name,cover.image_id,artworks.image_id,artworks.width,artworks.height,artworks.alpha_channel,screenshots.image_id,screenshots.width,screenshots.height;',
    `where (${names.map((name) => `name ~ ${quote(name)}`).join(' | ')}) & game_type = (${GameType.MAIN_GAME},${GameType.EXPANSION},${GameType.BUNDLE},${GameType.STANDALONE_EXPANSION},${GameType.REMAKE},${GameType.REMASTER},${GameType.EXPANDED_GAME});`,
    'limit 250;',
  ].join('\n')
  const response = await fetchWithRetry(
    'https://api.igdb.com/v4/games',
    {
      method: 'POST',
      headers: {
        'Client-ID': env.TWITCH_IGDB_CLIENT_ID,
        Authorization: `Bearer ${await accessToken()}`,
        Accept: 'application/json',
      },
      body: query,
    },
    'games',
  )
  if (!response.ok) {
    console.error(
      `[igdb] games request responded ${response.status}: ${await response.text()}`,
    )
    throw new Error('Failed to fetch games from IGDB')
  }
  return (await response.json()) as IgdbGame[]
}

function toDetails(game: IgdbGame): GameDetails {
  const companies = game.involved_companies ?? []
  return {
    summary: game.summary,
    releaseYear: game.first_release_date
      ? new Date(game.first_release_date * 1000).getUTCFullYear()
      : undefined,
    genres: (game.genres ?? []).map((genre) => genre.name),
    developers: companies
      .filter((item) => item.developer)
      .map((item) => item.company.name),
    publishers: companies
      .filter((item) => item.publisher)
      .map((item) => item.company.name),
    heroUrl: imageUrl(heroImage(game), 't_1080p'),
    iconUrl: imageUrl(game.cover, 't_thumb'),
  }
}

async function loadDetails(): Promise<GameDetailsMap> {
  const results = await fetchGames(games.map((game) => game.name))
  const best = new Map<string, IgdbGame>()
  for (const result of results) {
    const key = nameKey(result.name)
    const current = best.get(key)
    if (
      !current ||
      (result.total_rating_count ?? 0) > (current.total_rating_count ?? 0)
    ) {
      best.set(key, result)
    }
  }
  const map: GameDetailsMap = {}
  for (const game of games) {
    const match = best.get(nameKey(game.name))
    if (match) map[game.name] = toDetails(match)
  }
  return map
}

export const getGameDetails = createServerFn({ method: 'GET' }).handler(
  async (): Promise<GameDetailsMap> => {
    if (details && details.expiresAt > Date.now()) return details.value
    inflight ??= loadDetails()
      .then((value) => {
        details = { value, expiresAt: Date.now() + DETAILS_TTL }
        return value
      })
      .finally(() => {
        inflight = null
      })
    return inflight
  },
)
