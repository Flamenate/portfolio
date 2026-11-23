import { DismissRegular } from '@fluentui/react-icons/headless/svg/dismiss'
import { PinRegular } from '@fluentui/react-icons/headless/svg/pin'
import { PinOffRegular } from '@fluentui/react-icons/headless/svg/pin-off'
import { useShallow } from 'zustand/react/shallow'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'
import useLocale from '@/hooks/useLocale'
import { appTitle } from '@/lib/apps'
import type { AppLabel } from '@/lib/apps'
import { useAppStore } from '@/stores/app.store'

// Radix anchors the menu to the contextmenu event's coordinates, so they are
// moved to the shortcut's center on the taskbar's top edge.
function anchorAboveTaskbar(event: React.MouseEvent<HTMLElement>) {
  const shortcut = event.currentTarget.getBoundingClientRect()
  const taskbar = event.currentTarget.closest('footer')?.getBoundingClientRect()
  Object.assign(event, {
    clientX: shortcut.left + shortcut.width / 2,
    clientY: taskbar?.top ?? shortcut.top,
  })
}

export function ShortcutContextMenu({
  appLabel,
  children,
  onContextMenu,
  ...props
}: React.ComponentProps<typeof ContextMenuTrigger> & {
  appLabel: AppLabel
}) {
  const { app, openApp, pinApp, unpinApp, closeApp } = useAppStore(
    useShallow((state) => ({
      app: state.apps[appLabel],
      openApp: state.openApp,
      pinApp: state.pinApp,
      unpinApp: state.unpinApp,
      closeApp: state.closeApp,
    })),
  )
  const locale = useLocale()

  return (
    <ContextMenu modal={false}>
      <ContextMenuTrigger
        asChild
        onContextMenu={(event) => {
          onContextMenu?.(event)
          anchorAboveTaskbar(event)
        }}
        {...props}
      >
        {children}
      </ContextMenuTrigger>
      <ContextMenuContent
        side="top"
        align="center"
        sideOffset={8}
        className="z-120 *:pr-16"
      >
        <ContextMenuItem onSelect={() => openApp(appLabel)}>
          <img
            src={app.iconSrc}
            alt=""
            width="16"
            height="16"
            className="size-4 object-contain"
            draggable="false"
          />
          {appTitle(appLabel, locale)}
        </ContextMenuItem>
        <ContextMenuSeparator />
        {app.pinned ? (
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
        {app.state !== 'closed' && (
          <ContextMenuItem onSelect={() => closeApp(appLabel)}>
            <DismissRegular />
            {locale.text('close_app')}
          </ContextMenuItem>
        )}
      </ContextMenuContent>
    </ContextMenu>
  )
}

export default ShortcutContextMenu
