import { useState } from 'react'
import useLocalize from '@/hooks/useLocalize'
import { fileLabel } from '@/lib/directories'
import type { FolderNode, FolderPath, FsNode } from '@/lib/directories'
import { appForExtension, isImageFile } from '@/lib/photos'
import { cn } from '@/lib/utils'
import useAppStore from '@/stores/app.store'
import { useExplorerStore } from '@/stores/explorer.store'

function nodeKey(node: FsNode) {
  return node.type === 'folder'
    ? `folder:${node.name}`
    : `file:${fileLabel(node)}`
}

function ItemIcon({ node }: { node: FsNode }) {
  const extension = node.type === 'file' ? node.extension : null
  const appIcon = useAppStore((state) => {
    if (!extension) return undefined
    const label = appForExtension(extension)
    return label ? state.apps[label]?.iconSrc : undefined
  })
  const iconSrc =
    node.type === 'folder'
      ? (node.iconSrc ?? '/images/icons/folder.webp')
      : isImageFile(node)
        ? node.src
        : (appIcon ?? '/images/icons/placeholder.webp')
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
    if (node.type === 'folder') {
      navigate([...path, node.name])
      return
    }
    const label = appForExtension(node.extension)
    if (!label) return
    openApp(label, { title: fileLabel(node) })
  }

  return (
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(5.5rem,1fr))] gap-2">
      {folder.children.map((node, i) => (
        <li key={nodeKey(node)}>
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
              {node.type === 'folder' ? localize(node.name) : fileLabel(node)}
            </span>
          </button>
        </li>
      ))}
    </ul>
  )
}
