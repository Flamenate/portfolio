import { useEffect } from 'react'
import type { Command } from '@/lib/terminal-commands'
import useAppStore from '@/stores/app.store'

export const Exit: Command = () => {
  const closeApp = useAppStore((state) => state.closeApp)
  useEffect(() => {
    const timeout = setTimeout(() => {
      closeApp('terminal')
    }, 1000)
    return () => clearTimeout(timeout)
  }, [closeApp])
  return <p>Exiting terminal...</p>
}
