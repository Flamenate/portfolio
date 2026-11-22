import { ArrowLeftRegular } from '@fluentui/react-icons/headless/svg/arrow-left'
import { NumberSymbolRegular } from '@fluentui/react-icons/headless/svg/number-symbol'
import { PeopleRegular } from '@fluentui/react-icons/headless/svg/people'
import { useRef } from 'react'
import { NavButton } from '@/components/ui/nav-button'
import useLocale from '@/hooks/useLocale'
import type {
  Message,
  NonEmpty,
  Server,
  TextChannel,
  User,
} from '@/lib/concord/types'
import { cn } from '@/lib/utils'
import { useConcordStore } from '@/stores/concord.store'
import { ChannelIntro, DmIntro } from './channel-intro'
import { Composer } from './composer'
import { MemberList } from './member-list'
import { MessageList } from './message-list'
import { PresenceAvatar } from './status-dot'

export type ChatTarget =
  | { type: 'channel'; key: string; server: Server; channel: TextChannel }
  | { type: 'dm'; key: string; user: User; messages: NonEmpty<Message> }

function MembersToggle({
  pressed,
  onClick,
}: {
  pressed: boolean
  onClick: () => void
}) {
  const locale = useLocale()
  return (
    <NavButton
      label={locale.text('concord_members')}
      aria-pressed={pressed}
      onClick={onClick}
    >
      <PeopleRegular
        className={cn(
          'size-5',
          pressed
            ? 'text-foreground dark:text-(--white)'
            : 'text-muted-foreground',
        )}
      />
    </NavButton>
  )
}

export function Chat({
  target,
  showMembers,
  membersOverlay,
  onToggleMembers,
  onToggleOverlay,
  onBack,
  className,
}: {
  target: ChatTarget
  showMembers: boolean
  membersOverlay: boolean
  onToggleMembers: () => void
  onToggleOverlay: () => void
  onBack: () => void
  className?: string
}) {
  const locale = useLocale()
  const sent = useConcordStore((state) => state.sent[target.key])
  const send = useConcordStore((state) => state.send)
  const scrollRef = useRef<HTMLDivElement>(null)
  const server = target.type === 'channel' ? target.server : undefined
  const staticMessages =
    target.type === 'channel' ? target.channel.messages : target.messages
  const messages = sent ? [...staticMessages, ...sent] : staticMessages
  const title =
    target.type === 'channel'
      ? `#${target.channel.name}`
      : `@${target.user.displayName}`

  return (
    <section
      aria-label={title}
      className={cn('flex-col border-l border-muted-foreground/30', className)}
    >
      <header className="flex h-14 shrink-0 items-center gap-2 border-b border-muted-foreground/30 px-1">
        <div className="shrink-0 @md:hidden">
          <NavButton label={locale.text('back')} onClick={onBack}>
            <ArrowLeftRegular className="size-4 text-foreground dark:text-(--white)" />
          </NavButton>
        </div>
        {target.type === 'channel' ? (
          <>
            <NumberSymbolRegular className="ml-2 size-5 shrink-0 text-muted-foreground" />
            <h2 className="max-w-1/2 shrink-0 truncate font-semibold">
              {target.channel.name}
            </h2>
            {target.channel.topic && (
              <p
                title={target.channel.topic}
                className="hidden min-w-0 grow truncate border-l border-muted-foreground/30 pl-2 text-muted-foreground @2xl:block"
              >
                {target.channel.topic}
              </p>
            )}
          </>
        ) : (
          <>
            <PresenceAvatar
              user={target.user}
              className="ml-2 size-6 text-xs"
              dotClassName="size-2.5 ring-2"
            />
            <h2 className="min-w-0 truncate font-semibold">
              {target.user.displayName}
            </h2>
          </>
        )}
        {server && (
          <div className="ml-auto shrink-0">
            <div className="@4xl:hidden">
              <MembersToggle
                pressed={membersOverlay}
                onClick={onToggleOverlay}
              />
            </div>
            <div className="hidden @4xl:block">
              <MembersToggle pressed={showMembers} onClick={onToggleMembers} />
            </div>
          </div>
        )}
      </header>

      <div className="relative flex min-h-0 grow">
        <div className="flex min-w-0 grow basis-0 flex-col">
          <div
            ref={scrollRef}
            className="flex min-h-0 grow flex-col-reverse overflow-y-auto"
          >
            <div>
              {target.type === 'channel' ? (
                <ChannelIntro channel={target.channel} />
              ) : (
                <DmIntro user={target.user} />
              )}
              <MessageList messages={messages} server={server} />
            </div>
          </div>
          {target.type === 'channel' && target.channel.restricted ? (
            <p className="mx-4 mb-2 flex min-h-14 shrink-0 items-center rounded-md border border-muted-foreground/15 bg-muted-foreground/15 px-4 text-muted-foreground">
              {locale.text('concord_restricted')}
            </p>
          ) : (
            <Composer
              placeholder={locale.text('concord_message_placeholder', title)}
              onSend={(content) => {
                send(target.key, content)
                scrollRef.current?.scrollTo({ top: 0 })
              }}
            />
          )}
        </div>
        {server && (
          <MemberList
            server={server}
            className={cn(
              'border-l border-muted-foreground/30',
              membersOverlay
                ? 'absolute inset-y-0 right-0 z-10 flex bg-popover shadow-lg dark:bg-background'
                : 'hidden',
              '@4xl:static @4xl:z-auto @4xl:shadow-none',
              showMembers ? '@4xl:flex' : '@4xl:hidden',
            )}
          />
        )}
      </div>
    </section>
  )
}
