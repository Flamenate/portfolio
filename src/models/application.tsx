import type { AppLabel } from '@/lib/apps'

export type AppState =
  | 'closed'
  | 'minimized'
  | 'open'
  | 'maximized'
  | 'unminimizing'

export type WindowCoordinates = {
  x: number
  y: number
  width: number
  height: number
}

export const MinimumSize = {
  width: 250,
  height: 300,
}

export const defaultCoordinates: WindowCoordinates = {
  x: 150,
  y: 150,
  width: 720,
  height: 480,
}

export type AppRecord = {
  label: AppLabel
  iconSrc: string
  title: string | null
  state: AppState
  coordinates: WindowCoordinates
  restoredCoordinates: WindowCoordinates | null
  pinned: boolean
}

export function sameCoordinates(
  current: WindowCoordinates,
  next: WindowCoordinates,
) {
  return (
    current.x === next.x &&
    current.y === next.y &&
    current.width === next.width &&
    current.height === next.height
  )
}

export function withCoordinates(
  app: AppRecord,
  partial: Partial<WindowCoordinates>,
): AppRecord {
  return { ...app, coordinates: { ...app.coordinates, ...partial } }
}

export function openRecord(
  app: AppRecord,
  coordinates: WindowCoordinates,
): AppRecord {
  return {
    ...app,
    state: 'open',
    coordinates,
    restoredCoordinates: null,
  }
}

export function closeRecord(app: AppRecord): AppRecord {
  const coordinates =
    app.state === 'maximized'
      ? (app.restoredCoordinates ?? app.coordinates)
      : app.coordinates
  return {
    ...app,
    state: 'closed',
    title: null,
    coordinates,
    restoredCoordinates: null,
  }
}

export function minimizeRecord(app: AppRecord): AppRecord {
  const coordinates =
    app.state === 'maximized'
      ? (app.restoredCoordinates ?? app.coordinates)
      : app.coordinates
  return {
    ...app,
    state: 'minimized',
    coordinates,
    restoredCoordinates: coordinates,
  }
}

export function unminimizeRecord(app: AppRecord): AppRecord {
  return {
    ...app,
    state: 'unminimizing',
    coordinates: app.restoredCoordinates ?? app.coordinates,
  }
}

export function finishUnminimizeRecord(app: AppRecord): AppRecord {
  if (app.state !== 'unminimizing') return app
  return { ...app, state: 'open' }
}

export function maximizeRecord(
  app: AppRecord,
  frame: WindowCoordinates,
): AppRecord {
  return {
    ...app,
    state: 'maximized',
    restoredCoordinates:
      app.state === 'maximized' ? app.restoredCoordinates : app.coordinates,
    coordinates: frame,
  }
}

export function unmaximizeRecord(app: AppRecord): AppRecord {
  return {
    ...app,
    state: 'open',
    coordinates: app.restoredCoordinates ?? app.coordinates,
    restoredCoordinates: null,
  }
}

export function releaseMaximizeRecord(app: AppRecord): AppRecord {
  if (app.state !== 'maximized') return app
  return { ...app, state: 'open', restoredCoordinates: null }
}
