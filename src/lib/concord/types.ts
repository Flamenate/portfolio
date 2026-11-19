export type NonEmpty<T> = [T, ...T[]]

export type Status = 'online' | 'idle' | 'dnd' | 'offline'

export type User = {
  id: string
  displayName: string
  username: string
  avatar?: string
  /** Banner color, any CSS color. */
  banner?: string
  bio?: string
  status: Status
}

/** Roles are listed by priority, highest first. */
export type Role = {
  id: string
  name: string
  /** Hex color. */
  color?: string
}

export type Member = {
  userId: string
  roleIds: string[]
}

export type Reaction = {
  emoji: string
  count: number
  me?: boolean
}

export type Attachment = {
  src: string
  alt?: string
}

export type Message = {
  id: string
  authorId: string
  date: Date
  content: string
  attachments?: Attachment[]
  reactions?: Reaction[]
}

export type TextChannel = {
  type: 'text'
  id: string
  name: string
  topic?: string
  locked?: boolean
  messages: NonEmpty<Message>
}

export type VoiceChannel = {
  type: 'voice'
  id: string
  name: string
}

export type Channel = TextChannel | VoiceChannel

export type Category = {
  id: string
  /** `null` holds the uncategorized channels shown at the top. */
  name: string | null
  channels: Channel[]
}

export type Server = {
  id: string
  name: string
  icon?: string
  roles: Role[]
  members: Member[]
  categories: Category[]
}

export type Dm = {
  userId: string
  messages: NonEmpty<Message>
}

export type Conversation =
  | { type: 'server'; serverId: string; channelId: string }
  | { type: 'dm'; userId: string }
