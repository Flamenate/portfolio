import type { Command } from '@/lib/terminal-commands'
import useThemeStore from '@/stores/theme.store'

export const soundtestCommand: Command = ({ args }) => {
  const parsedVolume = parseInt(args[0] ?? '', 10)
  const volume =
    isNaN(parsedVolume) || parsedVolume < 0 || parsedVolume > 100
      ? useThemeStore.getState().volume
      : parsedVolume
  const audio = new Audio('/audio/audiocheck.wav')
  audio.volume = volume / 100
  void audio.play()
  return <p>Soundtest played at {volume}% volume.</p>
}
