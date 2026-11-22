import { useMemo } from 'react'
import { createLocale } from '@/lib/locale'
import { useThemeStore } from '@/stores/theme.store'

export function useLocale() {
  const code = useThemeStore((state) => state.locale)
  return useMemo(() => createLocale(code), [code])
}

export default useLocale
