import { Image } from '@unpic/react'
import { m } from 'motion/react'
import { useMemo } from 'react'
import type { MouseEvent, ReactNode } from 'react'
import { root } from '@/data/directories'
import useLocalize from '@/hooks/useLocalize'
import type { AppLabel } from '@/lib/apps'
import { getFolder } from '@/lib/directories'
import type { FolderPath } from '@/lib/directories'
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
  icon,
  containerRef,
}: {
  shortcut: DesktopShortcut
  label: string
  icon: ReactNode
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
        {icon}
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
      icon={
        <Image
          src={iconSrc}
          alt=""
          width={48}
          height={48}
          draggable={false}
          className="aspect-square object-contain"
        />
      }
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
      icon={
        <Image
          src={getFolder(path)?.iconSrc ?? '/media/icons/folder.webp'}
          alt=""
          width={48}
          height={48}
          draggable={false}
          className="aspect-square object-contain"
        />
      }
      containerRef={containerRef}
    />
  )
}
