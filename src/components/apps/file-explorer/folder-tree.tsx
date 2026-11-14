import { FolderFilled } from '@fluentui/react-icons/headless/svg/folder'
import { FolderOpenFilled } from '@fluentui/react-icons/headless/svg/folder-open'
import { isSamePath, root } from '@/lib/directories'
import type { FolderNode, FolderPath } from '@/lib/directories'
import { cn } from '@/lib/utils'
import { useExplorerStore } from '@/stores/explorer.store'

function FolderRow({
  folder,
  path,
  depth,
  currentPath,
}: {
  folder: FolderNode
  path: FolderPath
  depth: number
  currentPath: FolderPath
}) {
  const navigate = useExplorerStore((state) => state.navigate)
  const isCurrent = isSamePath(path, currentPath)
  const Icon = isCurrent ? FolderOpenFilled : FolderFilled
  const subfolders = folder.children.filter(
    (child): child is FolderNode => child.type === 'folder',
  )
  return (
    <aside className="hidden h-full w-48 shrink-0 overflow-x-hidden overflow-y-auto border-r border-muted-foreground/50 px-0.5 @sm:block">
      <li className="mr-1">
        <button
          type="button"
          aria-current={isCurrent ? 'page' : undefined}
          className={cn(
            `flex w-full cursor-pointer items-center gap-1.5 rounded-sm p-1.5 text-left whitespace-nowrap ${isCurrent ? 'bg-accent/30' : 'hover:bg-accent/20'}`,
          )}
          style={{ paddingLeft: `${depth * 0.75 + 0.25}rem` }}
          onClick={() => navigate(path)}
        >
          <Icon className="size-4 shrink-0 text-amber-400" />
          <span className="truncate">{folder.name}</span>
        </button>
        {subfolders.length > 0 && (
          <ul>
            {subfolders.map((child) => (
              <FolderRow
                key={child.name}
                folder={child}
                path={[...path, child.name]}
                depth={depth + 1}
                currentPath={currentPath}
              />
            ))}
          </ul>
        )}
      </li>
    </aside>
  )
}

export function FolderTree({ currentPath }: { currentPath: FolderPath }) {
  return (
    <ul>
      <FolderRow folder={root} path={[]} depth={0} currentPath={currentPath} />
    </ul>
  )
}
