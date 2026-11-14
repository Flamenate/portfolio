import { useState } from 'react'
import useLocalize from '@/hooks/useLocalize'
import type { FolderNode, FolderPath, FsNode } from '@/lib/directories'
import { cn } from '@/lib/utils'
import useAppStore from '@/stores/app.store'
import { useExplorerStore } from '@/stores/explorer.store'

function ItemIcon({ node }: { node: FsNode }) {
  const iconSrc = useAppStore((state) =>
    node.type === 'file'
      ? state.apps[node.appLabel]?.iconSrc
      : '/images/folder.webp',
  )
  return (
    <img
      src={iconSrc}
      alt=""
      width={48}
      height={48}
      draggable={false}
      className="aspect-square size-12 object-contain"
    />
  )
}

export function FolderView({
  folder,
  path,
}: {
  folder: FolderNode
  path: FolderPath
}) {
  const localize = useLocalize()
  const navigate = useExplorerStore((state) => state.navigate)
  const openApp = useAppStore((state) => state.openApp)
  const [selected, setSelected] = useState<number | null>(null)

  if (folder.children.length === 0) {
    return (
      <p className="mt-6 text-center opacity-60">{localize('folder_empty')}</p>
    )
  }

  const open = (node: FsNode) => {
    if (node.type === 'folder') navigate([...path, node.name])
    else openApp(node.appLabel, { title: node.name })
  }

  return (
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(5.5rem,1fr))] gap-2">
      {folder.children.map((node, i) => (
        <li key={i}>
          <button
            type="button"
            className={cn(
              'flex w-full flex-col items-center gap-1 rounded-sm px-2 py-1 outline-accent-foreground hover:bg-accent/25 focus-visible:outline-1 dark:hover:bg-white/25',
              selected === i && 'bg-accent/30 dark:bg-white/40',
            )}
            onClick={() => setSelected(i)}
            onDoubleClick={() => open(node)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') open(node)
            }}
          >
            <ItemIcon node={node} />
            <span className="w-full text-center wrap-break-word">
              {node.type === 'folder'
                ? node.name
                : (node.name ?? localize(node.appLabel))}
            </span>
          </button>
        </li>
      ))}
    </ul>
  )
}
