import type { MotionValue } from 'motion/react'
import { useEffect, useEffectEvent, useRef } from 'react'
import type { PointerEvent as ReactPointerEvent, RefObject } from 'react'
import { MinimumSize } from '@/models/application'
import { useAppStore } from '@/stores/app.store'

export type ResizeDirection =
  | 'east'
  | 'west'
  | 'south'
  | 'north'
  | 'northeast'
  | 'northwest'
  | 'southeast'
  | 'southwest'

interface UseResizeOptions {
  windowRef: RefObject<HTMLDivElement | null>
  x: MotionValue<number>
  y: MotionValue<number>
  width: MotionValue<number>
  height: MotionValue<number>
  appLabel: string
  onGestureStart: () => void
  onGestureEnd: () => void
  updateConstraints: () => void
}

export function useResizable({
  windowRef,
  x,
  y,
  width,
  height,
  appLabel,
  onGestureStart,
  onGestureEnd,
  updateConstraints,
}: UseResizeOptions) {
  const resizeDragRef = useRef<{
    active: boolean
    direction: ResizeDirection | null
    startX: number
    startY: number
    startWidth: number
    startHeight: number
    startWindowX: number
    startWindowY: number
  }>({
    active: false,
    direction: null,
    startX: 0,
    startY: 0,
    startWidth: 0,
    startHeight: 0,
    startWindowX: 0,
    startWindowY: 0,
  })

  const handlePointerMove = useEffectEvent((moveEvent: PointerEvent) => {
    const drag = resizeDragRef.current
    if (!drag.active || !drag.direction) return

    const deltaX = moveEvent.clientX - drag.startX
    const deltaY = moveEvent.clientY - drag.startY
    const direction = drag.direction
    const east =
      direction === 'east' ||
      direction === 'northeast' ||
      direction === 'southeast'
    const west =
      direction === 'west' ||
      direction === 'northwest' ||
      direction === 'southwest'
    const south =
      direction === 'south' ||
      direction === 'southeast' ||
      direction === 'southwest'
    const north =
      direction === 'north' ||
      direction === 'northeast' ||
      direction === 'northwest'

    let nextX = drag.startWindowX
    let nextY = drag.startWindowY
    let nextWidth = drag.startWidth
    let nextHeight = drag.startHeight
    const maxBottom = window.innerHeight - 64

    if (east) {
      const resized = Math.max(MinimumSize.width, drag.startWidth + deltaX)
      if (drag.startWindowX + resized <= window.innerWidth) nextWidth = resized
    }
    if (west) {
      const resized = Math.max(MinimumSize.width, drag.startWidth - deltaX)
      const candidateX = drag.startWindowX - (resized - drag.startWidth)
      if (candidateX >= 0) {
        nextWidth = resized
        nextX = candidateX
      }
    }
    if (south) {
      const resized = Math.max(MinimumSize.height, drag.startHeight + deltaY)
      if (drag.startWindowY + resized <= maxBottom) nextHeight = resized
    }
    if (north) {
      const resized = Math.max(MinimumSize.height, drag.startHeight - deltaY)
      const candidateY = drag.startWindowY - (resized - drag.startHeight)
      if (candidateY >= 0) {
        nextHeight = resized
        nextY = candidateY
      }
    }

    x.jump(nextX)
    y.jump(nextY)
    width.jump(nextWidth)
    height.jump(nextHeight)
  })

  const handlePointerUp = useEffectEvent(() => {
    if (!resizeDragRef.current.active) return
    resizeDragRef.current.active = false
    useAppStore.getState().updateAppCoordinates(appLabel, {
      x: x.get(),
      y: y.get(),
      width: width.get(),
      height: height.get(),
    })
    onGestureEnd()
    updateConstraints()
  })

  useEffect(() => {
    document.addEventListener('pointermove', handlePointerMove)
    document.addEventListener('pointerup', handlePointerUp)
    return () => {
      document.removeEventListener('pointermove', handlePointerMove)
      document.removeEventListener('pointerup', handlePointerUp)
    }
  }, [])

  const startResize = (
    direction: ResizeDirection,
    event: ReactPointerEvent,
  ) => {
    const element = windowRef.current
    if (!element) return

    const store = useAppStore.getState()
    if (store.apps[appLabel]?.state === 'maximized') {
      store.releaseMaximize(appLabel)
    }
    store.focusApp(appLabel)
    onGestureStart()

    const rect = element.getBoundingClientRect()
    resizeDragRef.current = {
      active: true,
      direction,
      startX: event.clientX,
      startY: event.clientY,
      startWidth: rect.width,
      startHeight: rect.height,
      startWindowX: x.get(),
      startWindowY: y.get(),
    }
  }

  return { startResize }
}
