import { create } from 'zustand/react'
import { createApps } from '@/lib/apps'
import type { AppLabel } from '@/lib/apps'
import {
  DEFAULT_WINDOW_COORDINATES,
  FIRST_OPEN_VIEWPORT_RATIO,
  MINIMUM_WINDOW_SIZE,
  TASKBAR_HEIGHT,
} from '@/lib/constants'
import { logAction } from './log.store'

export type WindowState = 'closed' | 'minimized' | 'open' | 'maximized'

export type WindowCoordinates = {
  x: number
  y: number
  width: number
  height: number
}

export type AppRecord = {
  label: AppLabel
  iconSrc: string
  title: string | null
  state: WindowState
  coordinates: WindowCoordinates
  // Where the Window returns to when it leaves maximize.
  restoredCoordinates: WindowCoordinates | null
  pinned: boolean
}

export type Activation = 'opened' | 'restored' | 'focused' | 'minimized'

interface AppStore {
  apps: Record<AppLabel, AppRecord>
  openAppLabels: AppLabel[]
  focusedAppLabel: AppLabel | null
  // Most recently focused first; picks where focus falls back to.
  focusHistory: AppLabel[]
  // Opens a closed App, restores a minimized one, and focuses it either way.
  openApp: (label: AppLabel, options?: { title?: string }) => void
  // The taskbar toggle; reports what it did so the shortcut can animate.
  activateApp: (label: AppLabel) => Activation
  closeApp: (label: AppLabel) => void
  closeAllApps: () => void
  minimizeApp: (label: AppLabel) => void
  // Only visible Windows can take focus.
  focusApp: (label: AppLabel) => void
  toggleMaximizeApp: (label: AppLabel) => void
  // A resize leaves maximize at the current frame.
  beginResizeApp: (label: AppLabel) => void
  updateAppCoordinates: (
    label: AppLabel,
    coordinates: Partial<WindowCoordinates>,
  ) => void
  setAppTitle: (label: AppLabel, title: string | null) => void
  pinApp: (label: AppLabel) => void
  unpinApp: (label: AppLabel) => void
}

const isVisible = (app: AppRecord) =>
  app.state === 'open' || app.state === 'maximized'

function sameCoordinates(current: WindowCoordinates, next: WindowCoordinates) {
  return (
    current.x === next.x &&
    current.y === next.y &&
    current.width === next.width &&
    current.height === next.height
  )
}

// The Window moved to `state`, back at its coordinates outside of maximize.
function withoutMaximize(app: AppRecord, state: WindowState): AppRecord {
  return {
    ...app,
    state,
    coordinates:
      app.state === 'maximized'
        ? (app.restoredCoordinates ?? app.coordinates)
        : app.coordinates,
    restoredCoordinates: null,
  }
}

function focusUpdate(state: AppStore, label: AppLabel) {
  return {
    focusedAppLabel: label,
    focusHistory: [
      label,
      ...state.focusHistory.filter((other) => other !== label),
    ],
  }
}

// Swaps in a record for a Window leaving the screen; if it had focus, focus
// falls back to the most recently focused Window that is still visible.
function hideWindow(state: AppStore, hidden: AppRecord) {
  const apps = { ...state.apps, [hidden.label]: hidden }
  return {
    apps,
    focusedAppLabel:
      state.focusedAppLabel === hidden.label
        ? (state.focusHistory.find((label) => isVisible(apps[label])) ?? null)
        : state.focusedAppLabel,
  }
}

function firstOpenCoordinates(
  coordinates: WindowCoordinates,
): WindowCoordinates {
  const isDefault = sameCoordinates(coordinates, DEFAULT_WINDOW_COORDINATES)
  if (!isDefault || typeof window === 'undefined') return coordinates
  return {
    x: DEFAULT_WINDOW_COORDINATES.x,
    y: DEFAULT_WINDOW_COORDINATES.y,
    width: Math.max(
      MINIMUM_WINDOW_SIZE.width,
      Math.round(window.innerWidth * FIRST_OPEN_VIEWPORT_RATIO),
    ),
    height: Math.max(
      MINIMUM_WINDOW_SIZE.height,
      Math.round(window.innerHeight * FIRST_OPEN_VIEWPORT_RATIO),
    ),
  }
}

function maximizedFrame(): WindowCoordinates {
  return {
    x: 0,
    y: 0,
    width: window.innerWidth,
    height: Math.max(
      MINIMUM_WINDOW_SIZE.height,
      window.innerHeight - TASKBAR_HEIGHT,
    ),
  }
}

export const useAppStore = create<AppStore>()((set, get) => ({
  apps: createApps(),
  openAppLabels: [],
  focusedAppLabel: null,
  focusHistory: [],
  openApp: (label, options) => {
    const state = get()
    const current = state.apps[label]
    const app =
      options?.title === undefined
        ? current
        : { ...current, title: options.title }
    if (app.state === 'minimized') {
      set({
        apps: {
          ...state.apps,
          [label]: { ...app, state: 'open', restoredCoordinates: null },
        },
        ...focusUpdate(state, label),
      })
      logAction('unminimize_app', label)
      return
    }
    if (isVisible(app)) {
      set({
        apps: app === current ? state.apps : { ...state.apps, [label]: app },
        ...focusUpdate(state, label),
      })
      return
    }
    set({
      apps: {
        ...state.apps,
        [label]: {
          ...app,
          state: 'open',
          coordinates: firstOpenCoordinates(app.coordinates),
          restoredCoordinates: null,
        },
      },
      openAppLabels: state.openAppLabels.includes(label)
        ? state.openAppLabels
        : state.openAppLabels.concat(label),
      ...focusUpdate(state, label),
    })
    logAction('open_app', label)
  },
  activateApp: (label) => {
    const state = get()
    const app = state.apps[label]
    if (app.state === 'closed') {
      state.openApp(label)
      return 'opened'
    }
    if (app.state === 'minimized') {
      state.openApp(label)
      return 'restored'
    }
    if (state.focusedAppLabel === label) {
      state.minimizeApp(label)
      return 'minimized'
    }
    state.focusApp(label)
    return 'focused'
  },
  closeApp: (label) => {
    const state = get()
    const app = state.apps[label]
    if (app.state === 'closed') return
    set({
      ...hideWindow(state, { ...withoutMaximize(app, 'closed'), title: null }),
      openAppLabels: state.openAppLabels.filter(
        (openLabel) => openLabel !== label,
      ),
    })
    logAction('close_app', label)
  },
  closeAllApps: () => {
    const state = get()
    for (const label of state.openAppLabels) state.closeApp(label)
  },
  minimizeApp: (label) => {
    const state = get()
    const app = state.apps[label]
    if (!isVisible(app)) return
    set(hideWindow(state, withoutMaximize(app, 'minimized')))
    logAction('minimize_app', label)
  },
  focusApp: (label) => {
    set((state) =>
      isVisible(state.apps[label]) ? focusUpdate(state, label) : state,
    )
  },
  toggleMaximizeApp: (label) => {
    const { apps } = get()
    const app = apps[label]
    if (app.state === 'maximized') {
      set({ apps: { ...apps, [label]: withoutMaximize(app, 'open') } })
      logAction('unmaximize_app', label)
      return
    }
    if (app.state !== 'open' || typeof window === 'undefined') return
    set({
      apps: {
        ...apps,
        [label]: {
          ...app,
          state: 'maximized',
          coordinates: maximizedFrame(),
          restoredCoordinates: app.coordinates,
        },
      },
    })
    logAction('maximize_app', label)
  },
  beginResizeApp: (label) => {
    const state = get()
    const app = state.apps[label]
    if (!isVisible(app)) return
    set({
      apps:
        app.state === 'maximized'
          ? {
              ...state.apps,
              [label]: { ...app, state: 'open', restoredCoordinates: null },
            }
          : state.apps,
      ...focusUpdate(state, label),
    })
  },
  updateAppCoordinates: (label, partial) => {
    const { apps } = get()
    const app = apps[label]
    const coordinates = { ...app.coordinates, ...partial }
    if (sameCoordinates(app.coordinates, coordinates)) return
    set({ apps: { ...apps, [label]: { ...app, coordinates } } })
    logAction('move_resize_app', label)
  },
  setAppTitle: (label, title) =>
    set((state) => {
      const app = state.apps[label]
      if (app.title === title) return state
      return { apps: { ...state.apps, [label]: { ...app, title } } }
    }),
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
