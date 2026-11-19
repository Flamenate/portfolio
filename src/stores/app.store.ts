import { create } from 'zustand/react'
import { createApps } from '@/lib/apps'
import type { AppLabel } from '@/lib/apps'
import {
  MinimumSize,
  closeRecord,
  defaultCoordinates,
  finishUnminimizeRecord,
  maximizeRecord,
  minimizeRecord,
  openRecord,
  releaseMaximizeRecord,
  sameCoordinates,
  unmaximizeRecord,
  unminimizeRecord,
  withCoordinates,
} from '@/models/application'
import type { AppRecord, WindowCoordinates } from '@/models/application'
import { logAction } from './log.store'

interface ApplicationStore {
  apps: Record<AppLabel, AppRecord>
  openAppLabels: AppLabel[]
  openApp: (label: AppLabel, options?: { title?: string }) => void
  setAppTitle: (label: AppLabel, title: string | null) => void
  closeApp: (label: AppLabel) => void
  minimizeApp: (label: AppLabel) => void
  unminimizeApp: (label: AppLabel) => void
  finishUnminimize: (label: AppLabel) => void
  maximizeApp: (label: AppLabel) => void
  unmaximizeApp: (label: AppLabel) => void
  releaseMaximize: (label: AppLabel) => void
  focusedAppLabel: AppLabel | null
  focusApp: (label: AppLabel) => void
  updateAppCoordinates: (
    label: AppLabel,
    coordinates: Partial<WindowCoordinates>,
  ) => void
  // Desktop shortcut ids: app labels and folder path keys.
  selectedShortcutIds: string[]
  selectShortcut: (id: string, additive?: boolean) => void
  unselectShortcut: (id: string) => void
  clearSelectedShortcuts: () => void
  pinApp: (label: AppLabel) => void
  unpinApp: (label: AppLabel) => void
}

function sizeForFirstOpen(coordinates: WindowCoordinates): WindowCoordinates {
  const isDefault = sameCoordinates(coordinates, defaultCoordinates)
  if (!isDefault || typeof window === 'undefined') return coordinates
  return {
    x: defaultCoordinates.x,
    y: defaultCoordinates.y,
    width: Math.max(MinimumSize.width, Math.round(window.innerWidth * 0.6)),
    height: Math.max(MinimumSize.height, Math.round(window.innerHeight * 0.6)),
  }
}

function maximizedFrame(): WindowCoordinates {
  return {
    x: 0,
    y: 0,
    width: window.innerWidth,
    height: Math.max(MinimumSize.height, window.innerHeight - 64),
  }
}

export const useAppStore = create<ApplicationStore>()((set, get) => ({
  apps: createApps(),
  openAppLabels: [],
  openApp: (label, options) => {
    const state = get()
    const current = state.apps[label]
    const app =
      options?.title === undefined
        ? current
        : { ...current, title: options.title }
    if (app.state === 'minimized' || app.state === 'unminimizing') {
      set({
        apps: { ...state.apps, [label]: unminimizeRecord(app) },
        focusedAppLabel: label,
      })
      return
    }
    if (app.state === 'open' || app.state === 'maximized') {
      set({
        apps: app === current ? state.apps : { ...state.apps, [label]: app },
        focusedAppLabel: label,
      })
      return
    }
    set({
      apps: {
        ...state.apps,
        [label]: openRecord(app, sizeForFirstOpen(app.coordinates)),
      },
      openAppLabels: state.openAppLabels.includes(label)
        ? state.openAppLabels
        : state.openAppLabels.concat(label),
      focusedAppLabel: label,
    })
    logAction('open_app', label)
  },
  setAppTitle: (label, title) =>
    set((state) => {
      const app = state.apps[label]
      if (app.title === title) return state
      return { apps: { ...state.apps, [label]: { ...app, title } } }
    }),
  closeApp: (label) => {
    const state = get()
    const app = state.apps[label]
    if (app.state === 'closed') return
    const openAppLabels = state.openAppLabels.filter(
      (openLabel) => openLabel !== label,
    )
    set({
      apps: { ...state.apps, [label]: closeRecord(app) },
      openAppLabels,
      focusedAppLabel:
        state.focusedAppLabel === label
          ? (openAppLabels.at(-1) ?? null)
          : state.focusedAppLabel,
    })
    logAction('close_app', label)
  },
  minimizeApp: (label) => {
    const { apps } = get()
    const app = apps[label]
    if (app.state === 'minimized' || app.state === 'closed') return
    set({ apps: { ...apps, [label]: minimizeRecord(app) } })
    logAction('minimize_app', label)
  },
  unminimizeApp: (label) => {
    const { apps } = get()
    const app = apps[label]
    if (app.state === 'open' || app.state === 'closed') return
    set({
      apps: { ...apps, [label]: unminimizeRecord(app) },
      focusedAppLabel: label,
    })
    logAction('unminimize_app', label)
  },
  finishUnminimize: (label) =>
    set((state) => {
      const app = state.apps[label]
      const next = finishUnminimizeRecord(app)
      if (next === app) return state
      return { apps: { ...state.apps, [label]: next } }
    }),
  maximizeApp: (label) => {
    const { apps } = get()
    const app = apps[label]
    if (app.state === 'maximized' || typeof window === 'undefined') return
    set({ apps: { ...apps, [label]: maximizeRecord(app, maximizedFrame()) } })
    logAction('maximize_app', label)
  },
  unmaximizeApp: (label) => {
    const { apps } = get()
    const app = apps[label]
    if (app.state !== 'maximized') return
    set({ apps: { ...apps, [label]: unmaximizeRecord(app) } })
    logAction('unmaximize_app', label)
  },
  releaseMaximize: (label) =>
    set((state) => {
      const app = state.apps[label]
      const next = releaseMaximizeRecord(app)
      if (next === app) return state
      return { apps: { ...state.apps, [label]: next } }
    }),
  focusedAppLabel: null,
  focusApp: (label) => {
    set({ focusedAppLabel: label })
  },
  updateAppCoordinates: (label, partial) => {
    const { apps } = get()
    const app = apps[label]
    const next = withCoordinates(app, partial)
    if (sameCoordinates(app.coordinates, next.coordinates)) return
    set({ apps: { ...apps, [label]: next } })
    logAction('move_resize_app', label)
  },
  selectedShortcutIds: [],
  selectShortcut: (id, additive = false) => {
    set((state) => {
      if (!additive) return { selectedShortcutIds: [id] }
      if (state.selectedShortcutIds.includes(id)) return state
      return { selectedShortcutIds: [...state.selectedShortcutIds, id] }
    })
  },
  unselectShortcut: (id) => {
    set((state) => ({
      selectedShortcutIds: state.selectedShortcutIds.filter(
        (selected) => selected !== id,
      ),
    }))
  },
  clearSelectedShortcuts: () => {
    set({ selectedShortcutIds: [] })
  },
  pinApp: (label) => {
    const { apps } = get()
    const app = apps[label]
    if (app.pinned) return
    set({ apps: { ...apps, [label]: { ...app, pinned: true } } })
    logAction('pin_app', label)
  },
  unpinApp: (label) => {
    const { apps } = get()
    const app = apps[label]
    if (!app.pinned) return
    set({ apps: { ...apps, [label]: { ...app, pinned: false } } })
    logAction('unpin_app', label)
  },
}))

export default useAppStore
