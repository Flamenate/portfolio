import { defaultTheme } from '@/stores/theme.store'
import strings from '../locales.json'

function format(str: string, ...variables: string[] | number[]) {
  return str.replace(/{(\d)}/g, (match: string, index: number) => {
    return variables[index].toString() || match
  })
}

export default function localize(
  str: string,
  language: string = defaultTheme.locale,
  ...variables: string[] | number[]
) {
  let localized: string
  // (str in strings) is slower than direct access, hence
  // oxlint-disable-next-line typescript/no-unnecessary-condition
  if (!strings[str as keyof typeof strings]) {
    localized = `localize_${str}`
  } else {
    const translations = strings[str as keyof typeof strings]
    localized =
      translations[language as keyof typeof translations] ||
      translations[defaultTheme.locale] ||
      str
  }
  localized = format(localized, ...variables)
  return localized
}

export function localizeOrKeep(
  str: string,
  language: string = defaultTheme.locale,
  ...variables: string[] | number[]
) {
  // oxlint-disable-next-line typescript/no-unnecessary-condition
  if (!strings[str as keyof typeof strings]) return str
  return localize(str, language, ...variables)
}
