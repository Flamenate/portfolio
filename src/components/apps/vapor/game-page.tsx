import { ArrowDownloadRegular } from '@fluentui/react-icons/headless/svg/arrow-download'
import { ArrowLeftRegular } from '@fluentui/react-icons/headless/svg/arrow-left'
import { ClockRegular } from '@fluentui/react-icons/headless/svg/clock'
import { format, parseISO } from 'date-fns'
import type { ReactNode } from 'react'
import { NavButton } from '@/components/ui/nav-button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import type { OwnedGame } from '@/lib/igdb/games'
import type { GameDetails } from '@/lib/igdb/igdb'
import { cn } from '@/lib/utils'
import { useGameDetails } from '../../../lib/igdb/details'

type GamePageProps = { game: OwnedGame; onBack: () => void }

function formatPlaytime(minutes: number) {
  if (minutes < 60) return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`
  const hours = Math.round(minutes / 60)
  return `${hours} ${hours === 1 ? 'hour' : 'hours'}`
}

function Skeleton({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'block animate-pulse rounded-xs bg-[#3d4450]/60',
        className,
      )}
    />
  )
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-2 text-xs font-semibold tracking-wider text-[#8b929a] uppercase">
      {children}
    </h2>
  )
}

function Stat({
  icon,
  label,
  children,
}: {
  icon?: ReactNode
  label: string
  children: ReactNode
}) {
  return (
    <div className="flex items-center gap-2.5">
      {icon}
      <div className="leading-tight">
        <div className="text-xs font-semibold tracking-wide text-[#b8bcbf] uppercase">
          {label}
        </div>
        <div className="text-[13px] text-[#8b929a]">{children}</div>
      </div>
    </div>
  )
}

function InstallButton() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span
          tabIndex={0}
          aria-disabled
          className="inline-flex cursor-not-allowed rounded-xs outline-none focus-visible:ring-2 focus-visible:ring-[#1a9fff]/50"
        >
          <span className="pointer-events-none inline-flex h-11 opacity-50 grayscale-[0.6]">
            <button
              type="button"
              disabled
              tabIndex={-1}
              className="flex items-center gap-2.5 rounded-l-xs bg-[linear-gradient(90deg,#47bfff_0%,#1a7fe8_45%,#1a44c2_100%)] px-6 text-base font-medium tracking-wide text-white uppercase shadow-[0_2px_6px_rgb(0_0_0/0.35)]"
            >
              <ArrowDownloadRegular className="size-5" />
              Install
            </button>
          </span>
        </span>
      </TooltipTrigger>
      <TooltipContent
        side="top"
        sideOffset={8}
        className="border-[#4a5360] bg-linear-to-b from-[#3d4450] to-[#2a2f38] text-[#dcdedf] shadow-[0_4px_12px_rgb(0_0_0/0.5)] backdrop-blur-none"
      >
        Not supported on FlameOS
      </TooltipContent>
    </Tooltip>
  )
}

function StatRow({
  game,
  details,
  loading,
}: {
  game: OwnedGame
  details?: GameDetails
  loading: boolean
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-b border-white/5 bg-linear-to-r from-black/40 via-black/25 to-black/10 px-6 py-4">
      <InstallButton />
      <Stat label="Released">
        {loading ? (
          <Skeleton className="mt-1 h-3 w-10" />
        ) : (
          (details?.releaseYear ?? 'Unknown')
        )}
      </Stat>
      <Stat label="Last played">
        {format(parseISO(game.lastPlayed), 'MMM d, yyyy')}
      </Stat>
      <Stat
        label="Play time"
        icon={<ClockRegular className="size-7 text-[#8b929a]" />}
      >
        {formatPlaytime(game.playtimeMinutes)}
      </Stat>
    </div>
  )
}

function CompanyList({ label, names }: { label: string; names: string[] }) {
  return (
    <div>
      <dt className="text-xs tracking-wide text-[#8b929a] uppercase">
        {label}
      </dt>
      <dd className="text-[13px] text-[#dcdedf]">
        {names.length > 0 ? names.join(', ') : 'Unknown'}
      </dd>
    </div>
  )
}

function Details({
  details,
  loading,
}: {
  details?: GameDetails
  loading: boolean
}) {
  if (loading) {
    return (
      <div className="grid gap-6 px-6 py-5 @3xl:grid-cols-[minmax(0,1fr)_16rem]">
        <div className="space-y-2">
          <Skeleton className="mb-4 h-3 w-16" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-11/12" />
          <Skeleton className="h-3 w-4/5" />
        </div>
        <Skeleton className="h-28" />
      </div>
    )
  }
  return (
    <div className="grid gap-6 px-6 py-5 @3xl:grid-cols-[minmax(0,1fr)_16rem]">
      <div className="min-w-0">
        <SectionTitle>About</SectionTitle>
        <p className="leading-relaxed text-[#acb2b8]">
          {details?.summary ?? 'No description available.'}
        </p>
        {details && details.genres.length > 0 && (
          <div className="mt-5">
            <SectionTitle>Genres</SectionTitle>
            <ul className="flex flex-wrap gap-1.5">
              {details.genres.map((genre) => (
                <li
                  key={genre}
                  className="rounded-xs bg-linear-to-b from-[#3d4450]/80 to-[#2f353f]/80 px-2 py-0.5 text-xs text-[#b8bcbf]"
                >
                  {genre}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <dl className="h-fit space-y-3 rounded-xs bg-linear-to-b from-[#2a2f38]/70 to-[#1f2329]/70 p-4 shadow-[0_2px_8px_rgb(0_0_0/0.3)]">
        <CompanyList label="Developer" names={details?.developers ?? []} />
        <CompanyList label="Publisher" names={details?.publishers ?? []} />
      </dl>
    </div>
  )
}

function GameView({
  game,
  onBack,
  details,
  loading = false,
}: GamePageProps & { details?: GameDetails; loading?: boolean }) {
  return (
    <div className="relative min-h-0 w-full grow overflow-hidden bg-[#1b1e25]">
      <div aria-hidden className="absolute inset-0">
        {loading ? (
          <div className="size-full animate-pulse bg-linear-to-br from-[#2a2f38] to-[#1b1e25]" />
        ) : details?.heroUrl ? (
          <img
            key={details.heroUrl}
            src={details.heroUrl}
            alt=""
            draggable={false}
            className="size-full animate-in object-cover duration-500 fade-in"
          />
        ) : (
          <div className="size-full bg-[radial-gradient(ellipse_at_top,#2f4a6b_0%,#1b1e25_70%)]" />
        )}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgb(0_0_0/0.65)_100%)]" />
        <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-[#1b1e25]/80" />
      </div>
      <NavButton
        label="Back"
        onClick={onBack}
        className="absolute top-2 left-2 z-10 flex size-9 cursor-pointer items-center justify-center rounded-xs bg-black/40 text-[#dcdedf] backdrop-blur-sm hover:bg-black/60 @md:hidden"
      >
        <ArrowLeftRegular className="size-4" />
      </NavButton>
      <div className="absolute inset-0 flex flex-col overflow-y-auto">
        <div className="flex h-[45%] min-h-36 shrink-0 items-end px-6 pb-4">
          <h1 className="text-3xl font-bold text-white drop-shadow-[0_2px_8px_rgb(0_0_0/0.85)] @3xl:text-4xl">
            {game.name}
          </h1>
        </div>
        <div className="flex grow flex-col border-t border-white/10 bg-linear-to-b from-[#1b1e25]/40 via-[#1b1e25]/70 to-[#1b1e25]/90 shadow-[0_-8px_24px_rgb(0_0_0/0.35)] backdrop-blur-2xl">
          <StatRow game={game} details={details} loading={loading} />
          <Details details={details} loading={loading} />
        </div>
      </div>
    </div>
  )
}

export function GamePage(props: GamePageProps) {
  const { details, loading } = useGameDetails(props.game.name)
  return <GameView {...props} details={details} loading={loading} />
}
