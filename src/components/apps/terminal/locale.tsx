import { createLocale } from '@/lib/locale'
import type { Command } from '@/lib/terminal-commands'
import useThemeStore, { locales } from '@/stores/theme.store'
import type { Locale } from '@/stores/theme.store'

function isLocale(value: string | undefined): value is Locale {
  return value !== undefined && Object.hasOwn(locales, value)
}

export const localeCommand: Command = ({ args, locale }) => {
  const isModifying = args[0]?.toLowerCase() === 'set'
  const newLocale = args.at(1)?.toLowerCase()

  if (!isModifying) {
    return (
      <p>
        {locale.text('terminal_current_locale')}:{' '}
        <strong>{locales[locale.code]}</strong>
      </p>
    )
  }

  if (!isLocale(newLocale)) {
    return <p>{locale.text('terminal_invalid_locale')}</p>
  }

  useThemeStore.getState().setLocale(newLocale)
  return (
    <p>
      {createLocale(newLocale).text('terminal_locale_set', locales[newLocale])}
    </p>
  )
}
