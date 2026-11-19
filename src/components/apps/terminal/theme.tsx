import localize from '@/lib/localize'
import type { Command } from '@/lib/terminal-commands'
import useThemeStore, { paletteDescriptions } from '@/stores/theme.store'
import type { Palette } from '@/stores/theme.store'

function isPalette(value: string | undefined): value is Palette {
  return value !== undefined && Object.hasOwn(paletteDescriptions, value)
}

export const themeCommand: Command = ({ args, locale }) => {
  const isModifying = args[0]?.toLowerCase() === 'set'
  const newPalette = args.at(1)?.toLowerCase()
  const themeStore = useThemeStore.getState()

  if (!isModifying) {
    return (
      <p>
        {localize('terminal_current_theme', locale)}:{' '}
        <strong>{localize(themeStore.palette, locale)}</strong>
      </p>
    )
  }

  if (!isPalette(newPalette)) {
    return <p>{localize('terminal_invalid_theme', locale)}</p>
  }

  themeStore.setPalette(newPalette)
  return (
    <p>
      {localize('terminal_theme_set', locale, localize(newPalette, locale))}
    </p>
  )
}
