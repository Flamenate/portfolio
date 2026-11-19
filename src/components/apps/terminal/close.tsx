import { useEffect } from 'react'
import type { Command } from '@/lib/terminal-commands'
import useAppStore from '@/stores/app.store'
import localize from '@/utils/localize'
import { parseAppLabel } from '../../../utils/app-label'

export const Close: Command = ({ args, snapshot }) => {
  const appLabel = parseAppLabel(args[0])
  const closeApp = useAppStore((state) => state.closeApp)
  const isOpen = useAppStore((state) =>
    appLabel ? state.openAppLabels.includes(appLabel) : false,
  )

  useEffect(() => {
    if (appLabel && isOpen) {
      closeApp(appLabel)
    }
  }, [appLabel, closeApp, isOpen])

  if (!appLabel)
    return <p>{localize('terminal_invalid_app', snapshot.locale)}</p>
  if (!isOpen)
    return <p>{localize('terminal_app_not_open', snapshot.locale, appLabel)}</p>

  return (
    <p>{localize('terminal_closed_app', snapshot.locale, `${appLabel}.exe`)}</p>
  )
}
