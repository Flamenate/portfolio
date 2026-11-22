import { NotificationMenu } from './menus/notification-menu'
import { ThemeMenu } from './menus/theme-menu'
import { UtilityMenu } from './menus/utility-menu'

function SystemTray() {
  return (
    <section className="col-start-3 flex h-full shrink-0 cursor-default flex-row-reverse items-stretch gap-2 justify-self-end rounded-xl px-3 py-0.5 align-middle text-primary-foreground select-none *:rounded-sm *:hover-taskbar-effect compact:gap-0.5 compact:px-0">
      <NotificationMenu />
      <UtilityMenu />
      <ThemeMenu />
    </section>
  )
}

export default SystemTray
