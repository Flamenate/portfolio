import { createFileRoute, redirect } from '@tanstack/react-router'
import { AnimatePresence } from 'motion/react'
import { Activity, Suspense, useEffect, useRef } from 'react'
import { useShallow } from 'zustand/react/shallow'
import {
  AppShortcut,
  FileShortcut,
  FolderShortcut,
} from '@/components/desktop/shortcut'
import Taskbar from '@/components/taskbar'
import { Toaster } from '@/components/ui/sonner'
import { AppWindow } from '@/components/ui/window'
import { WindowLoading } from '@/components/ui/window-loading'
import { appDefinitions } from '@/lib/apps'
import { TASKBAR_HEIGHT } from '@/lib/constants'
import {
  desktopFiles,
  desktopFolderPaths,
  fileId,
  pathKey,
} from '@/lib/directories'
import { isSignedIn } from '@/lib/sign-in'
import useAppStore from '@/stores/app.store'
import { useDesktopSelectionStore } from '@/stores/desktop-selection.store'

export const Route = createFileRoute('/home')({
  validateSearch: (search: Record<string, unknown>): { browse?: string } =>
    typeof search.browse === 'string' ? { browse: search.browse } : {},
  beforeLoad: ({ search }) => {
    // Tabs redirected from the Browser app come from a visitor already inside.
    if (!search.browse && !isSignedIn()) throw redirect({ to: '/' })
  },
  component: Home,
})

function Home() {
  const { browse } = Route.useSearch()
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
  const { clear, openSelected } = useDesktopSelectionStore(
    useShallow((state) => ({
      clear: state.clear,
      openSelected: state.openSelected,
    })),
  )

  const handleMultipleAppOpen = (e: React.KeyboardEvent) => {
    if (e.key !== 'Enter') return
    if (useDesktopSelectionStore.getState().selected.length === 0) return
    e.preventDefault()
    openSelected()
  }
  return (
    // react-doctor-disable-next-line react-doctor/no-noninteractive-element-interactions
    <main
      className="flex h-dvh flex-col"
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
      <Toaster
        offset={{ bottom: 80, right: 10 }}
        mobileOffset={{
          bottom: `calc(${TASKBAR_HEIGHT + 8}px + env(safe-area-inset-bottom))`,
        }}
        position="bottom-right"
      />
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
        className="grid min-h-0 grow auto-cols-[minmax(100px,1fr)] grid-flow-col grid-cols-[repeat(auto-fill,minmax(100px,1fr))] grid-rows-[repeat(auto-fill,minmax(80px,1fr))] gap-5 overflow-x-auto overflow-y-hidden p-2 pr-[calc(0.5rem+env(safe-area-inset-right))] pl-[calc(0.5rem+env(safe-area-inset-left))] compact:grid-rows-[repeat(auto-fill,minmax(100px,1fr))]"
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
        {desktopFiles.map((file) => (
          <FileShortcut
            key={fileId(file)}
            file={file}
            containerRef={desktopShortcutContainer}
          />
        ))}
      </div>

      <Taskbar />
    </main>
  )
}
