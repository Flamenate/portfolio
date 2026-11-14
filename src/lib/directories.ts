export type FileNode = { type: 'file'; appLabel: string; name?: string }

export type FolderNode = {
  type: 'folder'
  name: string
  desktopShortcut?: boolean
  children: FsNode[]
}

export type FsNode = FileNode | FolderNode

export type FolderPath = string[]

export const root: FolderNode = {
  type: 'folder',
  name: 'This PC',
  children: [
    {
      type: 'folder',
      name: 'My Regrets',
      desktopShortcut: false,
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
