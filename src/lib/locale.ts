import { format, formatDistanceToNow } from 'date-fns'
import { enUS, es, fr } from 'date-fns/locale'
import type { Period } from '@/data/personal'
import { defaultTheme } from '@/stores/theme.store'
import type { Locale } from '@/stores/theme.store'
import strings from '../locales.json'

export type TranslationKey = keyof typeof strings

type StripPrefix<
  Key,
  Prefix extends string,
> = Key extends `${Prefix}_${infer Suffix}` ? Suffix : never

export type TranslationSuffix<Prefix extends string> = StripPrefix<
  TranslationKey,
  Prefix
>

const dateFnsLocales = {
  eng: enUS,
  es,
  fr,
} as const

export type Localizer = ReturnType<typeof createLocale>

export function createLocale(code: Locale) {
  const dateFns = dateFnsLocales[code]

  const text = (key: TranslationKey, ...variables: (string | number)[]) => {
    const translations = strings[key]
    const template =
      translations[code] || translations[defaultTheme.locale] || key
    return template.replace(
      /{(\d+)}/g,
      (match, index: string) =>
        variables.at(Number(index))?.toString() ?? match,
    )
  }

  const date = (value: Date, pattern: string) =>
    format(value, pattern, { locale: dateFns })

  return {
    code,
    dateFns,
    text,
    date,
    since: (value: Date) =>
      formatDistanceToNow(value, { addSuffix: true, locale: dateFns }),
    period: ({ start, end }: Period) =>
      `${date(start, 'MMM yyyy')} - ${end ? date(end, 'MMM yyyy') : text('present')}`,
  }
}
