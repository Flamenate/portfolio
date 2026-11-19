import { isSameDay } from 'date-fns'
import { servers } from '@/data/concord/servers'
import { users } from '@/data/concord/users'
import type {
  Conversation,
  Message,
  NonEmpty,
  Role,
  Server,
  TextChannel,
  User,
} from './types'

const groupWindow = 7 * 60 * 1000

export function getUser(id: string): User {
  return (
    users.find((user) => user.id === id) ?? {
      id,
      displayName: id,
      username: id,
      status: 'offline',
    }
  )
}

export function getServer(id: string) {
  return servers.find((server) => server.id === id)
}

export function getTextChannel(
  server: Server,
  channelId: string,
): TextChannel | undefined {
  for (const category of server.categories) {
    const channel = category.channels.find((item) => item.id === channelId)
    if (channel) return channel.type === 'text' ? channel : undefined
  }
  return undefined
}

/** The first channel the visitor can open, if any. */
export function firstTextChannel(server: Server): TextChannel | undefined {
  for (const category of server.categories) {
    const channel = category.channels.find(
      (item): item is TextChannel => item.type === 'text' && !item.locked,
    )
    if (channel) return channel
  }
  return undefined
}

export function conversationKey(conversation: Conversation) {
  return conversation.type === 'server'
    ? `${conversation.serverId}/${conversation.channelId}`
    : `dm/${conversation.userId}`
}

/** The member's roles, highest priority first. */
export function memberRoles(server: Server, userId: string): Role[] {
  const member = server.members.find((item) => item.userId === userId)
  if (!member) return []
  return server.roles.filter((role) => member.roleIds.includes(role.id))
}

export function nameColor(server: Server | undefined, userId: string) {
  if (!server) return undefined
  return memberRoles(server, userId).find((role) => role.color)?.color
}

export type MemberGroup =
  | { kind: 'role'; role: Role; members: User[] }
  | { kind: 'online' | 'offline'; members: User[] }

/**
 * Online members under their highest role (or "Online" without one),
 * followed by every offline member.
 */
export function memberGroups(server: Server): MemberGroup[] {
  const byRole = new Map<string, User[]>()
  const online: User[] = []
  const offline: User[] = []

  for (const member of server.members) {
    const user = getUser(member.userId)
    if (user.status === 'offline') {
      offline.push(user)
      continue
    }
    const role = memberRoles(server, member.userId).at(0)
    if (role) byRole.set(role.id, [...(byRole.get(role.id) ?? []), user])
    else online.push(user)
  }

  const groups: MemberGroup[] = [
    ...server.roles.map((role) => ({
      kind: 'role' as const,
      role,
      members: byRole.get(role.id) ?? [],
    })),
    { kind: 'online', members: online },
    { kind: 'offline', members: offline },
  ]
  return groups
    .filter((group) => group.members.length > 0)
    .map((group) => ({
      ...group,
      members: group.members.toSorted((a, b) =>
        a.displayName.localeCompare(b.displayName),
      ),
    }))
}

export type MessageGroup = {
  type: 'group'
  id: string
  authorId: string
  messages: NonEmpty<Message>
}

export type MessageBlock =
  | { type: 'divider'; id: string; date: Date }
  | MessageGroup

/**
 * Inserts a divider before each new day and groups consecutive messages
 * from the same author sent less than 7 minutes apart.
 */
export function messageBlocks(messages: Message[]): MessageBlock[] {
  const blocks: MessageBlock[] = []
  let group: MessageGroup | undefined
  let previous: Message | undefined

  for (const message of messages.toSorted(
    (a, b) => a.date.getTime() - b.date.getTime(),
  )) {
    if (!previous || !isSameDay(previous.date, message.date)) {
      blocks.push({
        type: 'divider',
        id: `divider-${message.id}`,
        date: message.date,
      })
      group = undefined
    }
    if (
      group &&
      previous &&
      group.authorId === message.authorId &&
      message.date.getTime() - previous.date.getTime() < groupWindow
    ) {
      group.messages.push(message)
    } else {
      group = {
        type: 'group',
        id: message.id,
        authorId: message.authorId,
        messages: [message],
      }
      blocks.push(group)
    }
    previous = message
  }
  return blocks
}
