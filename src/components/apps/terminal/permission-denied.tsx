import type { Command } from '@/lib/terminal-commands'

export const permissionDeniedCommand: Command = ({ locale }) => (
  <p>{locale.text('terminal_permission_denied')}</p>
)
