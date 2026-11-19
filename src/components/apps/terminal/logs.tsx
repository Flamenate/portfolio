import { formatDistanceToNow } from 'date-fns'
import type { Command } from '@/lib/terminal-commands'
import { useLogStore } from '@/stores/log.store'
import { datefnsLocales } from '@/stores/theme.store'
import localize from '@/utils/localize'

export const Logs: Command = ({ snapshot }) => {
  const logs = useLogStore((state) => state.actions)
  return (
    <div>
      {logs.map((log) => (
        <div key={log.when.getTime()}>
          <span>
            {formatDistanceToNow(log.when, {
              addSuffix: true,
              locale: datefnsLocales[snapshot.locale],
            })}
          </span>
          :{' '}
          <span>
            {localize(`logs_${log.title}`, snapshot.locale, log.target ?? '')}
          </span>
        </div>
      ))}
    </div>
  )
}
