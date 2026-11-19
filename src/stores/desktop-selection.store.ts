import { create } from 'zustand/react'
import type { AppLabel } from '@/lib/apps'
import { isSamePath } from '@/lib/directories'
import type { FolderPath } from '@/lib/directories'
import { useAppStore } from './app.store'
import { useExplorerStore } from './explorer.store'

export type DesktopShortcut =
  | { kind: 'app'; label: AppLabel }
  | { kind: 'folder'; path: FolderPath }

interface DesktopSelectionStore {
  selected: DesktopShortcut[]
  // Plain click selects only the shortcut; ctrl-click toggles it in the Selection.
  click: (shortcut: DesktopShortcut, modifiers: { ctrl: boolean }) => void
  contextClick: (shortcut: DesktopShortcut) => void
  clear: () => void
  openShortcut: (shortcut: DesktopShortcut) => void
  openSelected: () => void
}

function isSameShortcut(a: DesktopShortcut, b: DesktopShortcut) {
  if (a.kind === 'app' && b.kind === 'app') return a.label === b.label
  if (a.kind === 'folder' && b.kind === 'folder')
    return isSamePath(a.path, b.path)
  return false
}

const includesShortcut = (
  selected: DesktopShortcut[],
  shortcut: DesktopShortcut,
) => selected.some((other) => isSameShortcut(other, shortcut))

function open(shortcut: DesktopShortcut) {
  if (shortcut.kind === 'app') useAppStore.getState().openApp(shortcut.label)
  else useExplorerStore.getState().openFolder(shortcut.path)
}

export const useDesktopSelectionStore = create<DesktopSelectionStore>()(
  (set, get) => ({
    selected: [],
    click: (shortcut, { ctrl }) =>
      set((state) => {
        const isSelected = includesShortcut(state.selected, shortcut)
        if (!ctrl)
          return isSelected && state.selected.length === 1
            ? state
            : { selected: [shortcut] }
        return {
          selected: isSelected
            ? state.selected.filter((other) => !isSameShortcut(other, shortcut))
            : [...state.selected, shortcut],
        }
      }),
    contextClick: (shortcut) =>
      set((state) =>
        includesShortcut(state.selected, shortcut)
          ? state
          : { selected: [shortcut] },
      ),
    clear: () => set({ selected: [] }),
    openShortcut: (shortcut) => {
      open(shortcut)
      set({ selected: [] })
    },
    openSelected: () => {
      for (const shortcut of get().selected) open(shortcut)
      set({ selected: [] })
    },
  }),
)

export function useIsSelected(shortcut: DesktopShortcut) {
  return useDesktopSelectionStore((state) =>
    includesShortcut(state.selected, shortcut),
  )
}

export default useDesktopSelectionStore
