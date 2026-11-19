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

function isTranslationKey(text: string): text is TranslationKey {
  return Object.hasOwn(strings, text)
}

export default function localize(
  key: TranslationKey,
  language: Locale = defaultTheme.locale,
  ...variables: (string | number)[]
) {
  const translations = strings[key]
  const text =
    translations[language] || translations[defaultTheme.locale] || key
  return text.replace(
    /{(\d+)}/g,
    (match, index: string) => variables.at(Number(index))?.toString() ?? match,
  )
}

export function localizeOrKeep(
  str: string,
  language: Locale = defaultTheme.locale,
  ...variables: (string | number)[]
) {
  return isTranslationKey(str) ? localize(str, language, ...variables) : str
}
