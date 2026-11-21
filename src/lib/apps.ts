import { lazy } from 'react'
import type { ComponentType, LazyExoticComponent } from 'react'
import { DEFAULT_WINDOW_COORDINATES } from '@/lib/constants'
import type { TranslationKey } from '@/lib/localize'
import type { AppRecord } from '@/stores/app.store'

type AppDefinition = {
  iconSrc: string
  pinned: boolean
  content: LazyExoticComponent<ComponentType>
}

export const appDefinitions = {
  haythem_frikha: {
    iconSrc: '/images/icons/explorer.webp',
    pinned: true,
    content: lazy(() =>
      import('@/components/apps/file-explorer').then((module) => ({
        default: module.FileExplorer,
      })),
    ),
  },
  browser: {
    iconSrc: '/images/icons/browser.webp',
    pinned: true,
    content: lazy(() =>
      import('@/components/apps/browser').then((module) => ({
        default: module.Browser,
      })),
    ),
  },
  vscope: {
    iconSrc: '/images/icons/vscope.webp',
    pinned: true,
    content: lazy(() =>
      import('@/components/apps/vscope').then((module) => ({
        default: module.VSCope,
      })),
    ),
  },
  terminal: {
    iconSrc: '/images/icons/terminal.png',
    pinned: false,
    content: lazy(() =>
      import('@/components/apps/terminal').then((module) => ({
        default: module.Terminal,
      })),
    ),
  },
  mail: {
    iconSrc: '/images/icons/mail.webp',
    pinned: false,
    content: lazy(() =>
      import('@/components/apps/mail').then((module) => ({
        default: module.Mail,
      })),
    ),
  },
  calculator: {
    iconSrc: '/images/icons/calculator.png',
    pinned: false,
    content: lazy(() =>
      import('@/components/apps/calculator').then((module) => ({
        default: module.Calculator,
      })),
    ),
  },
  notepad: {
    iconSrc: '/images/icons/notepad.png',
    pinned: false,
    content: lazy(() =>
      import('@/components/apps/notepad').then((module) => ({
        default: module.Notepad,
      })),
    ),
  },
  photos: {
    iconSrc: '/images/icons/photos.webp',
    pinned: false,
    content: lazy(() =>
      import('@/components/apps/photos').then((module) => ({
        default: module.Photos,
      })),
    ),
  },
  gymnast_pdf: {
    iconSrc: '/images/icons/gymnast_pdf.webp',
    pinned: false,
    content: lazy(() =>
      import('@/components/apps/gymnast').then((module) => ({
        default: module.Gymnast,
      })),
    ),
  },
  spotiwhy: {
    iconSrc: '/images/icons/spotiwhy.webp',
    pinned: false,
    content: lazy(() =>
      import('@/components/apps/notepad').then((module) => ({
        default: module.Notepad,
      })),
    ),
  },
  vapor: {
    iconSrc: '/images/icons/vapor.webp',
    pinned: false,
    content: lazy(() =>
      import('@/components/apps/vapor').then((module) => ({
        default: module.Vapor,
      })),
    ),
  },
  concord: {
    iconSrc: '/images/icons/concord.webp',
    pinned: false,
    content: lazy(() =>
      import('@/components/apps/concord').then((module) => ({
        default: module.Concord,
      })),
    ),
  },
} satisfies Partial<Record<TranslationKey, AppDefinition>>

export type AppLabel = keyof typeof appDefinitions

export const appLabels = Object.keys(appDefinitions) as AppLabel[]

export function isAppLabel(value: string): value is AppLabel {
  return Object.hasOwn(appDefinitions, value)
}

export function createApps() {
  return Object.fromEntries(
    appLabels.map((label) => [
      label,
      {
        label,
        iconSrc: appDefinitions[label].iconSrc,
        pinned: appDefinitions[label].pinned,
        title: null,
        state: 'closed',
        coordinates: { ...DEFAULT_WINDOW_COORDINATES },
        restoredCoordinates: null,
      } satisfies AppRecord,
    ]),
  ) as Record<AppLabel, AppRecord>
}
