import { create } from 'zustand'

interface LogAction {
  when: Date
  title: string
  target?: string
}

interface LogStore {
  actions: LogAction[]
  logAction: (title: string, target?: string) => void
}

export const useLogStore = create<LogStore>((set) => ({
  actions: [],
  logAction: (title: string, target?: string) => {
    set((state) => ({
      actions: [{ when: new Date(), title, target }, ...state.actions].slice(
        0,
        10,
      ),
    }))
  },
}))
