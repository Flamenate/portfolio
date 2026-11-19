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
    import('@/components/apps/photos').then((module) => ({
      default: module.Photos,
    })),
  ),
  gymnast_pdf: lazy(() =>
    import('@/components/apps/gymnast').then((module) => ({
      default: module.Gymnast,
    })),
  ),
  spotiwhy: lazy(() =>
    import('@/components/apps/notepad').then((module) => ({
      default: module.Notepad,
    })),
  ),
  vapor: lazy(() =>
    import('@/components/apps/vapor').then((module) => ({
      default: module.Vapor,
    })),
  ),
  concord: lazy(() =>
    import('@/components/apps/concord').then((module) => ({
      default: module.Concord,
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
    iconSrc: '/images/icons/explorer.webp',
    pinned: true,
  },
  { label: 'browser', iconSrc: '/images/icons/browser.webp', pinned: true },
  { label: 'terminal', iconSrc: '/images/icons/terminal.png', pinned: false },
  { label: 'mail', iconSrc: '/images/icons/mail.webp', pinned: false },
  {
    label: 'calculator',
    iconSrc: '/images/icons/calculator.png',
    pinned: false,
  },
  { label: 'notepad', iconSrc: '/images/icons/notepad.png', pinned: false },
  { label: 'photos', iconSrc: '/images/icons/photos.webp', pinned: false },
  {
    label: 'gymnast_pdf',
    iconSrc: '/images/icons/gymnast_pdf.webp',
    pinned: false,
  },
  {
    label: 'spotiwhy',
    iconSrc: '/images/icons/spotiwhy.webp',
    pinned: false,
  },
  { label: 'vapor', iconSrc: '/images/icons/vapor.webp', pinned: false },
  { label: 'concord', iconSrc: '/images/icons/concord.webp', pinned: false },
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
