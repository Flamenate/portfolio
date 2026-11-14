import type { Command } from '@/lib/terminal-commands'
import { commandMetadata } from '@/lib/terminal-commands'
import localize from '@/utils/localize'

export const Help: Command = ({ args, snapshot }) => {
  const command = args[0]?.toLowerCase()
  if (!command) {
    const availableCommands = Object.keys(commandMetadata).sort().join(', ')
    return (
      <p>
        {localize('terminal_available_commands', snapshot.locale)}{' '}
        {availableCommands}
      </p>
    )
  }

  const commandMeta = commandMetadata[command as keyof typeof commandMetadata]

  // oxlint-disable-next-line typescript/no-unnecessary-condition
  if (!commandMeta) {
    return <p>{localize('terminal_no_help', snapshot.locale)}</p>
  }
  return (
    <p>
      {commandMeta.description}
      <br />
      {commandMeta.aliases &&
        localize(
          'terminal_aliases',
          snapshot.locale,
          commandMeta.aliases.join(', '),
        )}
      <br />
      {commandMeta.usage &&
        localize('terminal_usage', snapshot.locale, commandMeta.usage)}
    </p>
  )
}
