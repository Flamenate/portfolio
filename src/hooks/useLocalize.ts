import { useThemeStore } from '@/stores/theme.store'
import localize from '@/utils/localize'

export function useLocalize() {
  const language = useThemeStore((state) => state.locale)

  return (str: string, ...variables: string[] | number[]) => {
    return localize(str, language, ...variables)
  }
}

export default useLocalize
