import localize from '@/lib/localize'
import type { Command } from '@/lib/terminal-commands'
import { commandNames, findCommand } from '@/lib/terminal-commands'

export const helpCommand: Command = ({ args, locale }) => {
  const command = args[0]?.toLowerCase()
  if (!command) {
    return (
      <p>
        {localize('terminal_available_commands', locale)}{' '}
        {commandNames.join(', ')}
      </p>
    )
  }

  const commandMeta = findCommand(command)
  if (!commandMeta) {
    return <p>{localize('terminal_no_help', locale)}</p>
  }
  return (
    <p>
      {localize(commandMeta.description, locale)}
      <br />
      {commandMeta.aliases &&
        localize('terminal_aliases', locale, commandMeta.aliases.join(', '))}
      <br />
      {commandMeta.usage &&
        localize('terminal_usage', locale, commandMeta.usage)}
    </p>
  )
}
