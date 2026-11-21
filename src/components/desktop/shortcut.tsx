import { Image } from '@unpic/react'
import { m } from 'motion/react'
import { useMemo } from 'react'
import type { MouseEvent } from 'react'
import { root } from '@/data/directories'
import useLocalize from '@/hooks/useLocalize'
import type { AppLabel } from '@/lib/apps'
import { fileIconSrc, fileLabel, getFolder } from '@/lib/directories'
import type { FolderPath, LocatedFile } from '@/lib/directories'
import { cn } from '@/lib/utils'
import useAppStore from '@/stores/app.store'
import {
  useDesktopSelectionStore,
  useIsSelected,
} from '@/stores/desktop-selection.store'
import type { DesktopShortcut } from '@/stores/desktop-selection.store'
import DesktopShortcutContextMenu from './shortcut-context-menu'

type ContainerRef = React.RefObject<HTMLDivElement | null>

export function DesktopShortcutButton({
  shortcut,
  label,
  iconSrc,
  containerRef,
}: {
  shortcut: DesktopShortcut
  label: string
  iconSrc: string
  containerRef: ContainerRef
}) {
  const isSelected = useIsSelected(shortcut)
  const { click, contextClick, openShortcut } =
    useDesktopSelectionStore.getState()
  return (
    <DesktopShortcutContextMenu shortcut={shortcut}>
      <m.button
        drag
        draggable={false}
        dragMomentum={false}
        dragConstraints={containerRef}
        dragElastic={0.2}
        whileDrag={{
          scale: 1.1,
          rotateZ: 3,
        }}
        className={cn(
          'flex h-fit w-20 flex-col items-center justify-center gap-1 rounded-sm px-2 py-1 outline-accent-foreground hover:bg-white/25 focus-visible:bg-white/40 focus-visible:outline-1',
          isSelected && 'bg-white/40',
        )}
        onClick={(e: MouseEvent) => {
          e.stopPropagation()
          click(shortcut, { ctrl: e.ctrlKey })
        }}
        onDoubleClick={() => openShortcut(shortcut)}
        onContextMenu={() => contextClick(shortcut)}
        onKeyUp={(e) => e.preventDefault()}
      >
        <Image
          src={iconSrc}
          alt=""
          width={48}
          height={48}
          draggable={false}
          className="aspect-square object-contain"
        />
        <span className="text-center text-sm text-(--white) mix-blend-hard-light text-shadow-lg/55">
          {label}
        </span>
      </m.button>
    </DesktopShortcutContextMenu>
  )
}

export function AppShortcut({
  appLabel,
  containerRef,
}: {
  appLabel: AppLabel
  containerRef: ContainerRef
}) {
  const iconSrc = useAppStore((state) => state.apps[appLabel].iconSrc)
  const localize = useLocalize()
  const shortcut = useMemo<DesktopShortcut>(
    () => ({ kind: 'app', label: appLabel }),
    [appLabel],
  )
  return (
    <DesktopShortcutButton
      shortcut={shortcut}
      label={localize(appLabel)}
      iconSrc={iconSrc}

      containerRef={containerRef}
    />
  )
}

export function FolderShortcut({
  path,
  containerRef,
}: {
  path: FolderPath
  containerRef: ContainerRef
}) {
  const localize = useLocalize()
  const shortcut = useMemo<DesktopShortcut>(
    () => ({ kind: 'folder', path }),
    [path],
  )
  const name = path.at(-1) ?? root.name
  return (
    <DesktopShortcutButton
      shortcut={shortcut}
      label={localize(name)}
      iconSrc={getFolder(path)?.iconSrc ?? '/media/icons/folder.webp'}

      containerRef={containerRef}
    />
  )
}

export function FileShortcut({
  file,
  containerRef,
}: {
  file: LocatedFile
  containerRef: ContainerRef
}) {
  const shortcut = useMemo<DesktopShortcut>(
    () => ({ kind: 'file', file }),
    [file],
  )
  return (
    <DesktopShortcutButton
      shortcut={shortcut}
      label={fileLabel(file)}
      iconSrc={fileIconSrc(file)}

      containerRef={containerRef}
    />
  )
}
