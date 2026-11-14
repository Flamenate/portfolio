import { useCallback, useSyncExternalStore } from 'react'
import type { Dispatch, SetStateAction } from 'react'

type StorageOptions<T> = {
  raw?: boolean
  controlFn?: (value: T) => boolean
}

const listeners = new Map<string, Set<() => void>>()
const snapshots = new Map<string, { stored: string | null; value: unknown }>()

function notify(key: string) {
  snapshots.delete(key)
  listeners.get(key)?.forEach((listener) => listener())
}

function subscribe(key: string, listener: () => void) {
  let bucket = listeners.get(key)
  if (!bucket) {
    bucket = new Set()
    listeners.set(key, bucket)
  }
  bucket.add(listener)
  const onStorage = (event: StorageEvent) => {
    if (event.key === key || event.key === null) notify(key)
  }
  window.addEventListener('storage', onStorage)
  return () => {
    bucket?.delete(listener)
    window.removeEventListener('storage', onStorage)
  }
}

function readStored<T>(
  key: string,
  initialValue: T,
  options?: StorageOptions<T>,
): T {
  const stored = localStorage.getItem(key)
  const cached = snapshots.get(key)
  if (cached && cached.stored === stored) return cached.value as T

  let value = initialValue
  if (stored !== null) {
    try {
      const deserialized = options?.raw
        ? (stored as T)
        : (JSON.parse(stored) as T)
      if (
        typeof initialValue === typeof deserialized &&
        (!options?.controlFn || options.controlFn(deserialized))
      ) {
        value = deserialized
      }
    } catch (error) {
      console.error(
        'Something went wrong while trying to read from localStorage: ',
        error,
      )
    }
  }

  snapshots.set(key, { stored, value })
  return value
}

function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options?: StorageOptions<T>,
): [T, Dispatch<SetStateAction<T>>] {
  const raw = options?.raw
  const controlFn = options?.controlFn
  const value = useSyncExternalStore(
    (listener) => subscribe(key, listener),
    () => readStored(key, initialValue, { raw, controlFn }),
    () => initialValue,
  )

  const set = useCallback<Dispatch<SetStateAction<T>>>(
    (update) => {
      const previous = readStored(key, initialValue, { raw, controlFn })
      const resolved =
        typeof update === 'function'
          ? (update as (current: T) => T)(previous)
          : update
      if (typeof resolved === 'undefined') return
      try {
        localStorage.setItem(
          key,
          raw ? String(resolved) : JSON.stringify(resolved),
        )
        notify(key)
      } catch (error) {
        console.error(
          'Something went wrong while trying to write to localStorage: ',
          error,
        )
      }
    },
    [controlFn, initialValue, key, raw],
  )

  return [value, set]
}

export default useLocalStorage
