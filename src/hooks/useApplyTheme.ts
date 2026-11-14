import { useLayoutEffect } from 'react'
import useThemeStore from '@/stores/theme.store'

export function useApplyTheme() {
  const palette = useThemeStore((state) => state.palette)

  useLayoutEffect(() => {
    const query = window.matchMedia('(prefers-color-scheme: dark)')
    const apply = () => {
      const dark = palette === 'dark' || (palette === 'system' && query.matches)
      document.documentElement.classList.toggle('dark', dark)
    }
    apply()
    query.addEventListener('change', apply)
    return () => query.removeEventListener('change', apply)
  }, [palette])
}
