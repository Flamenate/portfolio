import type { Command } from '@/lib/terminal-commands'
import useAppStore from '@/stores/app.store'

export const exitCommand: Command = () => {
  setTimeout(() => {
    useAppStore.getState().closeApp('terminal')
  }, 1000)
  return <p>Exiting terminal...</p>
}
