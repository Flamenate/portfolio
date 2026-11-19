import { dms } from '@/data/concord/dms'
import useLocalize from '@/hooks/useLocalize'
import { getUser } from '@/lib/concord/helpers'
import { cn } from '@/lib/utils'
import { PresenceAvatar } from './status-dot'

export function DmSidebar({
  current,
  onSelect,
  className,
}: {
  current: string | null
  onSelect: (userId: string) => void
  className?: string
}) {
  const localize = useLocalize()

  return (
    <div className={cn('flex flex-col', className)}>
      <h2 className="flex h-14 shrink-0 items-center border-b border-muted-foreground/30 px-4 font-semibold">
        <span className="truncate">{localize('concord_direct_messages')}</span>
      </h2>
      <ul className="flex min-h-0 grow flex-col gap-0.5 overflow-y-auto p-2">
        {dms.map((dm) => {
          const user = getUser(dm.userId)
          const active = dm.userId === current
          return (
            <li key={dm.userId}>
              <button
                type="button"
                aria-current={active ? 'page' : undefined}
                onClick={() => onSelect(dm.userId)}
                className={cn(
                  'flex w-full cursor-pointer items-center gap-3 rounded-sm px-2 py-1.5 text-left',
                  active
                    ? 'bg-accent/30'
                    : 'text-muted-foreground hover:bg-accent/20 hover:text-popover-foreground',
                )}
              >
                <PresenceAvatar user={user} className="size-8" />
                <span className="truncate font-medium">{user.displayName}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
