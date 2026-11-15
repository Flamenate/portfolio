import { lazy } from 'react'
import type { ComponentType, LazyExoticComponent } from 'react'
import { defaultCoordinates } from '@/models/application'
import type { AppRecord } from '@/models/application'

type AppContent = LazyExoticComponent<ComponentType>

export const appContent: Record<string, AppContent> = {
  haythem_frikha: lazy(() =>
    import('@/components/apps/file-explorer').then((module) => ({
      default: module.FileExplorer,
    })),
  ),
  browser: lazy(() =>
    import('@/components/apps/browser').then((module) => ({
      default: module.Browser,
    })),
  ),
  terminal: lazy(() =>
    import('@/components/apps/terminal').then((module) => ({
      default: module.Terminal,
    })),
  ),
  mail: lazy(() =>
    import('@/components/apps/mail').then((module) => ({
      default: module.Mail,
    })),
  ),
  calculator: lazy(() =>
    import('@/components/apps/calculator').then((module) => ({
      default: module.Calculator,
    })),
  ),
  notepad: lazy(() =>
    import('@/components/apps/notepad').then((module) => ({
      default: module.Notepad,
    })),
  ),
  photos: lazy(() =>
    import('@/components/apps/notepad').then((module) => ({
      default: module.Notepad,
    })),
  ),
  adoobie_gymnast: lazy(() =>
    import('@/components/apps/notepad').then((module) => ({
      default: module.Notepad,
    })),
  ),
}

const appDefinitions: Array<{
  label: string
  iconSrc: string
  pinned: boolean
}> = [
  {
    label: 'haythem_frikha',
    iconSrc: '/images/explorer.png',
    pinned: true,
  },
  { label: 'browser', iconSrc: '/images/browser.webp', pinned: true },
  { label: 'terminal', iconSrc: '/images/terminal.png', pinned: false },
  { label: 'mail', iconSrc: '/images/mail.png', pinned: false },
  { label: 'calculator', iconSrc: '/images/calculator.png', pinned: false },
  { label: 'notepad', iconSrc: '/images/notepad.png', pinned: false },
  { label: 'photos', iconSrc: '/images/photos.png', pinned: false },
  {
    label: 'adoobie_gymnast',
    iconSrc: '/images/adoobie_gymnast.webp',
    pinned: false,
  },
]

export function createApps(): Record<string, AppRecord> {
  return Object.fromEntries(
    appDefinitions.map((definition) => [
      definition.label,
      {
        label: definition.label,
        iconSrc: definition.iconSrc,
        pinned: definition.pinned,
        title: null,
        state: 'closed',
        coordinates: { ...defaultCoordinates },
        restoredCoordinates: null,
      } satisfies AppRecord,
    ]),
  )
}
