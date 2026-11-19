import { create } from 'zustand/react'
import type { TranslationSuffix } from '@/lib/localize'

interface LogAction {
  when: Date
  title: TranslationSuffix<'logs'>
  target?: string
}

interface LogStore {
  actions: LogAction[]
  logAction: (title: LogAction['title'], target?: string) => void
}

export const useLogStore = create<LogStore>((set) => ({
  actions: [],
  logAction: (title, target) => {
    set((state) => ({
      actions: [{ when: new Date(), title, target }, ...state.actions].slice(
        0,
        10,
      ),
    }))
  },
}))

export const logAction: LogStore['logAction'] = (title, target) =>
  useLogStore.getState().logAction(title, target)
