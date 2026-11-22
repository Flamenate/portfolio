import type { Command } from '@/lib/terminal-commands'
import { useLogStore } from '@/stores/log.store'

export const logsCommand: Command = ({ locale }) => {
  const logs = useLogStore.getState().actions
  return (
    <div>
      {logs.map((log) => (
        <div key={log.when.getTime()}>
          <span>{locale.since(log.when)}</span>:{' '}
          <span>{locale.text(`logs_${log.title}`, log.target ?? '')}</span>
        </div>
      ))}
    </div>
  )
}
