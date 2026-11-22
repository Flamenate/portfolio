import { formatDuration } from 'date-fns'
import type { Command } from '@/lib/terminal-commands'

export const uptimeCommand: Command = ({ locale }) => {
  const uptime = performance.now()

  const hours = Math.floor(uptime / (1000 * 60 * 60))
  const minutes = Math.floor((uptime % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((uptime % (1000 * 60)) / 1000)
  const duration = {
    seconds,
    minutes,
    hours,
  }

  return (
    <p>
      {formatDuration(duration, {
        locale: locale.dateFns,
      })}
    </p>
  )
}
