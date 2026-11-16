import {
  AnimatePresence,
  Reorder,
  motion,
  useAnimate,
  useSpring,
} from 'motion/react'
import { useState } from 'react'
import { useShallow } from 'zustand/react/shallow'
import useLocalize from '@/hooks/useLocalize'
import { useAppStore } from '@/stores/app.store'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import ShortcutContextMenu from './menus/shortcut-context-menu'

export function TaskbarShortcut({
  appLabel,
  shortcutTrackRef,
}: {
  appLabel: string
  shortcutTrackRef: React.RefObject<HTMLDivElement | null>
}) {
  const {
    app,
    appState,
    focused,
    openApp,
    unminimizeApp,
    minimizeApp,
    focusApp,
  } = useAppStore(
    useShallow((state) => ({
      app: state.apps[appLabel],
      appState: state.apps[appLabel].state,
      focused: state.focusedAppLabel === appLabel,
      unminimizeApp: state.unminimizeApp,
      minimizeApp: state.minimizeApp,
      openApp: state.openApp,
      focusApp: state.focusApp,
    })),
  )

  const [scope, animate] = useAnimate()
  const [isBeingDragged, setIsBeingDragged] = useState(false)
  const handleAppTransition = async () => {
    if (isBeingDragged) return

    const animationState = appState
    switch (appState) {
      case 'closed':
        openApp(appLabel)
        break
      case 'minimized':
      case 'unminimizing':
        unminimizeApp(appLabel)
        break
      case 'open':
      case 'maximized':
        if (focused) minimizeApp(appLabel)
        else focusApp(appLabel)
        break
    }
    await animate(
      scope.current,
      {
        y:
          animationState === 'minimized' || animationState === 'closed'
            ? -5
            : 3,
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

  const localize = useLocalize()
  // whileDrag does not work well with Reorder.Item, so we use useSpring instead
  const scale = useSpring(1, { duration: 500 })
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <ShortcutContextMenu appLabel={appLabel}>
          <Reorder.Item
            value={appLabel}
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
            className="group relative box-border flex h-12.5 w-12 items-center justify-center rounded-sm hover-taskbar-effect p-2 transition-colors duration-150 select-none"
            onMouseUp={(event) => {
              if (event.button === 0) handleAppTransition()
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: isBeingDragged ? 1.25 : 1 }}
          >
            <img
              ref={scope}
              src={app.iconSrc}
              alt={app.label}
              width="32"
              height="32"
              className={`mt-0.5 h-full max-h-8 object-contain transition-[scale] ${isBeingDragged ? '' : 'group-active:scale-80'}`}
              draggable="false"
            />
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
                  className={`${appState === 'minimized' ? 'bg-muted-foreground' : 'bg-accent'} absolute bottom-0 left-1/2 h-0.75 w-4 -translate-x-1/2 rounded-full`}
                />
              )}
            </AnimatePresence>
          </Reorder.Item>
        </ShortcutContextMenu>
      </TooltipTrigger>
      <TooltipContent className="z-115">{localize(appLabel)}</TooltipContent>
    </Tooltip>
  )
}

export default TaskbarShortcut
