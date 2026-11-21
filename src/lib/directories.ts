import { root } from '@/data/directories'
import type { AppLabel } from '@/lib/apps'
import type { TranslationKey } from '@/lib/localize'

export type FileNode = {
  type: 'file'
  name: string
  extension: string
  // A public URL, or for text Files a file name in src/data/texts/.
  src: string
  date?: string
  // Featured in the start menu's Recommended section.
  recommended?: boolean
  desktopShortcut?: boolean
}

export function fileLabel(file: Pick<FileNode, 'name' | 'extension'>) {
  return `${file.name}.${file.extension}`
}

export const imageExtensions = new Set(['jpg', 'jpeg', 'png', 'webp'])

export function isImageFile(file: FileNode) {
  return imageExtensions.has(file.extension.toLowerCase())
}

export const fileApps: Partial<Record<string, AppLabel>> = {
  ...Object.fromEntries(
    [...imageExtensions].map((extension) => [extension, 'photos' as const]),
  ),
  pdf: 'gymnast_pdf',
  txt: 'notepad',
}

export function appForExtension(extension: string) {
  return fileApps[extension.toLowerCase()]
}

export const fileIcons: Partial<Record<string, string>> = {
  pdf: '/media/icons/pdf.webp',
  txt: '/media/icons/txt.webp',
  exe: '/media/icons/exe.webp',
}

export function fileIconSrc(file: FileNode) {
  if (isImageFile(file)) return file.src
  return (
    fileIcons[file.extension.toLowerCase()] ?? '/media/icons/placeholder.webp'
  )
}

export type FolderNode = {
  type: 'folder'
  name: TranslationKey
  desktopShortcut?: boolean
  iconSrc?: string
  children: FsNode[]
}

export type FsNode = FileNode | FolderNode

export type FolderPath = FolderNode['name'][]

export function getFolder(path: FolderPath): FolderNode | undefined {
  let folder: FolderNode | undefined = root
  for (const name of path) {
    folder = folder.children.find(
      (child): child is FolderNode =>
        child.type === 'folder' && child.name === name,
    )
    if (!folder) return undefined
  }
  return folder
}

export function isSamePath(a: FolderPath, b: FolderPath) {
  return a.length === b.length && a.every((name, i) => name === b[i])
}

export function pathKey(path: FolderPath) {
  return `folder:${path.join('/')}`
}

export type LocatedFile = FileNode & { path: FolderPath }

export function fileId(file: Pick<LocatedFile, 'name' | 'extension' | 'path'>) {
  return `${pathKey(file.path)}/${fileLabel(file)}`
}

function collectDesktopFolders(
  folder: FolderNode,
  path: FolderPath,
): FolderPath[] {
  const paths: FolderPath[] = folder.desktopShortcut ? [path] : []
  for (const child of folder.children) {
    if (child.type === 'folder') {
      paths.push(...collectDesktopFolders(child, [...path, child.name]))
    }
  }
  return paths
}

export const desktopFolderPaths = collectDesktopFolders(root, [])

function collectFiles(
  folder: FolderNode,
  path: FolderPath,
  matches: (file: FileNode) => boolean,
): LocatedFile[] {
  const files: LocatedFile[] = []
  for (const child of folder.children) {
    if (child.type === 'folder') {
      files.push(...collectFiles(child, [...path, child.name], matches))
    } else if (matches(child)) {
      files.push({ ...child, path })
    }
  }
  return files
}

export function findFiles(matches: (file: FileNode) => boolean) {
  return collectFiles(root, [], matches)
}

export const recommendedFiles = findFiles((file) => !!file.recommended)

export const desktopFiles = findFiles((file) => !!file.desktopShortcut)
