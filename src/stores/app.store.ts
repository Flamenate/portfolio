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
import { useLogStore } from './log.store'

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

export const useAppStore = create<ApplicationStore>()((set) => ({
  apps: createApps(),
  openAppLabels: [],
  openApp: (label, options) =>
    set((state) => {
      const current = state.apps[label]
      const app =
        options?.title === undefined
          ? current
          : { ...current, title: options.title }
      if (app.state === 'minimized' || app.state === 'unminimizing') {
        return {
          apps: { ...state.apps, [label]: unminimizeRecord(app) },
          focusedAppLabel: label,
        }
      }
      if (app.state === 'open' || app.state === 'maximized') {
        return {
          apps: app === current ? state.apps : { ...state.apps, [label]: app },
          focusedAppLabel: label,
        }
      }
      useLogStore.getState().logAction('open_app', label)
      return {
        apps: {
          ...state.apps,
          [label]: openRecord(app, sizeForFirstOpen(app.coordinates)),
        },
        openAppLabels: state.openAppLabels.includes(label)
          ? state.openAppLabels
          : state.openAppLabels.concat(label),
        focusedAppLabel: label,
      }
    }),
  setAppTitle: (label, title) =>
    set((state) => {
      const app = state.apps[label]
      if (app.title === title) return state
      return { apps: { ...state.apps, [label]: { ...app, title } } }
    }),
  closeApp: (label) =>
    set((state) => {
      const app = state.apps[label]
      if (app.state === 'closed') return state
      useLogStore.getState().logAction('close_app', label)
      const openAppLabels = state.openAppLabels.filter(
        (openLabel) => openLabel !== label,
      )
      return {
        apps: { ...state.apps, [label]: closeRecord(app) },
        openAppLabels,
        focusedAppLabel:
          state.focusedAppLabel === label
            ? (openAppLabels.at(-1) ?? null)
            : state.focusedAppLabel,
      }
    }),
  minimizeApp: (label) =>
    set((state) => {
      const app = state.apps[label]
      if (app.state === 'minimized' || app.state === 'closed') return state
      useLogStore.getState().logAction('minimize_app', label)
      return {
        apps: { ...state.apps, [label]: minimizeRecord(app) },
      }
    }),
  unminimizeApp: (label) =>
    set((state) => {
      const app = state.apps[label]
      if (app.state === 'open' || app.state === 'closed') return state
      useLogStore.getState().logAction('unminimize_app', label)
      return {
        apps: { ...state.apps, [label]: unminimizeRecord(app) },
        focusedAppLabel: label,
      }
    }),
  finishUnminimize: (label) =>
    set((state) => {
      const app = state.apps[label]
      const next = finishUnminimizeRecord(app)
      if (next === app) return state
      return { apps: { ...state.apps, [label]: next } }
    }),
  maximizeApp: (label) =>
    set((state) => {
      const app = state.apps[label]
      if (app.state === 'maximized' || typeof window === 'undefined')
        return state
      useLogStore.getState().logAction('maximize_app', label)
      return {
        apps: {
          ...state.apps,
          [label]: maximizeRecord(app, maximizedFrame()),
        },
      }
    }),
  unmaximizeApp: (label) =>
    set((state) => {
      const app = state.apps[label]
      if (app.state !== 'maximized') return state
      useLogStore.getState().logAction('unmaximize_app', label)
      return {
        apps: { ...state.apps, [label]: unmaximizeRecord(app) },
      }
    }),
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
  updateAppCoordinates: (label, partial) =>
    set((state) => {
      const app = state.apps[label]
      const next = withCoordinates(app, partial)
      if (sameCoordinates(app.coordinates, next.coordinates)) return state
      useLogStore.getState().logAction('move_resize_app', label)
      return { apps: { ...state.apps, [label]: next } }
    }),
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
  pinApp: (label) =>
    set((state) => {
      const app = state.apps[label]
      if (app.pinned) return state
      useLogStore.getState().logAction('pin_app', label)
      return {
        apps: { ...state.apps, [label]: { ...app, pinned: true } },
      }
    }),
  unpinApp: (label) =>
    set((state) => {
      const app = state.apps[label]
      if (!app.pinned) return state
      useLogStore.getState().logAction('unpin_app', label)
      return {
        apps: { ...state.apps, [label]: { ...app, pinned: false } },
      }
    }),
}))

export default useAppStore
