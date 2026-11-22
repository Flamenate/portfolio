import { NumberSymbolRegular } from '@fluentui/react-icons/headless/svg/number-symbol'
import { Avatar } from '@/components/ui/avatar'
import useLocale from '@/hooks/useLocale'
import type { TextChannel, User } from '@/lib/concord/types'

export function ChannelIntro({ channel }: { channel: TextChannel }) {
  const locale = useLocale()
  const name = `#${channel.name}`

  return (
    <div className="flex flex-col gap-2 px-4 pt-4">
      <span className="flex size-16 items-center justify-center rounded-full bg-muted-foreground/20">
        <NumberSymbolRegular className="size-10" />
      </span>
      <h2 className="text-2xl font-bold wrap-break-word">
        {locale.text('concord_welcome', name)}
      </h2>
      <p className="text-muted-foreground select-text">
        {channel.topic ?? locale.text('concord_channel_start', name)}
      </p>
    </div>
  )
}

export function DmIntro({ user }: { user: User }) {
  const locale = useLocale()

  return (
    <div className="flex flex-col gap-2 px-4 pt-4">
      <Avatar
        name={user.displayName}
        src={user.avatar}
        className="size-20 text-3xl"
      />
      <div>
        <h2 className="text-2xl font-bold wrap-break-word">
          {user.displayName}
        </h2>
        <p className="text-lg">{user.username}</p>
      </div>
      <p className="text-muted-foreground">
        {locale.text('concord_dm_start', `@${user.displayName}`)}
      </p>
    </div>
  )
}
