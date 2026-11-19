import { appCommand } from './app-command'

export const openCommand = appCommand({
  // A minimized App is not "already open": opening restores it.
  isApplied: (state, label) =>
    state.apps[label].state === 'open' ||
    state.apps[label].state === 'maximized',
  apply: (state, label) => state.openApp(label),
  messages: {
    alreadyApplied: 'terminal_app_already_opened',
    applied: 'terminal_launched_app',
  },
  showExe: true,
})
