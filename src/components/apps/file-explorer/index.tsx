import { useLayoutEffect } from 'react'
import { pathKey } from '@/lib/directories'
import useAppStore from '@/stores/app.store'
import { EXPLORER_APP_LABEL, useExplorerStore } from '@/stores/explorer.store'
import { FolderTree } from './folder-tree'
import { FolderView } from './folder-view'
import { FileExplorerLayout } from './layout'
import { NavigationBar } from './navigation-bar'

export function FileExplorer() {
  const { path, folder } = useExplorerStore((state) => state.location)
  const setAppTitle = useAppStore((state) => state.setAppTitle)

  useLayoutEffect(() => {
    setAppTitle(EXPLORER_APP_LABEL, folder.name)
  }, [folder, setAppTitle])

  return (
    <FileExplorerLayout
      header={<NavigationBar path={path} />}
      sidebar={<FolderTree currentPath={path} />}
    >
      <FolderView key={pathKey(path)} folder={folder} path={path} />
    </FileExplorerLayout>
  )
}
