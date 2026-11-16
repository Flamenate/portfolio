import { Image } from '@unpic/react'
import { m } from 'motion/react'
import { useCallback } from 'react'
import type { MouseEvent, ReactNode } from 'react'
import { useShallow } from 'zustand/react/shallow'
import useLocalize from '@/hooks/useLocalize'
import { getFolder, pathKey, root } from '@/lib/directories'
import type { FolderPath } from '@/lib/directories'
import useAppStore from '@/stores/app.store'
import { useExplorerStore } from '@/stores/explorer.store'
import DesktopShortcutContextMenu from './shortcut-context-menu'

type ContainerRef = React.RefObject<HTMLDivElement | null>

export function DesktopShortcut({
  id,
  appLabel,
  label,
  icon,
  onOpen,
  containerRef,
}: {
  id: string
  appLabel?: string
  label: string
  icon: ReactNode
  onOpen: () => void
  containerRef: ContainerRef
}) {
  const { selectedAppLabels, selectApp, unselectApp, clearSelectedApps } =
    useAppStore(
      useShallow((state) => ({
        selectedAppLabels: state.selectedAppLabels,
        selectApp: state.selectApp,
        unselectApp: state.unselectApp,
        clearSelectedApps: state.clearSelectedApps,
      })),
    )
  const isSelected = selectedAppLabels.includes(id)
  const handleSelection = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation()
      const withCtrlKey = e.ctrlKey
      if (
        (selectedAppLabels.length > 1 && isSelected && !withCtrlKey) ||
        !isSelected
      )
        selectApp(id, withCtrlKey)
      else if (withCtrlKey) unselectApp(id)
    },
    [id, selectedAppLabels, isSelected, selectApp, unselectApp],
  )
  const open = useCallback(() => {
    onOpen()
    clearSelectedApps()
  }, [onOpen, clearSelectedApps])
  return (
    <DesktopShortcutContextMenu appLabel={appLabel} onOpen={open}>
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
        className={`flex h-fit w-20 flex-col items-center justify-center gap-1 rounded-sm px-2 py-1 outline-accent-foreground hover:bg-white/25 focus-visible:bg-white/40 focus-visible:outline-1 ${isSelected ? 'bg-white/40' : ''}`}
        onClick={handleSelection}
        onDoubleClick={open}
        onContextMenu={() => {
          if (!isSelected) selectApp(id)
        }}
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
  appLabel: string
  containerRef: ContainerRef
}) {
  const iconSrc = useAppStore((state) => state.apps[appLabel].iconSrc)
  const openApp = useAppStore((state) => state.openApp)
  const localize = useLocalize()
  const open = useCallback(() => openApp(appLabel), [appLabel, openApp])
  return (
    <DesktopShortcut
      id={appLabel}
      appLabel={appLabel}
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
      onOpen={open}
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
  const openFolder = useExplorerStore((state) => state.openFolder)
  const localize = useLocalize()
  const open = useCallback(() => openFolder(path), [path, openFolder])
  const name = path.at(-1) ?? root.name
  return (
    <DesktopShortcut
      id={pathKey(path)}
      label={localize(name)}
      icon={
        <Image
          src={getFolder(path)?.iconSrc ?? '/images/folder.webp'}
          alt=""
          width={48}
          height={48}
          draggable={false}
          className="aspect-square object-contain"
        />
      }
      onOpen={open}
      containerRef={containerRef}
    />
  )
}
