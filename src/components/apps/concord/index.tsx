import { useState } from 'react'
import { dms } from '@/data/concord/dms'
import { servers } from '@/data/concord/servers'
import useLocalize from '@/hooks/useLocalize'
import {
  conversationKey,
  firstTextChannel,
  getServer,
  getTextChannel,
  getUser,
} from '@/lib/concord/helpers'
import type { Conversation, Server } from '@/lib/concord/types'
import { cn } from '@/lib/utils'
import { ChannelSidebar } from './channel-sidebar'
import { Chat } from './chat'
import type { ChatTarget } from './chat'
import { DmSidebar } from './dm-sidebar'
import { ServerRail } from './server-rail'
import { UserPanel } from './user-panel'

type Selection = {
  /** `null` is the Home/DMs view. */
  serverId: string | null
  conversation: Conversation | null
}

function selectionFor(server: Server | undefined): Selection {
  if (!server) {
    const dm = dms.at(0)
    return {
      serverId: null,
      conversation: dm ? { type: 'dm', userId: dm.userId } : null,
    }
  }
  const channel = firstTextChannel(server)
  return {
    serverId: server.id,
    conversation: channel
      ? { type: 'server', serverId: server.id, channelId: channel.id }
      : null,
  }
}

function resolveTarget(conversation: Conversation | null): ChatTarget | null {
  if (!conversation) return null
  const key = conversationKey(conversation)
  if (conversation.type === 'server') {
    const server = getServer(conversation.serverId)
    const channel = server && getTextChannel(server, conversation.channelId)
    return server && channel ? { type: 'channel', key, server, channel } : null
  }
  const dm = dms.find((item) => item.userId === conversation.userId)
  return dm
    ? { type: 'dm', key, user: getUser(dm.userId), messages: dm.messages }
    : null
}

export function Concord() {
  const localize = useLocalize()
  const [selection, setSelection] = useState(() => selectionFor(servers.at(0)))
  const [chatOpen, setChatOpen] = useState(false)
  const [showMembers, setShowMembers] = useState(true)
  const [membersOverlay, setMembersOverlay] = useState(false)
  const { serverId, conversation } = selection
  const server = serverId === null ? undefined : getServer(serverId)
  const target = resolveTarget(conversation)
  const paneClassName = cn(
    'min-h-0 min-w-0 grow overflow-hidden bg-popover dark:bg-background',
    chatOpen ? 'flex' : 'hidden @md:flex',
  )
  const sidebarClassName = 'min-w-0 grow @md:w-60 @md:grow-0'

  const selectServer = (id: string | null) => {
    if (id === serverId) return
    setSelection(selectionFor(id === null ? undefined : getServer(id)))
  }

  const open = (next: Conversation) => {
    setSelection({ serverId, conversation: next })
    setChatOpen(true)
  }

  return (
    <div className="flex h-full bg-popover/50 text-sm text-popover-foreground">
      <nav
        aria-label={localize('concord')}
        className={cn(
          'flex min-h-0 min-w-0 grow flex-col @md:grow-0',
          chatOpen && 'hidden @md:flex',
        )}
      >
        <div className="flex min-h-0 grow">
          <ServerRail current={serverId} onSelect={selectServer} />
          {server ? (
            <ChannelSidebar
              key={server.id}
              server={server}
              current={
                conversation?.type === 'server' ? conversation.channelId : null
              }
              onSelect={(channelId) =>
                open({ type: 'server', serverId: server.id, channelId })
              }
              className={sidebarClassName}
            />
          ) : (
            <DmSidebar
              current={conversation?.type === 'dm' ? conversation.userId : null}
              onSelect={(userId) => open({ type: 'dm', userId })}
              className={sidebarClassName}
            />
          )}
        </div>
        <UserPanel server={server} />
      </nav>

      {target ? (
        <Chat
          key={target.key}
          target={target}
          showMembers={showMembers}
          membersOverlay={membersOverlay}
          onToggleMembers={() => setShowMembers((value) => !value)}
          onToggleOverlay={() => setMembersOverlay((value) => !value)}
          onBack={() => setChatOpen(false)}
          className={paneClassName}
        />
      ) : (
        <section className={cn(paneClassName, 'items-center justify-center')}>
          <img
            src="/media/icons/concord.webp"
            alt=""
            draggable={false}
            className="size-24 opacity-30 grayscale"
          />
        </section>
      )}
    </div>
  )
}
