import { useEffect } from 'react'
import type { Command } from '@/lib/terminal-commands'
import useThemeStore from '@/stores/theme.store'
import localize from '@/utils/localize'

const validPalettes = ['light', 'dark', 'system']
export const Theme: Command = ({ args, snapshot }) => {
  const isModifying = args[0]?.toLowerCase() === 'set'
  const newPalette = args[1]?.toLowerCase()

  const currentPalette = useThemeStore((state) => state.palette)
  const setPalette = useThemeStore((state) => state.setPalette)

  useEffect(() => {
    if (isModifying && newPalette && validPalettes.includes(newPalette)) {
      setPalette(newPalette as 'light' | 'dark' | 'system')
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

  if (!newPalette || !validPalettes.includes(newPalette)) {
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
