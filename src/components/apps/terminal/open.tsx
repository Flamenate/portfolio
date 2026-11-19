import { appCommand } from './app-command'

export const openCommand = appCommand({
  isApplied: (state, label) => state.openAppLabels.includes(label),
  apply: (state, label) => state.openApp(label),
  messages: {
    alreadyApplied: 'terminal_app_already_opened',
    applied: 'terminal_launched_app',
  },
  showExe: true,
})
