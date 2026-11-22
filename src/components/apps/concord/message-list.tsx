import { useState } from 'react'
import { Avatar } from '@/components/ui/avatar'
import useLocale from '@/hooks/useLocale'
import { getUser, messageBlocks, nameColor } from '@/lib/concord/helpers'
import type { MessageGroup } from '@/lib/concord/helpers'
import type { Message, Reaction, Server } from '@/lib/concord/types'
import type { Localizer } from '@/lib/locale'
import { cn } from '@/lib/utils'
import { ProfilePopover } from './profile-popover'

function MessageBody({ message }: { message: Message }) {
  return (
    <>
      {message.content && (
        <p className="wrap-break-word whitespace-pre-wrap select-text">
          {message.content}
        </p>
      )}
      {message.attachments?.map((attachment) => (
        <img
          key={attachment.src}
          src={attachment.src}
          alt={attachment.alt ?? ''}
          loading="lazy"
          draggable={false}
          className="mt-1 block max-h-72 max-w-full rounded-md"
        />
      ))}
      {message.reactions && <Reactions initialReactions={message.reactions} />}
    </>
  )
}

function toggleReaction(reactions: Reaction[], emoji: string) {
  return reactions.flatMap((reaction) => {
    if (reaction.emoji !== emoji) return [reaction]
    if (!reaction.me)
      return [{ ...reaction, count: reaction.count + 1, me: true }]
    return reaction.count > 1
      ? [{ ...reaction, count: reaction.count - 1, me: false }]
      : []
  })
}

function Reactions({ initialReactions }: { initialReactions: Reaction[] }) {
  const [reactions, setReactions] = useState(initialReactions)
  if (reactions.length === 0) return null

  return (
    <div className="mt-1 flex flex-wrap gap-1">
      {reactions.map((reaction) => (
        <button
          key={reaction.emoji}
          type="button"
          aria-pressed={reaction.me ?? false}
          onClick={() =>
            setReactions((current) => toggleReaction(current, reaction.emoji))
          }
          className={cn(
            'flex cursor-pointer items-center gap-1.5 rounded-md border px-1.5 py-0.5 text-xs',
            reaction.me
              ? 'border-accent-foreground bg-accent-foreground/30'
              : 'border-transparent bg-muted-foreground/15 hover:border-muted-foreground/50',
          )}
        >
          <span className="text-base leading-none">{reaction.emoji}</span>
          <span className="font-semibold">{reaction.count}</span>
        </button>
      ))}
    </div>
  )
}

function MessageGroupItem({
  group,
  server,
  locale,
}: {
  group: MessageGroup
  server?: Server
  locale: Localizer
}) {
  const author = getUser(group.authorId)
  const [first, ...rest] = group.messages

  return (
    <article aria-label={author.displayName} className="mt-4">
      <div className="flex gap-4 px-4 py-0.5 hover:bg-muted-foreground/5">
        <ProfilePopover user={author} server={server}>
          <button
            type="button"
            aria-label={author.displayName}
            className="mt-0.5 shrink-0 cursor-pointer self-start rounded-full"
          >
            <Avatar
              name={author.displayName}
              src={author.avatar}
              className="size-10"
            />
          </button>
        </ProfilePopover>
        <div className="min-w-0 grow">
          <div className="flex min-w-0 items-baseline gap-2">
            <ProfilePopover user={author} server={server}>
              <button
                type="button"
                className="cursor-pointer truncate font-semibold hover:underline"
                style={{ color: nameColor(server, author.id) }}
              >
                {author.displayName}
              </button>
            </ProfilePopover>
            <time
              dateTime={first.date.toISOString()}
              className="shrink-0 text-xs text-muted-foreground"
              suppressHydrationWarning
            >
              {locale.date(first.date, 'P p')}
            </time>
          </div>
          <MessageBody message={first} />
        </div>
      </div>
      {rest.map((message) => (
        <div
          key={message.id}
          className="group flex gap-4 px-4 py-0.5 hover:bg-muted-foreground/5"
        >
          <time
            dateTime={message.date.toISOString()}
            className="w-10 shrink-0 pt-0.5 text-right text-[0.625rem] whitespace-nowrap text-muted-foreground opacity-0 group-hover:opacity-100"
            suppressHydrationWarning
          >
            {locale.date(message.date, 'p')}
          </time>
          <div className="min-w-0 grow">
            <MessageBody message={message} />
          </div>
        </div>
      ))}
    </article>
  )
}

export function MessageList({
  messages,
  server,
}: {
  messages: Message[]
  server?: Server
}) {
  const locale = useLocale()

  return (
    <div className="pb-4">
      {messageBlocks(messages).map((block) =>
        block.type === 'divider' ? (
          <div
            key={block.id}
            className="mx-4 mt-6 mb-2 flex items-center gap-2 text-xs font-semibold text-muted-foreground"
          >
            <span aria-hidden className="h-px grow bg-muted-foreground/30" />
            <span suppressHydrationWarning>
              {locale.date(block.date, 'PPP')}
            </span>
            <span aria-hidden className="h-px grow bg-muted-foreground/30" />
          </div>
        ) : (
          <MessageGroupItem
            key={block.id}
            group={block}
            server={server}
            locale={locale}
          />
        ),
      )}
    </div>
  )
}
