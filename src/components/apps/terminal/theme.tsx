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
        {locale.text('terminal_current_theme')}:{' '}
        <strong>{locale.text(themeStore.palette)}</strong>
      </p>
    )
  }

  if (!isPalette(newPalette)) {
    return <p>{locale.text('terminal_invalid_theme')}</p>
  }

  themeStore.setPalette(newPalette)
  return <p>{locale.text('terminal_theme_set', locale.text(newPalette))}</p>
}
