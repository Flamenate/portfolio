import { useEffect } from 'react'
import type { Command } from '@/lib/terminal-commands'
import useAppStore from '@/stores/app.store'
import localize from '@/utils/localize'
import { parseAppLabel } from '../../../utils/app-label'

export const Unpin: Command = ({ args, snapshot }) => {
  const appLabel = parseAppLabel(args[0])
  const unpinApp = useAppStore((state) => state.unpinApp)
  const pinned = useAppStore((state) =>
    appLabel ? state.apps[appLabel].pinned : false,
  )

  useEffect(() => {
    if (appLabel && pinned) {
      unpinApp(appLabel)
    }
  }, [pinned, unpinApp, appLabel])

  if (!appLabel)
    return <p>{localize('terminal_invalid_app', snapshot.locale)}</p>
  if (!pinned)
    return (
      <p>{localize('terminal_app_not_pinned', snapshot.locale, appLabel)}</p>
    )

  return <p>{localize('terminal_unpinned_app', snapshot.locale, appLabel)}</p>
}
