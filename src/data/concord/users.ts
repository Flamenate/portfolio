import type { User } from '@/lib/concord/types'

export const me = 'flamenate'

export const users: User[] = [
  {
    id: 'flamenate',
    displayName: 'Flame',
    username: 'flamenate',
    avatar: '/images/pictures/ena.jpg',
    banner: '#c2410c',
    bio: 'Building things on the web.',
    status: 'online',
  },
  {
    id: 'alice',
    displayName: 'Alice',
    username: 'alice',
    banner: '#0369a1',
    bio: 'Hello there!',
    status: 'idle',
  },
  {
    id: 'bob',
    displayName: 'Bob',
    username: 'bob',
    status: 'offline',
  },
]
