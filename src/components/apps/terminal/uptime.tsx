import { formatDuration } from 'date-fns'
import { useState } from 'react'
import { datefnsLocales } from '@/stores/theme.store'
import type { Command } from './index'

export const Uptime: Command = ({ snapshot }) => {
  const [uptime] = useState(() => performance.now())

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
        locale: datefnsLocales[snapshot.locale as keyof typeof datefnsLocales],
      })}
    </p>
  )
}
