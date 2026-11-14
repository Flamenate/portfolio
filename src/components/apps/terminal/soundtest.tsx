import { useEffect } from 'react'
import { useAudio } from '@/hooks/useAudio'
import type { Command } from '@/lib/terminal-commands'

export const Soundtest: Command = ({ args, snapshot }) => {
  const parsedVolume = parseInt(args[0] ?? '', 10)
  const volume =
    isNaN(parsedVolume) || parsedVolume < 0 || parsedVolume > 100
      ? snapshot.volume
      : parsedVolume
  const { play } = useAudio('/audio/audiocheck.wav')
  useEffect(() => {
    play({
      forceVolume: volume,
    })
    // oxlint-disable-next-line react/exhaustive-deps
  }, [])
  return <p>Soundtest played at {volume}% volume.</p>
}
