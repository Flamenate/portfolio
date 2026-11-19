import { appCommand } from './app-command'

export const closeCommand = appCommand({
  isApplied: (state, label) => !state.openAppLabels.includes(label),
  apply: (state, label) => state.closeApp(label),
  messages: {
    alreadyApplied: 'terminal_app_not_open',
    applied: 'terminal_closed_app',
  },
  showExe: true,
})
