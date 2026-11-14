import {
  Wifi1Regular,
  Wifi2Regular,
  Wifi3Regular,
  Wifi4Regular,
} from '@fluentui/react-icons/headless/svg/wifi'
import { GlobeProhibitedRegular } from '@fluentui/react-icons/svg'

export function Wifi({
  connectionType,
  size = 24,
}: {
  connectionType: string | null
  size?: number
}) {
  const style = { width: size, height: size }
  switch (connectionType) {
    case 'slow-2g':
      return <Wifi4Regular style={style} />
    case '2g':
      return <Wifi3Regular style={style} />
    case '3g':
      return <Wifi2Regular style={style} />
    case '4g':
      return <Wifi1Regular style={style} />
    default:
      return <GlobeProhibitedRegular style={style} />
  }
}
