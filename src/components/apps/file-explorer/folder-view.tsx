import { useState } from 'react'
import { useAudio } from '@/hooks/useAudio'
import useLocale from '@/hooks/useLocale'
import { fileIconSrc, fileLabel } from '@/lib/directories'
import type {
  FileNode,
  FolderNode,
  FolderPath,
  FsNode,
} from '@/lib/directories'
import { openFile } from '@/lib/open-file'
import { isTouchInput } from '@/lib/pointer'
import { cn } from '@/lib/utils'
import { useExplorerStore } from '@/stores/explorer.store'
import { UnsupportedFileDialog } from './unsupported-file-dialog'

function nodeKey(node: FsNode) {
  return node.type === 'folder'
    ? `folder:${node.name}`
    : `file:${fileLabel(node)}`
}

function ItemIcon({ node }: { node: FsNode }) {
  const iconSrc =
    node.type === 'folder'
      ? (node.iconSrc ?? '/media/icons/folder.webp')
      : fileIconSrc(node)
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
  const locale = useLocale()
  const navigate = useExplorerStore((state) => state.navigate)
  const errorAudio = useAudio('/audio/error.wav')
  const [selected, setSelected] = useState<number | null>(null)
  const [unsupportedFile, setUnsupportedFile] = useState<FileNode | null>(null)

  if (folder.children.length === 0) {
    return (
      <p className="mt-6 text-center opacity-60">
        {locale.text('folder_empty')}
      </p>
    )
  }

  const open = (node: FsNode) => {
    if (node.type === 'folder') {
      navigate([...path, node.name])
      return
    }
    if (openFile({ ...node, path })) return
    setUnsupportedFile(node)
    errorAudio.play({ forceReplay: true })
  }

  return (
    <>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(5.5rem,1fr))] gap-2">
        {folder.children.map((node, i) => (
          <li key={nodeKey(node)}>
            <button
              type="button"
              className={cn(
                'flex w-full flex-col items-center gap-1 rounded-sm px-2 py-1 outline-accent-foreground hover:bg-accent/25 focus-visible:outline-1 dark:hover:bg-white/25',
                selected === i && 'bg-accent/30 dark:bg-white/40',
              )}
              onClick={() => {
                if (isTouchInput()) open(node)
                else setSelected(i)
              }}
              onDoubleClick={() => {
                if (!isTouchInput()) open(node)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') open(node)
              }}
            >
              <ItemIcon node={node} />
              <span className="w-full text-center wrap-break-word">
                {node.type === 'folder'
                  ? locale.text(node.name)
                  : fileLabel(node)}
              </span>
            </button>
          </li>
        ))}
      </ul>
      <UnsupportedFileDialog
        file={unsupportedFile}
        onClose={() => setUnsupportedFile(null)}
      />
    </>
  )
}
