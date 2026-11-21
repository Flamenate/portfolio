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
    iconSrc: '/media/icons/explorer.webp',
    pinned: true,
    content: lazy(() =>
      import('@/components/apps/file-explorer').then((module) => ({
        default: module.FileExplorer,
      })),
    ),
  },
  vscope: {
    iconSrc: '/media/icons/vscope.webp',
    pinned: false,
    content: lazy(() =>
      import('@/components/apps/vscope').then((module) => ({
        default: module.VSCope,
      })),
    ),
  },
  terminal: {
    iconSrc: '/media/icons/terminal.png',
    pinned: true,
    content: lazy(() =>
      import('@/components/apps/terminal').then((module) => ({
        default: module.Terminal,
      })),
    ),
  },
  mail: {
    iconSrc: '/media/icons/mail.webp',
    pinned: false,
    content: lazy(() =>
      import('@/components/apps/mail').then((module) => ({
        default: module.Mail,
      })),
    ),
  },
  calculator: {
    iconSrc: '/media/icons/calculator.png',
    pinned: false,
    content: lazy(() =>
      import('@/components/apps/calculator').then((module) => ({
        default: module.Calculator,
      })),
    ),
  },
  notepad: {
    iconSrc: '/media/icons/notepad.png',
    pinned: false,
    content: lazy(() =>
      import('@/components/apps/notepad').then((module) => ({
        default: module.Notepad,
      })),
    ),
  },
  photos: {
    iconSrc: '/media/icons/photos.webp',
    pinned: false,
    content: lazy(() =>
      import('@/components/apps/photos').then((module) => ({
        default: module.Photos,
      })),
    ),
  },
  gymnast_pdf: {
    iconSrc: '/media/icons/gymnast_pdf.webp',
    pinned: false,
    content: lazy(() =>
      import('@/components/apps/gymnast').then((module) => ({
        default: module.Gymnast,
      })),
    ),
  },
  spotiwhy: {
    iconSrc: '/media/icons/spotiwhy.webp',
    pinned: false,
    content: lazy(() =>
      import('@/components/apps/notepad').then((module) => ({
        default: module.Notepad,
      })),
    ),
  },
  vapor: {
    iconSrc: '/media/icons/vapor.webp',
    pinned: true,
    content: lazy(() =>
      import('@/components/apps/vapor').then((module) => ({
        default: module.Vapor,
      })),
    ),
  },
  concord: {
    iconSrc: '/media/icons/concord.webp',
    pinned: false,
    content: lazy(() =>
      import('@/components/apps/concord').then((module) => ({
        default: module.Concord,
      })),
    ),
  },
  browser: {
    iconSrc: '/media/icons/browser.webp',
    pinned: true,
    content: lazy(() =>
      import('@/components/apps/browser').then((module) => ({
        default: module.Browser,
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
