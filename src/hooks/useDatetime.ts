import { useEffect, useState } from 'react'

export default function useDatetime() {
  const [datetime, setDatetime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setDatetime(new Date())
    }, 1000 * 10)

    return () => clearInterval(interval)
  }, [])

  return datetime
}
