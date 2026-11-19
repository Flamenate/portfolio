import { useEffect } from 'react'
import type { Command } from '@/lib/terminal-commands'
import useThemeStore, { paletteDescriptions } from '@/stores/theme.store'
import type { Palette } from '@/stores/theme.store'
import localize from '@/utils/localize'

function isPalette(value: string | undefined): value is Palette {
  return value !== undefined && Object.hasOwn(paletteDescriptions, value)
}

export const Theme: Command = ({ args, snapshot }) => {
  const isModifying = args[0]?.toLowerCase() === 'set'
  const newPalette = args.at(1)?.toLowerCase()

  const currentPalette = useThemeStore((state) => state.palette)
  const setPalette = useThemeStore((state) => state.setPalette)

  useEffect(() => {
    if (isModifying && isPalette(newPalette)) {
      setPalette(newPalette)
    }
  }, [isModifying, newPalette, setPalette])

  if (!isModifying) {
    return (
      <p>
        {localize('terminal_current_theme', snapshot.locale)}:{' '}
        <strong>{localize(currentPalette, snapshot.locale)}</strong>
      </p>
    )
  }

  if (!isPalette(newPalette)) {
    return <p>{localize('terminal_invalid_theme', snapshot.locale)}</p>
  }

  return (
    <p>
      {localize(
        'terminal_theme_set',
        snapshot.locale,
        localize(newPalette, snapshot.locale),
      )}
    </p>
  )
}
