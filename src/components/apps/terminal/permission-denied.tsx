import localize from '@/lib/localize'
import type { Command } from '@/lib/terminal-commands'

export const permissionDeniedCommand: Command = ({ locale }) => (
  <p>{localize('terminal_permission_denied', locale)}</p>
)
