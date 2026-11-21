import { create } from 'zustand/react'
import type { AppLabel } from '@/lib/apps'
import { fileId, pathKey } from '@/lib/directories'
import type { FolderPath, LocatedFile } from '@/lib/directories'
import { openFile } from '@/lib/open-file'
import { useAppStore } from './app.store'
import { useExplorerStore } from './explorer.store'

export type DesktopShortcut =
  | { kind: 'app'; label: AppLabel }
  | { kind: 'folder'; path: FolderPath }
  | { kind: 'file'; file: LocatedFile }

interface DesktopSelectionStore {
  selected: DesktopShortcut[]
  // Plain click selects only the shortcut; ctrl-click toggles it in the Selection.
  click: (shortcut: DesktopShortcut, modifiers: { ctrl: boolean }) => void
  contextClick: (shortcut: DesktopShortcut) => void
  clear: () => void
  openShortcut: (shortcut: DesktopShortcut) => void
  openSelected: () => void
}

function shortcutId(shortcut: DesktopShortcut) {
  if (shortcut.kind === 'app') return `app:${shortcut.label}`
  if (shortcut.kind === 'folder') return pathKey(shortcut.path)
  return fileId(shortcut.file)
}

const includesShortcut = (
  selected: DesktopShortcut[],
  shortcut: DesktopShortcut,
) => selected.some((other) => shortcutId(other) === shortcutId(shortcut))

function open(shortcut: DesktopShortcut) {
  if (shortcut.kind === 'app') useAppStore.getState().openApp(shortcut.label)
  else if (shortcut.kind === 'folder')
    useExplorerStore.getState().openFolder(shortcut.path)
  else openFile(shortcut.file)
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
            ? state.selected.filter(
                (other) => shortcutId(other) !== shortcutId(shortcut),
              )
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
