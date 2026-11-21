import { create } from 'zustand/react'
import type { Photo } from '@/lib/photos'
import { useAppStore } from './app.store'

type PhotosStore = {
  // A photo asked for from outside Photos, shown once Photos picks it up.
  requested: Photo | null
  openPhoto: (photo: Photo) => void
  clearRequest: () => void
}

export const usePhotosStore = create<PhotosStore>()((set) => ({
  requested: null,
  openPhoto: (photo) => {
    // A fresh object keeps each request distinct, even for the same photo.
    set({ requested: { ...photo } })
    useAppStore.getState().openApp('photos')
  },
  clearRequest: () => set({ requested: null }),
}))

export default usePhotosStore
