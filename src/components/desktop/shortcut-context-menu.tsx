import { DeleteRegular } from '@fluentui/react-icons/headless/svg/delete'
import { OpenRegular } from '@fluentui/react-icons/headless/svg/open'
import { PinRegular } from '@fluentui/react-icons/headless/svg/pin'
import { PinOffRegular } from '@fluentui/react-icons/headless/svg/pin-off'
import { ShieldRegular } from '@fluentui/react-icons/headless/svg/shield'
import { WrenchRegular } from '@fluentui/react-icons/headless/svg/wrench'
import { useShallow } from 'zustand/react/shallow'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'
import useLocale from '@/hooks/useLocale'
import { useAppStore } from '@/stores/app.store'
import { useDesktopSelectionStore } from '@/stores/desktop-selection.store'
import type { DesktopShortcut } from '@/stores/desktop-selection.store'

export function DesktopShortcutContextMenu({
  shortcut,
  children,
  ...props
}: React.ComponentProps<typeof ContextMenuTrigger> & {
  shortcut: DesktopShortcut
}) {
  const appLabel = shortcut.kind === 'app' ? shortcut.label : undefined
  const { pinned, pinApp, unpinApp } = useAppStore(
    useShallow((state) => ({
      pinned: appLabel ? state.apps[appLabel].pinned : false,
      pinApp: state.pinApp,
      unpinApp: state.unpinApp,
    })),
  )
  const locale = useLocale()

  return (
    <ContextMenu modal={false}>
      <ContextMenuTrigger asChild {...props}>
        {children}
      </ContextMenuTrigger>
      {/* Portal events still bubble through the React tree to the desktop,
          which clears the selection on click and opens it on Enter. */}
      <ContextMenuContent
        className="z-120 *:pr-16"
        onClick={(event) => event.stopPropagation()}
        onKeyUp={(event) => event.stopPropagation()}
      >
        <ContextMenuItem
          onSelect={() =>
            useDesktopSelectionStore.getState().openShortcut(shortcut)
          }
        >
          <OpenRegular />
          {locale.text('open')}
        </ContextMenuItem>
        <ContextMenuItem disabled>
          <ShieldRegular />
          {locale.text('run_as_administrator')}
        </ContextMenuItem>
        {appLabel && (
          <>
            <ContextMenuSeparator />
            {pinned ? (
              <ContextMenuItem onSelect={() => unpinApp(appLabel)}>
                <PinOffRegular />
                {locale.text('unpin_from_taskbar')}
              </ContextMenuItem>
            ) : (
              <ContextMenuItem onSelect={() => pinApp(appLabel)}>
                <PinRegular />
                {locale.text('pin_to_taskbar')}
              </ContextMenuItem>
            )}
          </>
        )}
        <ContextMenuSeparator />
        <ContextMenuItem disabled>
          <DeleteRegular />
          {locale.text('delete')}
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>
          <WrenchRegular />
          {locale.text('properties')}
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export default DesktopShortcutContextMenu
