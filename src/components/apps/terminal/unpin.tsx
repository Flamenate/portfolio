import { appCommand } from './app-command'

export const unpinCommand = appCommand({
  isApplied: (state, label) => !state.apps[label].pinned,
  apply: (state, label) => state.unpinApp(label),
  messages: {
    alreadyApplied: 'terminal_app_not_pinned',
    applied: 'terminal_unpinned_app',
  },
})
