import { useSyncExternalStore } from 'react'
import { COMPACT_MEDIA_QUERY } from '@/lib/constants'

function subscribe(callback: () => void) {
  const query = window.matchMedia(COMPACT_MEDIA_QUERY)
  query.addEventListener('change', callback)
  return () => query.removeEventListener('change', callback)
}

export function useIsCompact() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(COMPACT_MEDIA_QUERY).matches,
    () => false,
  )
}

export default useIsCompact
