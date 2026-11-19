import { me } from '@/data/concord/users'
import useLocalize from '@/hooks/useLocalize'
import { getUser } from '@/lib/concord/helpers'
import type { Server } from '@/lib/concord/types'
import { ProfilePopover } from './profile-popover'
import { PresenceAvatar } from './status-dot'

/** Spans the rail and sidebar. Same height and bottom offset as the composer so both line up. */
export function UserPanel({ server }: { server?: Server }) {
  const localize = useLocalize()
  const user = getUser(me)

  return (
    <ProfilePopover user={user} server={server} side="top">
      <button
        type="button"
        className="mx-2 mb-2 flex h-14 shrink-0 cursor-pointer items-center gap-2 rounded-lg border border-muted-foreground/30 bg-popover hover-shade px-3 text-left dark:bg-background"
      >
        <PresenceAvatar user={user} className="size-9" />
        <span className="min-w-0">
          <span className="block truncate font-semibold">
            {user.displayName}
          </span>
          <span className="block truncate text-xs text-muted-foreground">
            {localize(`concord_${user.status}`)}
          </span>
        </span>
      </button>
    </ProfilePopover>
  )
}
