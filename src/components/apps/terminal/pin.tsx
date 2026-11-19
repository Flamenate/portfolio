import { appCommand } from './app-command'

export const pinCommand = appCommand({
  isApplied: (state, label) => state.apps[label].pinned,
  apply: (state, label) => state.pinApp(label),
  messages: {
    alreadyApplied: 'terminal_app_already_pinned',
    applied: 'terminal_pinned_app',
  },
})
