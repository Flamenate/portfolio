import { useEffect, useState } from 'react'
import type { AppLabel } from '@/lib/apps'
import { useAppStore } from '@/stores/app.store'

export type AppRequest<T> = {
  // An item asked for from outside the App, shown once the App picks it up.
  requested: T | null
  request: (item: T) => void
  clearRequest: () => void
}

export function appRequestSlice<T extends object>(label: AppLabel) {
  return (
    set: (partial: Pick<AppRequest<T>, 'requested'>) => void,
  ): AppRequest<T> => ({
    requested: null,
    request: (item) => {
      // A fresh object keeps each request distinct, even for the same item.
      set({ requested: { ...item } })
      useAppStore.getState().openApp(label)
    },
    clearRequest: () => set({ requested: null }),
  })
}

// Hands each request to the App once, on arrival, then clears it.
// Takes the store's values rather than the store Hook itself, so Hooks stay static.
export function useAppRequest<T>(
  requested: T | null,
  clearRequest: () => void,
  onRequest: (item: T) => void,
) {
  const [shown, setShown] = useState<T | null>(null)
  if (requested && requested !== shown) {
    setShown(requested)
    onRequest(requested)
  }
  useEffect(() => {
    if (requested) clearRequest()
  }, [requested, clearRequest])
}
