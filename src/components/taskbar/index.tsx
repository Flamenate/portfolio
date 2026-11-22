import { Reorder } from 'motion/react'
import { useMemo, useRef, useState } from 'react'
import type { AppLabel } from '@/lib/apps'
import { TASKBAR_HEIGHT } from '@/lib/constants'
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

  const [orderedAppLabels, setOrderedAppLabels] = useState<AppLabel[]>([])

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
    <footer
      style={{
        height: `calc(${TASKBAR_HEIGHT}px + env(safe-area-inset-bottom))`,
      }}
      className="z-110 grid w-full grid-cols-[1fr_minmax(0,auto)_1fr] items-center border-t border-white/15 bg-linear-to-r from-transparent via-black/25 to-transparent p-1.5 pr-[calc(0.375rem+env(safe-area-inset-right))] pb-[calc(0.375rem+env(safe-area-inset-bottom))] pl-[calc(0.375rem+env(safe-area-inset-left))] backdrop-blur-xl compact:flex"
    >
      <div className="col-start-2 flex h-full min-w-0 items-center compact:flex-1">
        <StartMenu />
        <div
          ref={shortcutTrackRef}
          className="min-w-0 compact:[scrollbar-width:none] compact:overflow-x-auto compact:overflow-y-hidden compact:[&::-webkit-scrollbar]:hidden"
        >
          <Reorder.Group
            as="ol"
            axis="x"
            values={orderedTaskbarAppLabels}
            onReorder={setOrderedAppLabels}
            className="flex h-full w-max gap-1"
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
      </div>
      <SystemTray />
    </footer>
  )
}

export default Taskbar
