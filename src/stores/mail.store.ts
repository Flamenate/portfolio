import { create } from 'zustand/react'
import type { Mail } from '@/lib/mails'

type MailStore = {
  sent: Mail[]
  addSent: (mail: Mail) => void
}

export const useMailStore = create<MailStore>()((set) => ({
  sent: [],
  addSent: (mail) => set((state) => ({ sent: [...state.sent, mail] })),
}))

export default useMailStore
