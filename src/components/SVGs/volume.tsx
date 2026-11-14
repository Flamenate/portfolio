import {
  Speaker0Regular,
  Speaker1Regular,
  Speaker2Regular,
} from '@fluentui/react-icons/headless/svg/speaker'
import { SpeakerMuteRegular } from '@fluentui/react-icons/headless/svg/speaker-mute'

export function Volume({ size, volume }: { size?: number; volume: number }) {
  const style = { width: size ?? 24, height: size ?? 24 }
  if (volume > 50) return <Speaker2Regular style={style} />
  if (volume > 20) return <Speaker1Regular style={style} />
  if (volume > 0) return <Speaker0Regular style={style} />
  return <SpeakerMuteRegular style={style} />
}
