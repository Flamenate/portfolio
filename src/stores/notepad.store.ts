import { create } from 'zustand/react'
import { appRequestSlice } from '@/lib/app-request'
import type { AppRequest } from '@/lib/app-request'
import type { FileNode } from '@/lib/directories'

export const useNotepadStore = create<AppRequest<FileNode>>()(
  appRequestSlice<FileNode>('notepad'),
)

export default useNotepadStore
