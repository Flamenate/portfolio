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
import useLocalize from '@/hooks/useLocalize'
import { useAppStore } from '@/stores/app.store'

export function DesktopShortcutContextMenu({
  appLabel,
  onOpen,
  children,
  ...props
}: React.ComponentProps<typeof ContextMenuTrigger> & {
  appLabel?: string
  onOpen: () => void
}) {
  const { pinned, pinApp, unpinApp } = useAppStore(
    useShallow((state) => ({
      pinned: appLabel ? state.apps[appLabel].pinned : false,
      pinApp: state.pinApp,
      unpinApp: state.unpinApp,
    })),
  )
  const localize = useLocalize()

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
        <ContextMenuItem onSelect={onOpen}>
          <OpenRegular />
          {localize('open')}
        </ContextMenuItem>
        <ContextMenuItem disabled>
          <ShieldRegular />
          {localize('run_as_administrator')}
        </ContextMenuItem>
        {appLabel && (
          <>
            <ContextMenuSeparator />
            {pinned ? (
              <ContextMenuItem onSelect={() => unpinApp(appLabel)}>
                <PinOffRegular />
                {localize('unpin_from_taskbar')}
              </ContextMenuItem>
            ) : (
              <ContextMenuItem onSelect={() => pinApp(appLabel)}>
                <PinRegular />
                {localize('pin_to_taskbar')}
              </ContextMenuItem>
            )}
          </>
        )}
        <ContextMenuSeparator />
        <ContextMenuItem disabled>
          <DeleteRegular />
          {localize('delete')}
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>
          <WrenchRegular />
          {localize('properties')}
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export default DesktopShortcutContextMenu
