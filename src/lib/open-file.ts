import { appForExtension, fileLabel } from '@/lib/directories'
import type { LocatedFile } from '@/lib/directories'
import { pdfEntry } from '@/lib/pdfs'
import { photoFromFile } from '@/lib/photos'
import { useAppStore } from '@/stores/app.store'
import { useNotepadStore } from '@/stores/notepad.store'
import { usePdfStore } from '@/stores/pdf.store'
import { usePhotosStore } from '@/stores/photos.store'

/** Returns whether an App handled the File. */
export function openFile(file: LocatedFile): boolean {
  const label = appForExtension(file.extension)
  if (!label) return false
  if (label === 'photos')
    usePhotosStore.getState().request(photoFromFile(file, file.path))
  else if (label === 'gymnast_pdf')
    usePdfStore.getState().openPdf(pdfEntry(file))
  else if (label === 'notepad') useNotepadStore.getState().request(file)
  else useAppStore.getState().openApp(label, { title: fileLabel(file) })
  return true
}
