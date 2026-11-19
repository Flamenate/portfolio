import { DismissRegular } from '@fluentui/react-icons/headless/svg/dismiss'
import { MaximizeRegular } from '@fluentui/react-icons/headless/svg/maximize'
import { SquareMultipleRegular } from '@fluentui/react-icons/headless/svg/square-multiple'
import { SubtractRegular } from '@fluentui/react-icons/headless/svg/subtract'
import { animate, motion, useDragControls, useMotionValue } from 'motion/react'
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import type { PointerEvent } from 'react'
import { useShallow } from 'zustand/react/shallow'
import useLocalize from '@/hooks/useLocalize'
import { useResizable } from '@/hooks/useResizable'
import type { ResizeDirection } from '@/hooks/useResizable'
import type { AppLabel } from '@/lib/apps'
import {
  MINIMUM_WINDOW_SIZE,
  RESTORE_ORIGIN_GAP,
  TASKBAR_HEIGHT,
} from '@/lib/constants'
import { localizeOrKeep } from '@/lib/localize'
import { cn } from '@/lib/utils'
import { useAppStore } from '@/stores/app.store'
import { useThemeStore } from '@/stores/theme.store'
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip'

function WindowButton(props: React.ComponentProps<'button'>) {
  return (
    <button
      type="button"
      {...props}
      className={cn(
        'flex h-full cursor-pointer items-center justify-center px-2 @md:px-3',
        props.className,
      )}
      onPointerDown={(event) => {
        event.stopPropagation()
        props.onPointerDown?.(event)
      }}
    >
      {props.children}
    </button>
  )
}

const edgeClass =
  'absolute z-998 bg-transparent select-none before:absolute before:top-1/2 before:left-1/2 before:z-999 before:block before:-translate-1/2 before:content-[""]'

function ResizeHandles({
  onResize,
}: {
  onResize: (direction: ResizeDirection, event: PointerEvent) => void
}) {
  const start = (direction: ResizeDirection) => (event: PointerEvent) => {
    event.stopPropagation()
    onResize(direction, event)
  }
  return (
    <>
      <div
        className={cn(edgeClass, 'top-0 -right-2 h-full w-2 cursor-e-resize')}
        onPointerDown={start('east')}
      />
      <div
        className={cn(edgeClass, 'top-0 -left-2 h-full w-2 cursor-w-resize')}
        onPointerDown={start('west')}
      />
      <div
        className={cn(edgeClass, '-bottom-2 left-0 h-2 w-full cursor-s-resize')}
        onPointerDown={start('south')}
      />
      <div
        className={cn(edgeClass, '-top-2 left-0 h-2 w-full cursor-n-resize')}
        onPointerDown={start('north')}
      />
      <div
        className="absolute -top-3 -right-3 z-999 size-3 cursor-ne-resize"
        onPointerDown={start('northeast')}
      />
      <div
        className="absolute -top-3 -left-3 z-999 size-3 cursor-nw-resize"
        onPointerDown={start('northwest')}
      />
      <div
        className="absolute -right-3 -bottom-3 z-999 size-3 cursor-se-resize"
        onPointerDown={start('southeast')}
      />
      <div
        className="absolute -bottom-3 -left-3 z-999 size-3 cursor-sw-resize"
        onPointerDown={start('southwest')}
      />
    </>
  )
}

export function AppWindow({
  children,
  appLabel,
}: {
  children: React.ReactNode
  appLabel: AppLabel
}) {
  const localize = useLocalize()
  const language = useThemeStore((state) => state.locale)
  const windowRef = useRef<HTMLDivElement>(null)
  const gesturing = useRef(false)
  const [isCompact, setIsCompact] = useState(false)
  const [dragConstraints, setDragConstraints] = useState({
    right: 0,
    bottom: 0,
  })

  const {
    app,
    toggleMaximizeApp,
    closeApp,
    minimizeApp,
    focusApp,
    focusedAppLabel,
    updateAppCoordinates,
  } = useAppStore(
    useShallow((state) => ({
      app: state.apps[appLabel],
      toggleMaximizeApp: state.toggleMaximizeApp,
      closeApp: state.closeApp,
      minimizeApp: state.minimizeApp,
      focusApp: state.focusApp,
      focusedAppLabel: state.focusedAppLabel,
      updateAppCoordinates: state.updateAppCoordinates,
    })),
  )

  const coordinates = app.coordinates
  const appState = app.state
  // A Window coming back from minimized grows out of the taskbar; that is
  // presentation only, so it is tracked here rather than as a Window state.
  const [previousAppState, setPreviousAppState] = useState(appState)
  const [restoring, setRestoring] = useState(false)
  if (previousAppState !== appState) {
    setPreviousAppState(appState)
    setRestoring(previousAppState === 'minimized' && appState !== 'closed')
  }
  const x = useMotionValue(coordinates.x)
  const y = useMotionValue(coordinates.y)
  const width = useMotionValue(coordinates.width)
  const height = useMotionValue(coordinates.height)

  const updateConstraints = useCallback(() => {
    const rect = windowRef.current?.getBoundingClientRect()
    if (!rect) return
    setDragConstraints({
      right: Math.max(0, window.innerWidth - rect.width),
      bottom: Math.max(0, window.innerHeight - TASKBAR_HEIGHT - rect.height),
    })
  }, [])

  useEffect(() => {
    const updateViewport = () => {
      setIsCompact(window.matchMedia('(max-width: 1023px)').matches)
      updateConstraints()
    }
    updateViewport()
    window.addEventListener('resize', updateViewport)
    return () => window.removeEventListener('resize', updateViewport)
  }, [updateConstraints])

  useLayoutEffect(() => {
    if (!restoring) return
    const current = useAppStore.getState().apps[appLabel].coordinates
    x.set(window.innerWidth / 2 - current.width / 2)
    y.set(
      window.innerHeight - current.height - TASKBAR_HEIGHT - RESTORE_ORIGIN_GAP,
    )
  }, [appLabel, restoring, x, y])

  useEffect(() => {
    if (gesturing.current || isCompact) return
    const animations = [
      animate(x, coordinates.x),
      animate(y, coordinates.y),
      animate(width, coordinates.width),
      animate(height, coordinates.height),
    ]
    return () => {
      for (const animation of animations) animation.stop()
    }
  }, [appState, coordinates, height, isCompact, width, x, y])

  const { startResize } = useResizable({
    windowRef,
    x,
    y,
    width,
    height,
    appLabel,
    onGestureStart: () => {
      gesturing.current = true
    },
    onGestureEnd: () => {
      gesturing.current = false
    },
    updateConstraints,
  })
  const dragControls = useDragControls()

  const focused = appLabel === focusedAppLabel
  const canDrag = !isCompact && appState !== 'maximized' && !restoring

  return (
    <motion.div
      ref={windowRef}
      drag={canDrag}
      dragControls={dragControls}
      dragConstraints={{
        top: 0,
        left: 0,
        right: dragConstraints.right,
        bottom: dragConstraints.bottom,
      }}
      dragElastic={0.1}
      dragListener={false}
      dragMomentum={false}
      onDragStart={() => {
        gesturing.current = true
      }}
      onDragEnd={() => {
        const maxX = Math.max(
          0,
          window.innerWidth -
            (windowRef.current?.offsetWidth ?? coordinates.width),
        )
        const maxY = Math.max(
          0,
          window.innerHeight -
            TASKBAR_HEIGHT -
            (windowRef.current?.offsetHeight ?? coordinates.height),
        )
        updateAppCoordinates(appLabel, {
          x: Math.min(Math.max(0, x.get()), maxX),
          y: Math.min(Math.max(0, y.get()), maxY),
        })
        gesturing.current = false
      }}
      style={
        isCompact
          ? { zIndex: focused ? 100 : 90 }
          : {
              x,
              y,
              width,
              height,
              minWidth: MINIMUM_WINDOW_SIZE.width,
              minHeight: MINIMUM_WINDOW_SIZE.height,
              zIndex: focused ? 100 : 90,
            }
      }
      initial={
        restoring
          ? { scale: 0.3, opacity: 0, filter: 'blur(8px)' }
          : { scale: 0.6, opacity: 0, filter: 'blur(8px)' }
      }
      animate={{ scale: 1, opacity: 1, filter: 'none' }}
      exit={{ scale: 0.6, opacity: 0, filter: 'blur(8px)' }}
      onAnimationComplete={() => setRestoring(false)}
      className={cn(
        '@container absolute flex max-h-[calc(100dvh-4rem)] max-w-full flex-col rounded-sm border bg-popover/50 backdrop-blur-sm select-none',
        isCompact && 'inset-0 h-[calc(100dvh-4rem)] max-h-none w-full',
      )}
      tabIndex={0}
      onPointerDown={() => focusApp(appLabel)}
    >
      {!isCompact && <ResizeHandles onResize={startResize} />}
      {/* Clips content here instead of on the window so the resize handles
          can sit outside its edge. */}
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[inherit]">
        <header
          className="relative flex h-10 w-full shrink-0 cursor-grab items-center justify-baseline border-b bg-linear-to-r from-background/15 via-background/25 to-background/15 text-center @xs:justify-center dark:text-(--white)"
          onPointerDown={(event) => {
            if (!canDrag) return
            gesturing.current = true
            updateConstraints()
            dragControls.start(event)
          }}
          onDoubleClick={() => {
            if (!isCompact) toggleMaximizeApp(appLabel)
          }}
        >
          <img
            src={app.iconSrc}
            alt=""
            width={20}
            height={20}
            className="mr-0 ml-1 @xs:mr-2"
            draggable={false}
          />
          <span className="ml-15 font-light @xs:ml-0">
            {app.title
              ? localizeOrKeep(app.title, language)
              : localize(appLabel)}
          </span>
          <div className="absolute right-0 flex h-full flex-row-reverse items-stretch">
            <Tooltip>
              <TooltipTrigger asChild>
                <WindowButton
                  onClick={() => closeApp(appLabel)}
                  className="hover:bg-red-600/75"
                  aria-label={localize('close')}
                >
                  <DismissRegular className="size-3.5" />
                </WindowButton>
              </TooltipTrigger>
              <TooltipContent sideOffset={4}>
                {localize('close')}
              </TooltipContent>
            </Tooltip>

            {appState === 'maximized' ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <WindowButton
                    onClick={() => toggleMaximizeApp(appLabel)}
                    aria-label={localize('unmaximize')}
                    className="hover-shade"
                  >
                    <SquareMultipleRegular className="size-3.5" />
                  </WindowButton>
                </TooltipTrigger>
                <TooltipContent sideOffset={4}>
                  {localize('unmaximize')}
                </TooltipContent>
              </Tooltip>
            ) : (
              <Tooltip>
                <TooltipTrigger asChild>
                  <WindowButton
                    onClick={() => toggleMaximizeApp(appLabel)}
                    aria-label={localize('maximize')}
                    className="hover-shade"
                    disabled={isCompact}
                  >
                    <MaximizeRegular className="size-3.5" />
                  </WindowButton>
                </TooltipTrigger>
                <TooltipContent sideOffset={4}>
                  {localize('maximize')}
                </TooltipContent>
              </Tooltip>
            )}

            <Tooltip>
              <TooltipTrigger asChild>
                <WindowButton
                  onClick={() => minimizeApp(appLabel)}
                  aria-label={localize('minimize')}
                  className="hover-shade"
                >
                  <SubtractRegular className="size-3.5" />
                </WindowButton>
              </TooltipTrigger>
              <TooltipContent sideOffset={4}>
                {localize('minimize')}
              </TooltipContent>
            </Tooltip>
          </div>
        </header>
        <main className="min-h-0 w-full grow overflow-y-auto">{children}</main>
      </div>
    </motion.div>
  )
}
