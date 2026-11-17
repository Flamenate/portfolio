import { fileLabel, pathKey, root } from '@/lib/directories'
import type {
  FileNode,
  FolderNode,
  FolderPath,
  FsNode,
} from '@/lib/directories'

const pdfExtensions = new Set(['pdf'])

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

export function isPdfFile(node: FsNode): node is FileNode & { src: string } {
  return (
    node.type === 'file' &&
    node.src !== undefined &&
    pdfExtensions.has(node.extension.toLowerCase())
  )
}

export function pdfId(file: Pick<PdfFile, 'path' | 'name' | 'extension'>) {
  return `${pathKey(file.path)}/${fileLabel(file)}`
}

export function pdfsIn(folder: FolderNode, path: FolderPath): PdfFile[] {
  const files: PdfFile[] = []
  for (const child of folder.children) {
    if (isPdfFile(child)) {
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
  if (folder.children.some(isPdfFile)) listed.push({ folder, path })
  for (const child of folder.children) {
    if (child.type === 'folder') {
      listed.push(...pdfFolders(child, [...path, child.name]))
    }
  }
  return listed
}
