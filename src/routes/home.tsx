import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { AnimatePresence } from 'motion/react'
import { Activity, Suspense, useEffect, useRef } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { AppShortcut, FolderShortcut } from '@/components/desktop/shortcut'
import Taskbar from '@/components/taskbar'
import { Toaster } from '@/components/ui/sonner'
import { AppWindow } from '@/components/ui/window'
import { WindowLoading } from '@/components/ui/window-loading'
import useLocalStorage from '@/hooks/useLocalStorage'
import { appDefinitions, isAppLabel } from '@/lib/apps'
import { desktopFolderPaths, pathKey } from '@/lib/directories'
import useAppStore from '@/stores/app.store'
import useExplorerStore from '@/stores/explorer.store'

export const Route = createFileRoute('/home')({
  validateSearch: (search: Record<string, unknown>): { browse?: string } =>
    typeof search.browse === 'string' ? { browse: search.browse } : {},
  component: Home,
})

function Home() {
  const [isFirstVisit] = useLocalStorage('isFirstVisit', true)
  const navigate = useNavigate()
  const { browse } = Route.useSearch()
  useEffect(() => {
    // Tabs redirected from the Browser app come from a visitor already inside.
    if (isFirstVisit && !browse) {
      navigate({ to: '/' })
    }
  }, [isFirstVisit, browse, navigate])

  useEffect(() => {
    if (browse) useAppStore.getState().openApp('browser')
  }, [browse])

  const { apps, openAppLabels, clearSelectedShortcuts, selectedShortcutIds } =
    useAppStore(
      useShallow((state) => ({
        apps: state.apps,
        openAppLabels: state.openAppLabels,
        clearSelectedShortcuts: state.clearSelectedShortcuts,
        selectedShortcutIds: state.selectedShortcutIds,
      })),
    )
  const openApps = openAppLabels
    .map((label) => apps[label])
    .filter((app) => app.state !== 'closed')

  const desktopShortcutContainer = useRef<HTMLDivElement | null>(null)

  const handleMultipleAppOpen = (e: React.KeyboardEvent) => {
    if (e.key !== 'Enter' || selectedShortcutIds.length === 0) return
    e.preventDefault()
    for (const id of selectedShortcutIds) {
      const folderPath = desktopFolderPaths.find((path) => pathKey(path) === id)
      if (folderPath) useExplorerStore.getState().openFolder(folderPath)
      else if (isAppLabel(id)) useAppStore.getState().openApp(id)
    }
    clearSelectedShortcuts()
  }
  return (
    // react-doctor-disable-next-line react-doctor/no-noninteractive-element-interactions
    <main
      className="flex h-screen flex-col"
      onClick={clearSelectedShortcuts}
      onKeyUp={handleMultipleAppOpen}
      onKeyDown={(e) => {
        const { target, key } = e
        if (
          key !== 'Enter' ||
          target instanceof HTMLInputElement ||
          target instanceof HTMLTextAreaElement
        )
          return
        e.preventDefault()
      }}
    >
      <Toaster offset={{ bottom: 80, right: 10 }} position="bottom-right" />
      <AnimatePresence>
        {openApps.map((app) => {
          const Content = appDefinitions[app.label].content
          return (
            <Activity
              key={app.label}
              mode={app.state === 'minimized' ? 'hidden' : 'visible'}
            >
              <AppWindow appLabel={app.label}>
                <Suspense fallback={<WindowLoading />}>
                  <Content />
                </Suspense>
              </AppWindow>
            </Activity>
          )
        })}
      </AnimatePresence>
      <div
        ref={desktopShortcutContainer}
        className="grid grow grid-flow-col grid-cols-[repeat(auto-fill,minmax(100px,1fr))] grid-rows-[repeat(auto-fill,minmax(80px,1fr))] gap-5 p-2"
      >
        {Object.values(apps).map((app) => (
          <AppShortcut
            key={app.label}
            appLabel={app.label}
            containerRef={desktopShortcutContainer}
          />
        ))}
        {desktopFolderPaths.map((path) => (
          <FolderShortcut
            key={pathKey(path)}
            path={path}
            containerRef={desktopShortcutContainer}
          />
        ))}
      </div>

      <Taskbar />
    </main>
  )
}
