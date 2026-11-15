import { NotificationMenu } from './menus/notification-menu'
import { ThemeMenu } from './menus/theme-menu'
import { UtilityMenu } from './menus/utility-menu'

function SystemTray() {
  return (
    <section className="*:hover-taskbar-effect absolute right-0 hidden h-full cursor-default items-stretch gap-2 rounded-xl px-3 py-0.5 align-middle text-primary-foreground select-none *:rounded-sm md:flex md:flex-row-reverse">
      <NotificationMenu />
      <UtilityMenu />
      <ThemeMenu />
    </section>
  )
}

export default SystemTray
