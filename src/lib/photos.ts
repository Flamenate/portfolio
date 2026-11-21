import { root } from '@/data/directories'
import { getFolder } from '@/lib/directories'
import type {
  FileNode,
  FolderNode,
  FolderPath,
  FsNode,
} from '@/lib/directories'

const imageExtensions = new Set(['jpg', 'jpeg', 'png', 'webp'])

export type Photo = {
  name: string
  extension: string
  src: string
  path: FolderPath
  date?: string
}

export type PhotoMonth = {
  key: string
  date: string | null
  photos: Photo[]
}

export type PhotoFolder = {
  folder: FolderNode
  path: FolderPath
  children: PhotoFolder[]
}

export function isImageFile(node: FsNode): node is FileNode & { src: string } {
  return (
    node.type === 'file' &&
    node.src !== undefined &&
    imageExtensions.has(node.extension.toLowerCase())
  )
}

export function appForExtension(extension: string) {
  return imageExtensions.has(extension.toLowerCase()) ? 'photos' : undefined
}

function toPhoto(node: FileNode & { src: string }, path: FolderPath): Photo {
  return {
    name: node.name,
    extension: node.extension,
    src: node.src,
    path,
    date: node.date,
  }
}

export function photoFromNode(node: FsNode, path: FolderPath): Photo | null {
  return isImageFile(node) ? toPhoto(node, path) : null
}

function collectPhotos(folder: FolderNode, path: FolderPath): Photo[] {
  const photos: Photo[] = []
  for (const child of folder.children) {
    if (isImageFile(child)) {
      photos.push(toPhoto(child, path))
    } else if (child.type === 'folder') {
      photos.push(...collectPhotos(child, [...path, child.name]))
    }
  }
  return photos
}

function byKeyDesc(a: string, b: string) {
  if (a === b) return 0
  return a < b ? 1 : -1
}

function byDateDesc(a: Photo, b: Photo) {
  return byKeyDesc(a.date ?? '', b.date ?? '')
}

export function photosByMonth(photos: Photo[]): PhotoMonth[] {
  const dated = new Map<string, Photo[]>()
  const undated: Photo[] = []
  for (const photo of photos) {
    if (!photo.date) {
      undated.push(photo)
      continue
    }
    const key = photo.date.slice(0, 7)
    const group = dated.get(key)
    if (group) group.push(photo)
    else dated.set(key, [photo])
  }
  const months: PhotoMonth[] = [...dated.entries()]
    .sort(([a], [b]) => byKeyDesc(a, b))
    .map(([key, items]) => ({
      key,
      date: `${key}-01`,
      photos: items.toSorted(byDateDesc),
    }))
  if (undated.length > 0) {
    months.push({ key: 'undated', date: null, photos: undated })
  }
  return months
}

export function photosUnder(path: FolderPath | null): Photo[] {
  const folder = path === null ? root : getFolder(path)
  if (!folder) return []
  return collectPhotos(folder, path ?? [])
}

export function photoFolders(
  folder: FolderNode,
  path: FolderPath = [],
): PhotoFolder | null {
  const children: PhotoFolder[] = []
  let images = false
  for (const child of folder.children) {
    if (isImageFile(child)) images = true
    else if (child.type === 'folder') {
      const next = photoFolders(child, [...path, child.name])
      if (next) children.push(next)
    }
  }
  if (!images && children.length === 0) return null
  return { folder, path, children }
}
