import { useEffect } from 'react'
import type { Command } from '@/lib/terminal-commands'
import useThemeStore, { locales } from '@/stores/theme.store'
import localize from '@/utils/localize'

export const Locale: Command = ({ args, snapshot }) => {
  const isModifying = args[0]?.toLowerCase() === 'set'
  const newLocale = args[1]?.toLowerCase()
  useEffect(() => {
    if (isModifying && newLocale && Object.keys(locales).includes(newLocale)) {
      useThemeStore.getState().setLocale(newLocale as keyof typeof locales)
    }
  }, [isModifying, newLocale])

  if (!isModifying) {
    return (
      <p>
        {localize('terminal_current_locale', snapshot.locale)}:{' '}
        <strong>{locales[snapshot.locale as keyof typeof locales]}</strong>
      </p>
    )
  }

  if (!newLocale || !Object.keys(locales).includes(newLocale)) {
    return <p>{localize('terminal_invalid_locale', snapshot.locale)}</p>
  }
  return (
    <p>
      {localize(
        'terminal_locale_set',
        newLocale,
        locales[newLocale as keyof typeof locales],
      )}
    </p>
  )
}
