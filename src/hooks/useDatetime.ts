import { useEffect, useEffectEvent, useState } from 'react'

export default function useDatetime() {
  const [datetime, setDatetime] = useState<Date | null>(null)

  const tick = useEffectEvent(() => setDatetime(new Date()))
  useEffect(() => {
    // oxlint-disable-next-line react/set-state-in-effect
    // react-doctor-disable-next-line react-hooks-js/set-state-in-effect
    tick()
    const interval = setInterval(tick, 10_000)
    return () => clearInterval(interval)
  }, [])

  return datetime
}
