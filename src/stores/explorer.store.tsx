import { create } from 'zustand'
import type { AppLabel } from '@/lib/apps'
import { getFolder, isSamePath, root } from '@/lib/directories'
import type { FolderPath } from '@/lib/directories'
import { useAppStore } from './app.store'

export const EXPLORER_APP_LABEL = 'haythem_frikha' satisfies AppLabel

interface ExplorerStore {
  entries: FolderPath[]
  index: number
  navigate: (path: FolderPath) => void
  back: () => void
  forward: () => void
  openFolder: (path: FolderPath) => void
  reset: () => void
}

const initialState: Pick<ExplorerStore, 'entries' | 'index'> = {
  entries: [[]],
  index: 0,
}

export const useExplorerStore = create<ExplorerStore>()((set, get) => ({
  ...initialState,
  navigate: (path) =>
    set((state) => {
      if (isSamePath(state.entries[state.index], path)) return state
      return {
        entries: [...state.entries.slice(0, state.index + 1), path],
        index: state.index + 1,
      }
    }),
  back: () => set((state) => ({ index: Math.max(0, state.index - 1) })),
  forward: () =>
    set((state) => ({
      index: Math.min(state.entries.length - 1, state.index + 1),
    })),
  openFolder: (path) => {
    get().navigate(path)
    useAppStore.getState().openApp(EXPLORER_APP_LABEL)
  },
  reset: () => set(initialState),
}))

function syncTitle(state: ExplorerStore) {
  const title = getFolder(state.entries[state.index])?.name ?? root.name
  useAppStore.getState().setAppTitle(EXPLORER_APP_LABEL, title)
}

syncTitle(useExplorerStore.getState())
useExplorerStore.subscribe(syncTitle)

useAppStore.subscribe((state, prev) => {
  const current = state.apps[EXPLORER_APP_LABEL].state
  const previous = prev.apps[EXPLORER_APP_LABEL].state
  if (current === 'closed' && previous !== 'closed') {
    useExplorerStore.getState().reset()
  }
})

export default useExplorerStore
