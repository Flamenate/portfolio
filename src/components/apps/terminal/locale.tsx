import { useEffect } from 'react'
import type { Command } from '@/lib/terminal-commands'
import useThemeStore, { locales } from '@/stores/theme.store'
import type { Locale as LocaleCode } from '@/stores/theme.store'
import localize from '@/utils/localize'

function isLocale(value: string | undefined): value is LocaleCode {
  return value !== undefined && Object.hasOwn(locales, value)
}

export const Locale: Command = ({ args, snapshot }) => {
  const isModifying = args[0]?.toLowerCase() === 'set'
  const newLocale = args.at(1)?.toLowerCase()
  useEffect(() => {
    if (isModifying && isLocale(newLocale)) {
      useThemeStore.getState().setLocale(newLocale)
    }
  }, [isModifying, newLocale])

  if (!isModifying) {
    return (
      <p>
        {localize('terminal_current_locale', snapshot.locale)}:{' '}
        <strong>{locales[snapshot.locale]}</strong>
      </p>
    )
  }

  if (!isLocale(newLocale)) {
    return <p>{localize('terminal_invalid_locale', snapshot.locale)}</p>
  }
  return <p>{localize('terminal_locale_set', newLocale, locales[newLocale])}</p>
}
