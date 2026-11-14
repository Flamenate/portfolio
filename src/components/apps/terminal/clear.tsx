import { useEffect } from 'react'
import type { Command } from '@/lib/terminal-commands'

export const Clear: Command = ({ clearHistory }) => {
  useEffect(clearHistory, [clearHistory])
  return ''
}
