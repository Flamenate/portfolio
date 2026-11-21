import { create } from 'zustand/react'
import { appRequestSlice } from '@/lib/app-request'
import type { AppRequest } from '@/lib/app-request'
import type { FolderPath } from '@/lib/directories'
import { pdfEntry } from '@/lib/pdfs'

export type PdfEntry = {
  id: string
  name: string
  extension: string
  src: string
  path: FolderPath | null
  openedAt: string | null
  size: number | null
}

type PdfStore = AppRequest<PdfEntry> & {
  recent: PdfEntry[]
  recordOpen: (entry: PdfEntry) => void
  openPdf: (entry: PdfEntry) => void
  addUpload: (file: File) => void
}

export const usePdfStore = create<PdfStore>()((set, get) => ({
  ...appRequestSlice<PdfEntry>('gymnast_pdf')(set),
  recent: [
    pdfEntry({
      name: 'Haythem_FRIKHA_ENG',
      extension: 'pdf',
      src: '/documents/Haythem_FRIKHA_ENG.pdf',
      path: ['documents'],
    }),
    pdfEntry({
      name: 'Haythem_FRIKHA_FR',
      extension: 'pdf',
      src: '/documents/Haythem_FRIKHA_FR.pdf',
      path: ['documents'],
    }),
  ],
  recordOpen: (entry) =>
    set((state) => {
      const existing = state.recent.find((item) => item.id === entry.id)
      const next: PdfEntry = {
        ...(existing ?? entry),
        src: entry.src,
        openedAt: new Date().toISOString(),
      }
      return {
        recent: [next, ...state.recent.filter((item) => item.id !== entry.id)],
      }
    }),
  openPdf: (entry) => {
    get().recordOpen(entry)
    get().request(get().recent[0])
  },
  addUpload: (file) =>
    set((state) => {
      const dot = file.name.lastIndexOf('.')
      const name = dot > 0 ? file.name.slice(0, dot) : file.name
      const extension = dot > 0 ? file.name.slice(dot + 1) : 'pdf'
      const entry: PdfEntry = {
        id: `upload:${crypto.randomUUID()}`,
        name,
        extension,
        src: URL.createObjectURL(file),
        path: null,
        openedAt: new Date().toISOString(),
        size: file.size,
      }
      return { recent: [entry, ...state.recent] }
    }),
}))

export default usePdfStore
