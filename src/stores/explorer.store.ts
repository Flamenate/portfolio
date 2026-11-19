import { create } from 'zustand/react'
import { root } from '@/data/directories'
import type { AppLabel } from '@/lib/apps'
import { getFolder, isSamePath } from '@/lib/directories'
import type { FolderNode, FolderPath } from '@/lib/directories'
import { useAppStore } from './app.store'

export const EXPLORER_APP_LABEL = 'haythem_frikha' satisfies AppLabel

type ExplorerLocation = { path: FolderPath; folder: FolderNode }

interface NavigationHistory {
  entries: ExplorerLocation[]
  index: number
}

interface ExplorerStore extends NavigationHistory {
  location: ExplorerLocation
  canGoBack: boolean
  canGoForward: boolean
  navigate: (path: FolderPath) => void
  back: () => void
  forward: () => void
  openFolder: (path: FolderPath) => void
  reset: () => void
}

// Derived fields are stored so selectors return stable references.
function navigationState(entries: ExplorerLocation[], index: number) {
  const clamped = Math.min(Math.max(index, 0), entries.length - 1)
  return {
    entries,
    index: clamped,
    location: entries[clamped],
    canGoBack: clamped > 0,
    canGoForward: clamped < entries.length - 1,
  }
}

const initialState = () => navigationState([{ path: [], folder: root }], 0)

export const useExplorerStore = create<ExplorerStore>()((set, get) => ({
  ...initialState(),
  navigate: (path) =>
    set((state) => {
      const folder = getFolder(path)
      if (!folder || isSamePath(state.location.path, path)) return state
      const kept = state.entries.slice(0, state.index + 1)
      return navigationState([...kept, { path, folder }], kept.length)
    }),
  back: () => set((state) => navigationState(state.entries, state.index - 1)),
  forward: () =>
    set((state) => navigationState(state.entries, state.index + 1)),
  openFolder: (path) => {
    get().navigate(path)
    useAppStore.getState().openApp(EXPLORER_APP_LABEL)
  },
  reset: () => set(initialState()),
}))

// Closing the explorer window, from any state, starts the next session at the root.
// This can't live in the window's unmount: minimized windows run effect cleanups
// when hidden by <Activity>, not when closed.
useAppStore.subscribe((state, prev) => {
  const current = state.apps[EXPLORER_APP_LABEL].state
  const previous = prev.apps[EXPLORER_APP_LABEL].state
  if (current === 'closed' && previous !== 'closed') {
    useExplorerStore.getState().reset()
  }
})

export default useExplorerStore
