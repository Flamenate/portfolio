import type { ComponentProps, ReactNode } from 'react'
import { Avatar } from '@/components/ui/avatar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import useLocale from '@/hooks/useLocale'
import { memberRoles } from '@/lib/concord/helpers'
import type { Server, User } from '@/lib/concord/types'
import { StatusDot } from './status-dot'

const sectionTitleClassName = 'mb-1 text-xs font-semibold text-muted-foreground'

export function ProfilePopover({
  user,
  server,
  side = 'right',
  align = 'start',
  children,
}: {
  user: User
  /** Shows the user's roles in this server. */
  server?: Server
  side?: ComponentProps<typeof PopoverContent>['side']
  align?: ComponentProps<typeof PopoverContent>['align']
  children: ReactNode
}) {
  const locale = useLocale()
  const roles = server ? memberRoles(server, user.id) : []

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        side={side}
        align={align}
        sideOffset={8}
        collisionPadding={8}
        aria-label={user.displayName}
        className="w-72 overflow-hidden p-0 text-sm select-text"
      >
        <div
          className="h-16 bg-accent-foreground"
          style={user.banner ? { backgroundColor: user.banner } : undefined}
        />
        <div className="relative -mt-10 ml-4 w-fit">
          <Avatar
            name={user.displayName}
            src={user.avatar}
            className="size-20 text-3xl ring-6 ring-popover"
          />
          <StatusDot
            status={user.status}
            className="absolute right-0.5 bottom-0.5 size-5 ring-4"
          />
        </div>
        <div className="flex flex-col gap-3 p-4 pt-2">
          <div>
            <p className="truncate text-lg font-bold">{user.displayName}</p>
            <p className="truncate text-muted-foreground">{user.username}</p>
          </div>
          {user.bio && (
            <section>
              <h3 className={sectionTitleClassName}>
                {locale.text('concord_about_me')}
              </h3>
              <p className="whitespace-pre-wrap">{user.bio}</p>
            </section>
          )}
          {roles.length > 0 && (
            <section>
              <h3 className={sectionTitleClassName}>
                {locale.text('concord_roles')}
              </h3>
              <ul className="flex flex-wrap gap-1">
                {roles.map((role) => (
                  <li
                    key={role.id}
                    className="flex items-center gap-1.5 rounded-sm bg-muted-foreground/15 px-2 py-0.5 text-xs"
                  >
                    <span
                      aria-hidden
                      className="size-2.5 rounded-full bg-muted-foreground"
                      style={
                        role.color ? { backgroundColor: role.color } : undefined
                      }
                    />
                    {role.name}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
