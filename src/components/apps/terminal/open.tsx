import { useEffect } from 'react'
import type { Command } from '@/lib/terminal-commands'
import useAppStore from '@/stores/app.store'
import localize from '@/utils/localize'
import { parseAppLabel } from '../../../utils/app-label'

export const Open: Command = ({ args, snapshot }) => {
  const appLabel = parseAppLabel(args[0])
  const openApp = useAppStore((state) => state.openApp)
  const isOpen = useAppStore((state) =>
    appLabel ? state.openAppLabels.includes(appLabel) : false,
  )

  useEffect(() => {
    if (appLabel && !isOpen) {
      openApp(appLabel)
    }
  }, [openApp, appLabel, isOpen])

  if (!appLabel)
    return <p>{localize('terminal_invalid_app', snapshot.locale)}</p>
  if (isOpen)
    return (
      <p>
        {localize('terminal_app_already_opened', snapshot.locale, appLabel)}
      </p>
    )

  return (
    <p>
      {localize('terminal_launched_app', snapshot.locale, `${appLabel}.exe`)}
    </p>
  )
}
