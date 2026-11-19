import type { Dm } from './types'

export const dms: Dm[] = [
  {
    userId: 'alice',
    messages: [
      {
        id: 'dm-alice-1',
        authorId: 'alice',
        date: new Date('2026-11-16T22:40:00'),
        content: 'Are you coming tomorrow?',
      },
      {
        id: 'dm-alice-2',
        authorId: 'flamenate',
        date: new Date('2026-11-16T22:43:00'),
        content: 'Yes!\nSee you there.',
      },
    ],
  },
  {
    userId: 'bob',
    messages: [
      {
        id: 'dm-bob-1',
        authorId: 'bob',
        date: new Date('2026-11-12T11:05:00'),
        content: 'gg',
      },
    ],
  },
]
