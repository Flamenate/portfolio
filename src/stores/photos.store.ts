import { create } from 'zustand/react'
import { appRequestSlice } from '@/lib/app-request'
import type { AppRequest } from '@/lib/app-request'
import type { Photo } from '@/lib/photos'

export const usePhotosStore = create<AppRequest<Photo>>()(
  appRequestSlice<Photo>('photos'),
)

export default usePhotosStore
