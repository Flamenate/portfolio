import {
  FolderTree as FolderTreeList,
  folderTreeFrom,
} from '@/components/ui/folder-tree'
import { root } from '@/data/directories'
import type { FolderPath } from '@/lib/directories'
import { useExplorerStore } from '@/stores/explorer.store'

export function FolderTree({ currentPath }: { currentPath: FolderPath }) {
  const navigate = useExplorerStore((state) => state.navigate)
  return (
    <aside className="hidden h-full w-48 shrink-0 overflow-x-hidden overflow-y-auto border-r border-muted-foreground/50 p-1 @sm:block">
      <FolderTreeList
        nodes={[folderTreeFrom(root)]}
        currentPath={currentPath}
        onSelect={navigate}
      />
    </aside>
  )
}
