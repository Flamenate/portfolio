import type { Server } from '@/lib/concord/types'

export const servers: Server[] = [
  {
    id: 'flame-hub',
    name: 'Flame Hub',
    roles: [
      { id: 'admin', name: 'Admin', color: '#e11d48' },
      { id: 'friends', name: 'Friends', color: '#0ea5e9' },
      { id: 'gamers', name: 'Gamers', color: '#22c55e' },
    ],
    members: [
      { userId: 'flamenate', roleIds: ['admin', 'gamers'] },
      { userId: 'alice', roleIds: ['friends'] },
      { userId: 'bob', roleIds: ['gamers'] },
    ],
    categories: [
      {
        id: 'uncategorized',
        name: null,
        channels: [
          {
            type: 'text',
            id: 'rules',
            name: 'rules',
            messages: [
              {
                id: 'rules-1',
                authorId: 'flamenate',
                date: new Date('2026-10-02T18:00:00'),
                content: 'Be nice.',
              },
            ],
          },
        ],
      },
      {
        id: 'general',
        name: 'General',
        channels: [
          {
            type: 'text',
            id: 'main-chat',
            name: 'main-chat',
            topic: 'Talk about anything.',
            messages: [
              {
                id: 'main-1',
                authorId: 'alice',
                date: new Date('2026-11-17T20:14:00'),
                content: 'Hey everyone!',
              },
              {
                id: 'main-2',
                authorId: 'alice',
                date: new Date('2026-11-17T20:16:00'),
                content: 'Check this out',
                attachments: [{ src: '/media/icons/concord.webp' }],
              },
              {
                id: 'main-3',
                authorId: 'flamenate',
                date: new Date('2026-11-18T09:03:00'),
                content: 'Nice one',
                reactions: [
                  { emoji: '🔥', count: 2, me: true },
                  { emoji: '😂', count: 1 },
                ],
              },
            ],
          },
          {
            type: 'text',
            id: 'pictures',
            name: 'pictures',
            messages: [
              {
                id: 'pictures-1',
                authorId: 'bob',
                date: new Date('2026-11-01T14:30:00'),
                content: 'First!',
              },
            ],
          },
          {
            type: 'text',
            id: 'staff',
            name: 'staff',
            locked: true,
            messages: [
              {
                id: 'staff-1',
                authorId: 'flamenate',
                date: new Date('2026-10-02T18:05:00'),
                content: 'Staff only.',
              },
            ],
          },
          { type: 'voice', id: 'lounge', name: 'Lounge' },
        ],
      },
    ],
  },
  {
    id: 'study-group',
    name: 'Study Group',
    roles: [{ id: 'teacher', name: 'Teacher', color: '#a855f7' }],
    members: [
      { userId: 'alice', roleIds: ['teacher'] },
      { userId: 'flamenate', roleIds: [] },
    ],
    categories: [
      {
        id: 'general',
        name: 'General',
        channels: [
          {
            type: 'text',
            id: 'homework',
            name: 'homework',
            messages: [
              {
                id: 'homework-1',
                authorId: 'alice',
                date: new Date('2026-11-15T16:20:00'),
                content: 'Due Friday.',
              },
            ],
          },
        ],
      },
    ],
  },
]
