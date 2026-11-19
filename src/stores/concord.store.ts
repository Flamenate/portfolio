import { create } from 'zustand/react'
import { me } from '@/data/concord/users'
import type { Message } from '@/lib/concord/types'

type ConcordStore = {
  /** Messages sent by the visitor, by conversation key. */
  sent: Partial<Record<string, Message[]>>
  send: (key: string, content: string) => void
}

export const useConcordStore = create<ConcordStore>()((set) => ({
  sent: {},
  send: (key, content) => {
    const trimmed = content.trim()
    if (!trimmed) return
    const message: Message = {
      id: crypto.randomUUID(),
      authorId: me,
      date: new Date(),
      content: trimmed,
    }
    set((state) => ({
      sent: { ...state.sent, [key]: [...(state.sent[key] ?? []), message] },
    }))
  },
}))

export default useConcordStore
