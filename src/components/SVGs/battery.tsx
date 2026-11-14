import type { FluentIcon } from '@fluentui/react-icons/headless'
import {
  Battery0Regular,
  Battery1Regular,
  Battery2Regular,
  Battery3Regular,
  Battery4Regular,
  Battery5Regular,
  Battery6Regular,
  Battery7Regular,
  Battery8Regular,
  Battery9Regular,
  Battery10Regular,
} from '@fluentui/react-icons/headless/svg/battery'
import {
  BatteryCharge0Regular,
  BatteryCharge1Regular,
  BatteryCharge2Regular,
  BatteryCharge3Regular,
  BatteryCharge4Regular,
  BatteryCharge5Regular,
  BatteryCharge6Regular,
  BatteryCharge7Regular,
  BatteryCharge8Regular,
  BatteryCharge9Regular,
  BatteryCharge10Regular,
} from '@fluentui/react-icons/headless/svg/battery-charge'

const batteryLevels: FluentIcon[] = [
  Battery0Regular,
  Battery1Regular,
  Battery2Regular,
  Battery3Regular,
  Battery4Regular,
  Battery5Regular,
  Battery6Regular,
  Battery7Regular,
  Battery8Regular,
  Battery9Regular,
  Battery10Regular,
]

const chargingLevels: FluentIcon[] = [
  BatteryCharge0Regular,
  BatteryCharge1Regular,
  BatteryCharge2Regular,
  BatteryCharge3Regular,
  BatteryCharge4Regular,
  BatteryCharge5Regular,
  BatteryCharge6Regular,
  BatteryCharge7Regular,
  BatteryCharge8Regular,
  BatteryCharge9Regular,
  BatteryCharge10Regular,
]

export function Battery({
  batteryLevel,
  size = 24,
  isCharging,
}: {
  batteryLevel: number
  size?: number
  isCharging?: boolean
}) {
  const step = Math.min(10, Math.round(batteryLevel / 10))
  const Icon = (isCharging ? chargingLevels : batteryLevels)[step]
  return <Icon style={{ width: size, height: size }} />
}
