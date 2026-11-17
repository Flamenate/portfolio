export type FileNode = {
  type: 'file'
  name: string
  extension: string
  src?: string
  date?: string
}

export function fileLabel(file: Pick<FileNode, 'name' | 'extension'>) {
  return `${file.name}.${file.extension}`
}

export type FolderNode = {
  type: 'folder'
  name: string
  desktopShortcut?: boolean
  iconSrc?: string
  children: FsNode[]
}

export type FsNode = FileNode | FolderNode

export type FolderPath = string[]

export const root: FolderNode = {
  type: 'folder',
  name: 'this_pc',
  children: [
    {
      type: 'folder',
      name: 'downloads',
      iconSrc: '/images/icons/downloads.webp',
      children: [],
    },
    {
      type: 'folder',
      name: 'documents',
      iconSrc: '/images/icons/documents.webp',
      children: [
        {
          type: 'file',
          name: 'Haythem_FRIKHA_ENG',
          extension: 'pdf',
          src: '/documents/Haythem_FRIKHA_ENG.pdf',
        },
        {
          type: 'file',
          name: 'Haythem_FRIKHA_FR',
          extension: 'pdf',
          src: '/documents/Haythem_FRIKHA_FR.pdf',
        },
      ],
    },
    {
      type: 'folder',
      name: 'pictures',
      iconSrc: '/images/icons/pictures.webp',
      children: [
        {
          type: 'file',
          name: 'ena',
          extension: 'jpg',
          src: '/images/pictures/ena.jpg',
          date: '2026-11-02',
        },
        {
          type: 'file',
          name: 'login_bg',
          extension: 'jpg',
          src: '/images/pictures/login_bg.jpg',
          date: '2026-11-08',
        },
        {
          type: 'file',
          name: 'desktop_bg',
          extension: 'webp',
          src: '/images/pictures/desktop_bg.jpg',
          date: '2026-10-14',
        },
        {
          type: 'file',
          name: 'desktop_bg_old',
          extension: 'webp',
          src: '/images/pictures/desktop_bg_old.webp',
          date: '2026-10-03',
        },
        {
          type: 'file',
          name: 'desktop_dark_bg',
          extension: 'png',
          src: '/images/pictures/desktop_dark_bg.png',
          date: '2026-09-21',
        },
      ],
    },
    {
      type: 'folder',
      name: 'music',
      iconSrc: '/images/icons/music.webp',
      children: [],
    },
    {
      type: 'folder',
      name: 'recycle_bin',
      desktopShortcut: true,
      iconSrc: '/images/icons/recycle_bin_full.png',
      children: [],
    },
    {
      type: 'folder',
      name: 'regrets',
      children: [],
    },
  ],
}

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
