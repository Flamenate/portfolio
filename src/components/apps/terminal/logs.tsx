import { formatDistanceToNow } from 'date-fns'
import localize from '@/lib/localize'
import type { Command } from '@/lib/terminal-commands'
import { useLogStore } from '@/stores/log.store'
import { datefnsLocales } from '@/stores/theme.store'

export const logsCommand: Command = ({ locale }) => {
  const logs = useLogStore.getState().actions
  return (
    <div>
      {logs.map((log) => (
        <div key={log.when.getTime()}>
          <span>
            {formatDistanceToNow(log.when, {
              addSuffix: true,
              locale: datefnsLocales[locale],
            })}
          </span>
          :{' '}
          <span>{localize(`logs_${log.title}`, locale, log.target ?? '')}</span>
        </div>
      ))}
    </div>
  )
}
