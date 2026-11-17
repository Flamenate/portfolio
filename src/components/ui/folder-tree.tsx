import { FolderFilled } from '@fluentui/react-icons/headless/svg/folder'
import { FolderOpenFilled } from '@fluentui/react-icons/headless/svg/folder-open'
import type { ReactNode } from 'react'
import useLocalize from '@/hooks/useLocalize'
import { isSamePath, pathKey } from '@/lib/directories'
import type { FolderNode, FolderPath } from '@/lib/directories'
import { cn } from '@/lib/utils'

export type FolderTreeNode = {
  name: string
  path: FolderPath
  iconSrc?: string
  children: FolderTreeNode[]
}

export function folderTreeFrom(
  folder: FolderNode,
  path: FolderPath = [],
): FolderTreeNode {
  const subfolders = folder.children.filter(
    (child): child is FolderNode => child.type === 'folder',
  )
  return {
    name: folder.name,
    path,
    iconSrc: folder.iconSrc,
    children: subfolders.map((child) =>
      folderTreeFrom(child, [...path, child.name]),
    ),
  }
}

function DefaultFolderIcon({
  node,
  isCurrent,
}: {
  node: FolderTreeNode
  isCurrent: boolean
}) {
  if (node.iconSrc) {
    return (
      <img
        src={node.iconSrc}
        alt=""
        width={16}
        height={16}
        className="size-4 shrink-0 object-contain"
      />
    )
  }
  const Icon = isCurrent ? FolderOpenFilled : FolderFilled
  return <Icon className="size-4 shrink-0 text-amber-400" />
}

function FolderTreeRow({
  node,
  depth,
  currentPath,
  onSelect,
  renderIcon,
  rowClassName,
  indentBase,
}: {
  node: FolderTreeNode
  depth: number
  currentPath: FolderPath | null
  onSelect: (path: FolderPath) => void
  renderIcon?: (node: FolderTreeNode, isCurrent: boolean) => ReactNode
  rowClassName: string
  indentBase: number
}) {
  const localize = useLocalize()
  const isCurrent = currentPath !== null && isSamePath(node.path, currentPath)
  return (
    <li>
      <button
        type="button"
        aria-current={isCurrent ? 'page' : undefined}
        className={cn(
          'flex w-full cursor-pointer items-center rounded-sm text-left whitespace-nowrap',
          isCurrent ? 'bg-accent/30' : 'hover:bg-accent/20',
          rowClassName,
        )}
        style={{ paddingLeft: `${depth * 0.75 + indentBase}rem` }}
        onClick={() => onSelect(node.path)}
      >
        {renderIcon ? (
          renderIcon(node, isCurrent)
        ) : (
          <DefaultFolderIcon node={node} isCurrent={isCurrent} />
        )}
        <span className="truncate">{localize(node.name)}</span>
      </button>
      {node.children.length > 0 && (
        <ul>
          {node.children.map((child) => (
            <FolderTreeRow
              key={pathKey(child.path)}
              node={child}
              depth={depth + 1}
              currentPath={currentPath}
              onSelect={onSelect}
              renderIcon={renderIcon}
              rowClassName={rowClassName}
              indentBase={indentBase}
            />
          ))}
        </ul>
      )}
    </li>
  )
}

export function FolderTree({
  nodes,
  currentPath,
  onSelect,
  renderIcon,
  rowClassName = 'gap-1.5 p-1.5',
  indentBase = 0.25,
  children,
}: {
  nodes: FolderTreeNode[]
  currentPath: FolderPath | null
  onSelect: (path: FolderPath) => void
  renderIcon?: (node: FolderTreeNode, isCurrent: boolean) => ReactNode
  rowClassName?: string
  indentBase?: number
  children?: ReactNode
}) {
  return (
    <ul>
      {children}
      {nodes.map((node) => (
        <FolderTreeRow
          key={pathKey(node.path)}
          node={node}
          depth={0}
          currentPath={currentPath}
          onSelect={onSelect}
          renderIcon={renderIcon}
          rowClassName={rowClassName}
          indentBase={indentBase}
        />
      ))}
    </ul>
  )
}
