import { Reorder } from 'motion/react'
import { useMemo, useRef, useState } from 'react'
import type { AppRecord } from '@/models/application'
import useAppStore from '@/stores/app.store'
import { StartMenu } from './menus/start-menu'
import TaskbarShortcut from './shortcut'
import SystemTray from './system-tray'

export function Taskbar() {
  const shortcutTrackRef = useRef<HTMLDivElement | null>(null)

  const apps = useAppStore((state) => state.apps)
  const taskbarAppLabels = Object.values(apps)
    .filter((app) => app.pinned || app.state !== 'closed')
    .map((app) => app.label)

  const [orderedAppLabels, setOrderedAppLabels] = useState<
    AppRecord['label'][]
  >([])

  const orderedTaskbarAppLabels = useMemo(() => {
    const taskbarSet = new Set(taskbarAppLabels)
    const seen = new Set<string>()
    const orderedLabels = orderedAppLabels.filter((label) => {
      if (!taskbarSet.has(label) || seen.has(label)) return false
      seen.add(label)
      return true
    })
    const newLabels = taskbarAppLabels.filter((label) => {
      if (seen.has(label)) return false
      seen.add(label)
      return true
    })
    return [...orderedLabels, ...newLabels]
  }, [taskbarAppLabels, orderedAppLabels])

  return (
    <footer className="z-110 flex h-16 w-screen items-center justify-center border-t border-white/15 bg-linear-to-r from-transparent via-black/25 to-transparent p-1.5 backdrop-blur-xl">
      <StartMenu />
      <div ref={shortcutTrackRef} className="pr-10">
        <Reorder.Group
          as="ol"
          axis="x"
          values={orderedTaskbarAppLabels}
          onReorder={setOrderedAppLabels}
          className="flex h-full gap-1"
        >
          {orderedTaskbarAppLabels.map((appLabel) => (
            <TaskbarShortcut
              key={appLabel}
              appLabel={appLabel}
              shortcutTrackRef={shortcutTrackRef}
            />
          ))}
        </Reorder.Group>
      </div>
      <SystemTray />
    </footer>
  )
}

export default Taskbar
