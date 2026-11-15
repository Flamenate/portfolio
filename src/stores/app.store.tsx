import { create } from 'zustand'
import { createApps } from '@/lib/apps'
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
  apps: Record<string, AppRecord>
  openAppLabels: string[]
  openApp: (label: string, options?: { title?: string }) => void
  setAppTitle: (label: string, title: string | null) => void
  closeApp: (label: string) => void
  minimizeApp: (label: string) => void
  unminimizeApp: (label: string) => void
  finishUnminimize: (label: string) => void
  maximizeApp: (label: string) => void
  unmaximizeApp: (label: string) => void
  releaseMaximize: (label: string) => void
  focusedAppLabel: string | null
  focusApp: (label: string) => void
  updateAppCoordinates: (
    label: string,
    coordinates: Partial<WindowCoordinates>,
  ) => void
  selectedAppLabels: string[]
  selectApp: (label: string, additive?: boolean) => void
  unselectApp: (label: string) => void
  clearSelectedApps: () => void
  pinApp: (label: string) => void
  unpinApp: (label: string) => void
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
  selectedAppLabels: [],
  selectApp: (label, additive = false) => {
    set((state) => {
      if (!additive) return { selectedAppLabels: [label] }
      if (state.selectedAppLabels.includes(label)) return state
      return { selectedAppLabels: [...state.selectedAppLabels, label] }
    })
  },
  unselectApp: (label) => {
    set((state) => ({
      selectedAppLabels: state.selectedAppLabels.filter(
        (selected) => selected !== label,
      ),
    }))
  },
  clearSelectedApps: () => {
    set({ selectedAppLabels: [] })
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
