import { useEffect } from 'react'
import type { Command } from '@/lib/terminal-commands'
import useAppStore from '@/stores/app.store'
import localize from '@/utils/localize'

export const Close: Command = ({ args, snapshot }) => {
  const appLabel = args[0]?.toLowerCase().endsWith('.exe')
    ? args[0].slice(0, -4)
    : args[0]
  const apps = useAppStore((state) => state.apps)
  const closeApp = useAppStore((state) => state.closeApp)
  const openAppLabels = useAppStore((state) => state.openAppLabels)
  const app = apps[appLabel]

  useEffect(() => {
    // oxlint-disable-next-line typescript/no-unnecessary-condition
    if (app && openAppLabels.includes(appLabel)) {
      closeApp(appLabel)
    }
  }, [appLabel, closeApp, app, openAppLabels])

  // oxlint-disable-next-line typescript/no-unnecessary-condition
  if (!app) return <p>{localize('terminal_invalid_app', snapshot.locale)}</p>
  if (!openAppLabels.includes(appLabel))
    return <p>{localize('terminal_app_not_open', snapshot.locale, appLabel)}</p>

  return (
    <p>{localize('terminal_closed_app', snapshot.locale, `${appLabel}.exe`)}</p>
  )
}
