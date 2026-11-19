import { useThemeStore } from '@/stores/theme.store'
import localize from '@/utils/localize'
import type { TranslationKey } from '@/utils/localize'

export function useLocalize() {
  const language = useThemeStore((state) => state.locale)

  return (key: TranslationKey, ...variables: (string | number)[]) => {
    return localize(key, language, ...variables)
  }
}

export default useLocalize
