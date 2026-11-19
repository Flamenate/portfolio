import useLocalize from '@/hooks/useLocalize'
import { memberGroups, nameColor } from '@/lib/concord/helpers'
import type { MemberGroup } from '@/lib/concord/helpers'
import type { Server } from '@/lib/concord/types'
import { cn } from '@/lib/utils'
import { ProfilePopover } from './profile-popover'
import { PresenceAvatar } from './status-dot'

function groupKey(group: MemberGroup) {
  return group.kind === 'role' ? `role-${group.role.id}` : group.kind
}

export function MemberList({
  server,
  className,
}: {
  server: Server
  className?: string
}) {
  const localize = useLocalize()

  return (
    <aside
      aria-label={localize('concord_members')}
      className={cn('w-60 shrink-0 flex-col overflow-y-auto p-2', className)}
    >
      {memberGroups(server).map((group) => (
        <section key={groupKey(group)} className="pt-4 first:pt-1">
          <h3 className="truncate px-2 pb-1 text-xs font-semibold text-muted-foreground">
            {group.kind === 'role'
              ? group.role.name
              : localize(`concord_${group.kind}`)}{' '}
            — {group.members.length}
          </h3>
          <ul>
            {group.members.map((user) => (
              <li key={user.id}>
                <ProfilePopover user={user} server={server} side="left">
                  <button
                    type="button"
                    className={cn(
                      'flex w-full cursor-pointer items-center gap-3 rounded-sm hover-shade px-2 py-1.5 text-left',
                      user.status === 'offline' && 'opacity-50',
                    )}
                  >
                    <PresenceAvatar user={user} className="size-8" />
                    <span
                      className="truncate font-medium"
                      style={{ color: nameColor(server, user.id) }}
                    >
                      {user.displayName}
                    </span>
                  </button>
                </ProfilePopover>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </aside>
  )
}
