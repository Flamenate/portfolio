import { create } from 'zustand/react'
import type { FolderPath } from '@/lib/directories'
import { pdfEntry } from '@/lib/pdfs'
import { useAppStore } from './app.store'

export type PdfEntry = {
  id: string
  name: string
  extension: string
  src: string
  path: FolderPath | null
  openedAt: string | null
  size: number | null
}

type PdfStore = {
  recent: PdfEntry[]
  // A PDF asked for from outside Gymnast, shown once Gymnast picks it up.
  requested: PdfEntry | null
  recordOpen: (entry: PdfEntry) => void
  openPdf: (entry: PdfEntry) => void
  clearRequest: () => void
  addUpload: (file: File) => void
}

export const usePdfStore = create<PdfStore>()((set, get) => ({
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
  requested: null,
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
    // recordOpen puts a fresh object first, so each request is distinct.
    set((state) => ({ requested: state.recent[0] }))
    useAppStore.getState().openApp('gymnast_pdf')
  },
  clearRequest: () => set({ requested: null }),
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
