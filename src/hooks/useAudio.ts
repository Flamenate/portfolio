import { useEffect, useRef, useState } from 'react'
import useThemeStore from '@/stores/theme.store'

export const useAudio = (url: string) => {
  const audio = useRef<HTMLAudioElement | null>(
    typeof Audio !== 'undefined' ? new Audio(url) : null,
  )
  const [isPlaying, setIsPlaying] = useState(false)
  const volume = useThemeStore((state) => state.volume)

  const play = ({
    forceReplay,
    forceVolume,
  }: { forceReplay?: boolean; forceVolume?: number } = {}) => {
    if (!audio.current) return

    if (forceReplay && isPlaying) {
      audio.current.pause()
      audio.current.currentTime = 0
    }

    audio.current.volume = (forceVolume ?? volume) / 100
    audio.current.play()
    setIsPlaying(true)
  }
  const toggle = () => {
    if (!audio.current) return

    if (isPlaying) {
      audio.current.pause()
      setIsPlaying(false)
    } else {
      play()
    }
  }

  useEffect(() => {
    const current = audio.current
    if (!current) return

    const handleEnded = () => setIsPlaying(false)
    current.addEventListener('ended', handleEnded)
    return () => {
      current.removeEventListener('ended', handleEnded)
    }
  }, [])

  return {
    isPlaying,
    play,
    toggle,
    ref: audio,
  }
}
