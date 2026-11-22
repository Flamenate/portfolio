import { persist } from 'zustand/middleware'
import { create } from 'zustand/react'
import { logAction } from './log.store'

export const locales = {
  eng: 'English (United States)',
  es: 'Español',
  fr: 'Français',
} as const

export const localeDescriptions = {
  eng: 'English (United States), QWERTY',
  es: 'Español, QWERTY',
  fr: 'Français, AZERTY',
} as const

export type Locale = keyof typeof locales

export const paletteDescriptions = {
  light: 'Description to match locale menu...',
  dark: 'The things we do for design consistency',
  system: 'Here I can put: Follow system settings',
} as const

export type Palette = keyof typeof paletteDescriptions

export type ThemeData = {
  palette: Palette
  locale: Locale
  volume: number
}
export const defaultTheme: ThemeData = {
  palette: 'system',
  locale: 'eng',
  volume: 75,
}
type ThemeActions = {
  [K in keyof ThemeData as `set${Capitalize<K & string>}`]: (
    value: ThemeData[K],
  ) => void
}

export const useThemeStore = create<ThemeData & ThemeActions>()(
  persist(
    (set) => ({
      ...defaultTheme,
      setPalette: (palette: Palette) => {
        set({ palette })
        logAction('change_theme_palette', palette)
      },
      setLocale: (locale: Locale) => {
        set({ locale })
        logAction('change_locale', locale)
      },
      setVolume: (volume: number) => {
        set({ volume })
        logAction('change_volume', volume.toString())
      },
    }),
    {
      name: 'theme-store',
    },
  ),
)

export default useThemeStore
