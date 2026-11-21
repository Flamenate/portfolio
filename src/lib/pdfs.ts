import { root } from '@/data/directories'
import { fileLabel, pathKey } from '@/lib/directories'
import type { FileNode, FolderNode, FolderPath } from '@/lib/directories'
import type { PdfEntry } from '@/stores/pdf.store'

export type PdfFile = {
  name: string
  extension: string
  src: string
  path: FolderPath
}

export type PdfFolder = {
  folder: FolderNode
  path: FolderPath
}

export function isPdfFile(file: FileNode) {
  return file.extension.toLowerCase() === 'pdf'
}

export function pdfId(file: Pick<PdfFile, 'path' | 'name' | 'extension'>) {
  return `${pathKey(file.path)}/${fileLabel(file)}`
}

export function pdfEntry(file: PdfFile): PdfEntry {
  return {
    id: pdfId(file),
    name: file.name,
    extension: file.extension,
    src: file.src,
    path: file.path,
    openedAt: null,
    size: null,
  }
}

export function pdfsIn(folder: FolderNode, path: FolderPath): PdfFile[] {
  const files: PdfFile[] = []
  for (const child of folder.children) {
    if (child.type === 'file' && isPdfFile(child)) {
      files.push({
        name: child.name,
        extension: child.extension,
        src: child.src,
        path,
      })
    }
  }
  return files
}

export function pdfFolders(
  folder: FolderNode = root,
  path: FolderPath = [],
): PdfFolder[] {
  const listed: PdfFolder[] = []
  if (
    folder.children.some((child) => child.type === 'file' && isPdfFile(child))
  )
    listed.push({ folder, path })
  for (const child of folder.children) {
    if (child.type === 'folder') {
      listed.push(...pdfFolders(child, [...path, child.name]))
    }
  }
  return listed
}
