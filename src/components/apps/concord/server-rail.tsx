import type { ReactNode } from 'react'
import { Avatar } from '@/components/ui/avatar'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { servers } from '@/data/concord/servers'
import useLocale from '@/hooks/useLocale'
import { cn } from '@/lib/utils'

function RailItem({
  label,
  active,
  onClick,
  className,
  children,
}: {
  label: string
  active: boolean
  onClick: () => void
  className?: string
  children: ReactNode
}) {
  return (
    <li
      className={cn(
        'group relative flex w-full shrink-0 justify-center',
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          'absolute top-1/2 left-0 w-1 -translate-y-1/2 rounded-r-full bg-foreground transition-all dark:bg-(--white)',
          active ? 'h-8' : 'h-0 group-hover:h-4',
        )}
      />
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            aria-label={label}
            aria-current={active ? 'page' : undefined}
            onClick={onClick}
            className={cn(
              'size-10 cursor-pointer overflow-hidden transition-[border-radius]',
              active ? 'rounded-xl' : 'rounded-3xl hover:rounded-xl',
            )}
          >
            {children}
          </button>
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={8}>
          {label}
        </TooltipContent>
      </Tooltip>
    </li>
  )
}

export function ServerRail({
  current,
  onSelect,
}: {
  current: string | null
  onSelect: (serverId: string | null) => void
}) {
  const locale = useLocale()

  return (
    <ul className="flex w-16 shrink-0 flex-col items-center gap-2 overflow-y-auto pb-2">
      <RailItem
        label={locale.text('concord_direct_messages')}
        active={current === null}
        onClick={() => onSelect(null)}
        className="h-14 items-center after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-8 after:-translate-x-1/2 after:bg-muted-foreground/30"
      >
        <img
          src="/media/icons/concord.webp"
          alt=""
          draggable={false}
          className="size-full object-cover"
        />
      </RailItem>
      {servers.map((server) => (
        <RailItem
          key={server.id}
          label={server.name}
          active={server.id === current}
          onClick={() => onSelect(server.id)}
        >
          <Avatar
            name={server.name}
            src={server.icon}
            className="size-full rounded-none text-base"
          />
        </RailItem>
      ))}
    </ul>
  )
}
