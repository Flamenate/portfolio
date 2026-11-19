import type { Command } from '@/lib/terminal-commands'

export const clearCommand: Command = ({ clearHistory }) => {
  clearHistory()
  return null
}
