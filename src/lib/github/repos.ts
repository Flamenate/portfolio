import { createServerFn } from '@tanstack/react-start'

export type Repo = { name: string; fork: boolean }

type GithubRepo = { name: string; fork: boolean; archived: boolean }

export const GITHUB_USER = 'Flamenate'
const REPOS_TTL = 60 * 60 * 1000

let repos: { value: Repo[]; expiresAt: number } | null = null
let inflight: Promise<Repo[]> | null = null

async function fetchRepos(): Promise<Repo[]> {
  const params = new URLSearchParams({
    type: 'owner',
    sort: 'pushed',
    direction: 'desc',
    per_page: '100',
  })
  const response = await fetch(
    `https://api.github.com/users/${GITHUB_USER}/repos?${params}`,
    {
      headers: {
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
    },
  )
  if (!response.ok) {
    console.error(
      `[github] repos request responded ${response.status}: ${await response.text()}`,
    )
    throw new Error('Failed to fetch repos from GitHub')
  }
  const body = (await response.json()) as GithubRepo[]
  return body
    .filter((repo) => !repo.archived)
    .map(({ name, fork }) => ({ name, fork }))
}

export const getRepos = createServerFn({ method: 'GET' }).handler(
  async (): Promise<Repo[]> => {
    if (repos && repos.expiresAt > Date.now()) return repos.value
    inflight ??= fetchRepos()
      .then((value) => {
        repos = { value, expiresAt: Date.now() + REPOS_TTL }
        return value
      })
      .finally(() => {
        inflight = null
      })
    return inflight
  },
)
