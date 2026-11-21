import { useEffect, useState } from 'react'
import type { StoreApi } from 'zustand'
import { useStore } from 'zustand/react'
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

type RequestState = Pick<AppRequest<unknown>, 'requested' | 'clearRequest'>

// Read-only, so a store of any item type fits.
type RequestStore<S> = Pick<
  StoreApi<S>,
  'getState' | 'getInitialState' | 'subscribe'
>

// Hands each request to the App once, on arrival, then clears it.
export function useAppRequest<S extends RequestState>(
  store: RequestStore<S>,
  onRequest: (item: NonNullable<S['requested']>) => void,
) {
  const requested = useStore(store, (state) => state.requested)
  const [shown, setShown] = useState<S['requested']>(null)
  if (requested && requested !== shown) {
    setShown(requested)
    onRequest(requested)
  }
  useEffect(() => {
    if (requested) store.getState().clearRequest()
  }, [requested, store])
}
