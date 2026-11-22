import type { Command } from '@/lib/terminal-commands'
import { commandNames, findCommand } from '@/lib/terminal-commands'

export const helpCommand: Command = ({ args, locale }) => {
  const command = args[0]?.toLowerCase()
  if (!command) {
    return (
      <p>
        {locale.text('terminal_available_commands')} {commandNames.join(', ')}
      </p>
    )
  }

  const commandMeta = findCommand(command)
  if (!commandMeta) {
    return <p>{locale.text('terminal_no_help')}</p>
  }
  return (
    <p>
      {locale.text(commandMeta.description)}
      <br />
      {commandMeta.aliases &&
        locale.text('terminal_aliases', commandMeta.aliases.join(', '))}
      <br />
      {commandMeta.usage && locale.text('terminal_usage', commandMeta.usage)}
    </p>
  )
}
