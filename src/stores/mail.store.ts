import { create } from 'zustand/react'
import type { Mail } from '@/data/mails'
import { useAppStore } from './app.store'

type MailStore = {
  sent: Mail[]
  // Set from outside Mail to open it on a blank draft; Mail clears it.
  composeRequest: number | null
  addSent: (mail: Mail) => void
  requestCompose: () => void
  clearComposeRequest: () => void
}

let lastComposeRequest = 0

export const useMailStore = create<MailStore>()((set) => ({
  sent: [],
  composeRequest: null,
  addSent: (mail) => set((state) => ({ sent: [...state.sent, mail] })),
  requestCompose: () => {
    set({ composeRequest: ++lastComposeRequest })
    useAppStore.getState().openApp('mail')
  },
  clearComposeRequest: () => set({ composeRequest: null }),
}))

export default useMailStore
