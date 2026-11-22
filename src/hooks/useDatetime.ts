// oxlint-disable react/set-state-in-effect
import { useEffect, useEffectEvent, useState } from 'react'

export default function useDatetime() {
  const [datetime, setDatetime] = useState<Date | null>(null)

  const tick = useEffectEvent(() => setDatetime(new Date()))
  useEffect(() => {
    // react-doctor-disable-next-line react-hooks-js/set-state-in-effect
    tick()
    const interval = setInterval(tick, 10_000)
    return () => clearInterval(interval)
  }, [])

  return datetime
}
