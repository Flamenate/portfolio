import {
  AnimatePresence,
  Reorder,
  motion,
  useAnimate,
  useDragControls,
  useSpring,
} from 'motion/react'
import { useState } from 'react'
import { useShallow } from 'zustand/react/shallow'
import useLocale from '@/hooks/useLocale'
import type { AppLabel } from '@/lib/apps'
import { TASKBAR_HEIGHT } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { useAppStore } from '@/stores/app.store'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import ShortcutContextMenu from './menus/shortcut-context-menu'

export function TaskbarShortcut({
  appLabel,
  shortcutTrackRef,
}: {
  appLabel: AppLabel
  shortcutTrackRef: React.RefObject<HTMLDivElement | null>
}) {
  const { app, appState, activateApp } = useAppStore(
    useShallow((state) => ({
      app: state.apps[appLabel],
      appState: state.apps[appLabel].state,
      activateApp: state.activateApp,
    })),
  )

  const [scope, animate] = useAnimate()
  const dragControls = useDragControls()
  const [isBeingDragged, setIsBeingDragged] = useState(false)
  const handleAppTransition = async () => {
    if (isBeingDragged) return

    const activation = activateApp(appLabel)
    await animate(
      scope.current,
      {
        y: activation === 'opened' || activation === 'restored' ? -5 : 3,
      },
      {
        type: 'spring',
        stiffness: 800,
        damping: 30,
      },
    )
    await animate(
      scope.current,
      {
        y: 0,
      },
      {
        type: 'spring',
        stiffness: 350,
        damping: 12,
      },
    )
  }

  const locale = useLocale()
  // whileDrag does not work well with Reorder.Item, so we use useSpring instead
  const scale = useSpring(1, { duration: 500 })
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <ShortcutContextMenu appLabel={appLabel}>
          <Reorder.Item
            value={appLabel}
            // Touch input never reorders, so the compact taskbar can scroll.
            dragListener={false}
            dragControls={dragControls}
            onPointerDown={(event) => {
              if (event.pointerType !== 'touch') dragControls.start(event)
            }}
            dragConstraints={shortcutTrackRef}
            dragElastic={0.005}
            onDragStart={() => {
              setIsBeingDragged(true)
              scale.set(1.25)
            }}
            onDragEnd={() => {
              setIsBeingDragged(false)
              scale.set(1)
            }}
            key={app.iconSrc}
            className="group relative box-border flex h-12.5 w-12 items-center justify-center rounded-sm hover-taskbar-effect py-2 transition-colors duration-150 select-none"
            onMouseUp={(event) => {
              if (event.button === 0) handleAppTransition()
            }}
            // Growing/shrinking the real width (and cancelling the list's gap) lets neighbours,
            // the Start button and the centred taskbar reflow smoothly on enter/exit.
            initial={{ width: 0, marginLeft: -4 }}
            animate={{
              scale: isBeingDragged ? 1.25 : 1,
              width: 48,
              marginLeft: 0,
            }}
            exit={{
              width: 0,
              marginLeft: -4,
              // Close the slot once the icon has mostly dropped out of view.
              transition: {
                type: 'spring',
                bounce: 0,
                duration: 0.3,
                delay: 0.15,
              },
            }}
            transition={{
              width: { type: 'spring', bounce: 0, duration: 0.35 },
              marginLeft: { type: 'spring', bounce: 0, duration: 0.35 },
            }}
          >
            {/* Reorder.Item owns its own `y` for dragging, so the icon rises/drops in a wrapper. */}
            <motion.div
              className="flex h-full items-center justify-center"
              initial={{ y: TASKBAR_HEIGHT }}
              animate={{
                y: 0,
                transition: { type: 'spring', bounce: 0.25, duration: 0.5 },
              }}
              exit={{
                y: TASKBAR_HEIGHT,
                transition: { ease: 'easeIn', duration: 0.2 },
              }}
            >
              <img
                ref={scope}
                src={app.iconSrc}
                alt={app.label}
                width="32"
                height="32"
                className={cn(
                  'mt-0.5 h-full max-h-8 object-contain transition-[scale]',
                  !isBeingDragged && 'group-active:scale-80',
                )}
                draggable="false"
              />
            </motion.div>
            <AnimatePresence>
              {appState !== 'closed' && (
                <motion.div
                  key="underline"
                  initial={{
                    scaleX: 0,
                  }}
                  animate={{
                    scaleX: appState === 'minimized' ? 0.5 : 1,
                  }}
                  exit={{ scaleX: 0 }}
                  className={cn(
                    'absolute bottom-0 left-1/2 h-0.75 w-4 -translate-x-1/2 rounded-full',
                    appState === 'minimized'
                      ? 'bg-muted-foreground'
                      : 'bg-accent',
                  )}
                />
              )}
            </AnimatePresence>
          </Reorder.Item>
        </ShortcutContextMenu>
      </TooltipTrigger>
      <TooltipContent className="z-115">{locale.text(appLabel)}</TooltipContent>
    </Tooltip>
  )
}

export default TaskbarShortcut
