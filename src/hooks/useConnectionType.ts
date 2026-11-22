import { useEffect, useRef, useSyncExternalStore } from 'react'
import { useNotificationStore } from '@/stores/notification.store'

function subscribe(callback: () => void) {
  if ('connection' in navigator) {
    ;(navigator as any).connection?.addEventListener('change', callback)
    return () => {
      ;(navigator as any).connection?.removeEventListener('change', callback)
    }
  }
  window.addEventListener('online', callback)
  window.addEventListener('offline', callback)
  return () => {
    window.removeEventListener('online', callback)
    window.removeEventListener('offline', callback)
  }
}

export function useConnectionType() {
  const connectionType = useSyncExternalStore(
    subscribe,
    () => {
      if ('connection' in navigator)
        return navigator.onLine
          ? ((navigator as any).connection?.effectiveType as string)
          : null
      return navigator.onLine ? '4g' : null
    },
    () => 'unknown',
  )
  const addSystemNotification = useNotificationStore(
    (state) => state.addSystemNotification,
  )
  const previousType = useRef(connectionType)
  useEffect(() => {
    const previous = previousType.current
    previousType.current = connectionType
    // 'unknown' is the server snapshot; leaving it is hydration, not a change.
    if (previous === connectionType || previous === 'unknown') return
    if (connectionType === null) {
      addSystemNotification({
        content: 'connection_lost',
        subcontent: 'connection_lost_description',
      })
    } else {
      addSystemNotification({
        content: 'connection_restored',
        subcontent: 'connection_restored_description',
      })
    }
  }, [connectionType, addSystemNotification])
  return connectionType
}
