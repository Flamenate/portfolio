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
import { appDefinitions } from '@/lib/apps'
import { desktopFolderPaths, pathKey } from '@/lib/directories'
import useAppStore from '@/stores/app.store'
import { useDesktopSelectionStore } from '@/stores/desktop-selection.store'

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

  const { apps, openAppLabels } = useAppStore(
    useShallow((state) => ({
      apps: state.apps,
      openAppLabels: state.openAppLabels,
    })),
  )
  const openApps = openAppLabels
    .map((label) => apps[label])
    .filter((app) => app.state !== 'closed')

  const desktopShortcutContainer = useRef<HTMLDivElement | null>(null)
  const { clear, openSelected } = useDesktopSelectionStore.getState()

  const handleMultipleAppOpen = (e: React.KeyboardEvent) => {
    if (e.key !== 'Enter') return
    if (useDesktopSelectionStore.getState().selected.length === 0) return
    e.preventDefault()
    openSelected()
  }
  return (
    // react-doctor-disable-next-line react-doctor/no-noninteractive-element-interactions
    <main
      className="flex h-screen flex-col"
      onClick={clear}
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
