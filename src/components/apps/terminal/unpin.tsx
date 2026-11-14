import { useEffect } from 'react'
import type { Command } from '@/lib/terminal-commands'
import useAppStore from '@/stores/app.store'
import localize from '@/utils/localize'

export const Unpin: Command = ({ args, snapshot }) => {
  const appLabel = args[0]?.toLowerCase()
  const apps = useAppStore((state) => state.apps)
  const unpinApp = useAppStore((state) => state.unpinApp)
  const appToUnpin = apps[appLabel]

  useEffect(() => {
    // oxlint-disable-next-line typescript/no-unnecessary-condition
    if (appToUnpin && appToUnpin.pinned) {
      unpinApp(appLabel)
    }
  }, [appToUnpin, unpinApp, appLabel])

  // oxlint-disable-next-line typescript/no-unnecessary-condition
  if (!appToUnpin)
    return <p>{localize('terminal_invalid_app', snapshot.locale)}</p>
  if (!appToUnpin.pinned)
    return (
      <p>{localize('terminal_app_not_pinned', snapshot.locale, appLabel)}</p>
    )

  return <p>{localize('terminal_unpinned_app', snapshot.locale, appLabel)}</p>
}
