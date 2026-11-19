import { Avatar } from '@/components/ui/avatar'
import type { Status, User } from '@/lib/concord/types'
import { cn } from '@/lib/utils'

const statusColors: Record<Status, string> = {
  online: 'bg-emerald-500',
  idle: 'bg-amber-400',
  dnd: 'bg-red-500',
  offline: 'bg-gray-500',
}

export function StatusDot({
  status,
  className,
}: {
  status: Status
  className?: string
}) {
  return (
    <span
      aria-hidden
      className={cn(
        'block size-3 rounded-full ring-3 ring-popover',
        statusColors[status],
        className,
      )}
    />
  )
}

export function PresenceAvatar({
  user,
  className,
  dotClassName,
}: {
  user: User
  className?: string
  dotClassName?: string
}) {
  return (
    <span className="relative shrink-0">
      <Avatar name={user.displayName} src={user.avatar} className={className} />
      <StatusDot
        status={user.status}
        className={cn('absolute -right-0.5 -bottom-0.5', dotClassName)}
      />
    </span>
  )
}
