import { getFolder, pathKey, root } from '@/lib/directories'
import { useExplorerStore } from '@/stores/explorer.store'
import { FolderTree } from './folder-tree'
import { FolderView } from './folder-view'
import { FileExplorerLayout } from './layout'
import { NavigationBar } from './navigation-bar'

export function FileExplorer() {
  const entry = useExplorerStore((state) => state.entries[state.index])
  const found = getFolder(entry)
  const path = found ? entry : []
  const folder = found ?? root

  return (
    <FileExplorerLayout
      header={<NavigationBar path={path} />}
      sidebar={<FolderTree currentPath={path} />}
    >
      <FolderView key={pathKey(path)} folder={folder} path={path} />
    </FileExplorerLayout>
  )
}
