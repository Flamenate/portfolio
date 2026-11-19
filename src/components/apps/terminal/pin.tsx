import { useEffect } from 'react'
import type { Command } from '@/lib/terminal-commands'
import useAppStore from '@/stores/app.store'
import localize from '@/utils/localize'
import { parseAppLabel } from '../../../utils/app-label'

export const Pin: Command = ({ args, snapshot }) => {
  const appLabel = parseAppLabel(args[0])
  const pinApp = useAppStore((state) => state.pinApp)
  const pinned = useAppStore((state) =>
    appLabel ? state.apps[appLabel].pinned : false,
  )

  useEffect(() => {
    if (appLabel && !pinned) {
      pinApp(appLabel)
    }
  }, [pinned, pinApp, appLabel])

  if (!appLabel)
    return <p>{localize('terminal_invalid_app', snapshot.locale)}</p>
  if (pinned)
    return (
      <p>
        {localize('terminal_app_already_pinned', snapshot.locale, appLabel)}
      </p>
    )

  return <p>{localize('terminal_pinned_app', snapshot.locale, appLabel)}</p>
}
