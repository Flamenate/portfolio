import { useEffect, useState } from 'react'
import { useNotificationStore } from '@/stores/notification.store'

interface BatteryManager extends EventTarget {
  charging: boolean
  level: number
}

export const useBattery = () => {
  const [batteryStatus, setBatteryStatus] = useState<{
    level: number
    isCharging: boolean
  }>({
    level: 100,
    isCharging: false,
  })
  const addSystemNotification = useNotificationStore(
    (state) => state.addSystemNotification,
  )

  useEffect(() => {
    const nav = navigator as Navigator & {
      getBattery?: () => Promise<BatteryManager>
    }
    if (!nav.getBattery) return

    let active = true
    let battery: BatteryManager | undefined
    let previousLevel = 1
    let previousCharging = false
    let seen = false

    const publish = () => {
      if (!battery) return
      const level = Math.round(battery.level * 100)
      const isCharging = battery.charging
      if (!seen) {
        seen = true
        previousLevel = battery.level
        previousCharging = isCharging
        setBatteryStatus({ level, isCharging })
        return
      }
      if (battery.level !== previousLevel) {
        previousLevel = battery.level
        setBatteryStatus((status) => ({ ...status, level }))
        if (battery.level <= 0.2) {
          addSystemNotification({
            content: 'battery_low',
            subcontent: 'battery_low_description',
          })
        }
      }
      if (isCharging !== previousCharging) {
        previousCharging = isCharging
        setBatteryStatus({ level, isCharging })
        addSystemNotification({
          content: isCharging
            ? 'battery_charging'
            : 'battery_no_longer_charging',
          subcontent: isCharging
            ? 'battery_charging_description'
            : 'battery_no_longer_charging_description',
        })
      }
    }

    const interval = window.setInterval(publish, 15000)
    nav.getBattery().then((next) => {
      if (!active) return
      battery = next
      publish()
    })

    return () => {
      active = false
      window.clearInterval(interval)
    }
  }, [addSystemNotification])

  return batteryStatus
}
