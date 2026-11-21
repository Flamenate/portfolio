import { ChevronRightRegular } from '@fluentui/react-icons/headless/svg/chevron-right'
import { SearchRegular } from '@fluentui/react-icons/headless/svg/search'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { games } from '@/data/games'
import type { OwnedGame } from '@/data/games'
import { cn } from '@/lib/utils'
import { useGameDetails } from '../../../lib/igdb/details'

const iconPlaceholder = (
  <span className="size-4 shrink-0 rounded-xs bg-[#3d4450]" />
)

function GameIcon({ name }: { name: string }) {
  const { details, loading } = useGameDetails(name)
  const iconUrl = details?.iconUrl
  if (loading || !iconUrl) return iconPlaceholder
  return (
    <img
      src={iconUrl}
      alt=""
      draggable={false}
      className="size-4 shrink-0 rounded-xs object-cover"
    />
  )
}

function GameSection({
  title,
  items,
  selected,
  onSelect,
}: {
  title: string
  items: OwnedGame[]
  selected: string | undefined
  onSelect: (name: string) => void
}) {
  if (items.length === 0) return null
  return (
    <Collapsible defaultOpen className="group/section">
      <CollapsibleTrigger className="flex w-full cursor-pointer items-center gap-1.5 px-2 pt-3 pb-1 text-xs font-semibold tracking-wider text-[#8b929a] uppercase hover:text-[#dcdedf]">
        <ChevronRightRegular className="size-3 transition-transform group-data-[state=open]/section:rotate-90" />
        {title}
        <span className="font-normal text-[#5e6670]">({items.length})</span>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <ul>
          {items.map((game) => {
            const isSelected = game.name === selected
            return (
              <li key={game.name}>
                <button
                  type="button"
                  aria-current={isSelected ? 'page' : undefined}
                  className={cn(
                    'flex w-full cursor-pointer items-center gap-2 px-3 py-1 text-left text-[13px]',
                    isSelected
                      ? 'bg-linear-to-r from-[#3d4450] to-[#353b46] text-white'
                      : 'text-[#b8bcbf] hover:bg-[#2a2e36] hover:text-white',
                  )}
                  onClick={() => onSelect(game.name)}
                >
                  <GameIcon name={game.name} />
                  <span className="truncate">{game.name}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  )
}

export function GameList({
  search,
  onSearch,
  selected,
  onSelect,
  className,
}: {
  search: string
  onSearch: (value: string) => void
  selected: string | undefined
  onSelect: (name: string) => void
  className?: string
}) {
  const query = search.trim().toLowerCase()
  // TODO: test search performance and potentially replace with something better
  const visible = games
    .filter((game) => game.name.toLowerCase().includes(query))
    .toSorted((a, b) => a.name.localeCompare(b.name))

  return (
    <aside
      aria-label="Library"
      className={cn(
        'flex min-h-0 shrink-0 grow flex-col bg-linear-to-b from-[#23262e] to-[#1a1d23] shadow-[1px_0_0_rgb(0_0_0/0.35)] @md:w-60 @md:grow-0',
        className,
      )}
    >
      <div className="shrink-0 bg-linear-to-b from-[#2a2e36] to-[#23262e] p-2">
        <label className="relative flex items-center">
          <SearchRegular className="pointer-events-none absolute left-2 size-4 text-[#8b929a]" />
          <input
            type="search"
            value={search}
            placeholder="Search"
            aria-label="Search games"
            className="h-7 w-full rounded-xs bg-[#171a21]/70 pr-2 pl-8 text-[13px] text-[#dcdedf] shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] outline-none placeholder:text-[#5e6670] focus:ring-1 focus:ring-[#1a9fff]/50"
            onChange={(event) => onSearch(event.target.value)}
          />
        </label>
      </div>
      <div className="min-h-0 grow overflow-y-auto pb-2">
        <GameSection
          title="Favorites"
          items={visible.filter((game) => game.category === 'favorite')}
          selected={selected}
          onSelect={onSelect}
        />
        <GameSection
          title="Multiplayer / Endless"
          items={visible.filter(
            (game) => game.category === 'multiplayer / endless',
          )}
          selected={selected}
          onSelect={onSelect}
        />
        <GameSection
          title="Completed"
          items={visible.filter((game) => game.category === 'completed')}
          selected={selected}
          onSelect={onSelect}
        />
        <GameSection
          title="Backlog"
          items={visible.filter((game) => game.category === 'backlog')}
          selected={selected}
          onSelect={onSelect}
        />
      </div>
    </aside>
  )
}
