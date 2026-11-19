import localize from '@/lib/localize'
import type { TranslationKey } from '@/lib/localize'
import { useThemeStore } from '@/stores/theme.store'

export function useLocalize() {
  const language = useThemeStore((state) => state.locale)

  return (key: TranslationKey, ...variables: (string | number)[]) => {
    return localize(key, language, ...variables)
  }
}

export default useLocalize
