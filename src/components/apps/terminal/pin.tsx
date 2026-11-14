import { useEffect } from 'react'
import type { Command } from '@/lib/terminal-commands'
import useAppStore from '@/stores/app.store'
import localize from '@/utils/localize'

export const Pin: Command = ({ args, snapshot }) => {
  const appLabel = args[0]?.toLowerCase()
  const apps = useAppStore((state) => state.apps)
  const pinApp = useAppStore((state) => state.pinApp)
  const appToPin = apps[appLabel]

  useEffect(() => {
    // oxlint-disable-next-line typescript/no-unnecessary-condition
    if (appToPin && !appToPin.pinned) {
      pinApp(appLabel)
    }
  }, [appToPin, pinApp, appLabel])

  // oxlint-disable-next-line typescript/no-unnecessary-condition
  if (!appToPin)
    return <p>{localize('terminal_invalid_app', snapshot.locale)}</p>
  if (appToPin.pinned)
    return (
      <p>
        {localize('terminal_app_already_pinned', snapshot.locale, appLabel)}
      </p>
    )

  return <p>{localize('terminal_pinned_app', snapshot.locale, appLabel)}</p>
}
