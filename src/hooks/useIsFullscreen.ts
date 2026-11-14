import { useEffect, useEffectEvent, useState } from 'react'
import { useLogStore } from '@/stores/log.store'

export function useIsFullscreen() {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const logAction = useLogStore((state) => state.logAction)

  async function toggleFullScreen() {
    if (!isFullscreen) {
      try {
        await document.documentElement.requestFullscreen()
      } catch (error) {
        console.error('Error attempting to enable full-screen mode:', error)
      }
    } else {
      try {
        await document.exitFullscreen()
      } catch (error) {
        console.error('Error attempting to exit full-screen mode:', error)
      }
    }
  }

  const useCustomF11 = useEffectEvent((event: KeyboardEvent) => {
    if (event.key === 'F11') {
      event.preventDefault()
      toggleFullScreen()
    }
  })
  const handleFullscreenChange = useEffectEvent(() => {
    const isFullscreenNow = !!document.fullscreenElement
    setIsFullscreen(isFullscreenNow)
    logAction(isFullscreenNow ? 'enter_fullscreen' : 'exit_fullscreen')
  })

  useEffect(() => {
    window.addEventListener('keydown', useCustomF11)
    window.addEventListener('fullscreenchange', handleFullscreenChange)

    return () => {
      window.removeEventListener('keydown', useCustomF11)
      window.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [])

  return { isFullscreen, toggleFullScreen }
}
