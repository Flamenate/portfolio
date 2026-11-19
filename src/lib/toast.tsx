import { DismissRegular } from '@fluentui/react-icons/headless/svg/dismiss'
import { DismissSquareMultipleRegular } from '@fluentui/react-icons/headless/svg/dismiss-square-multiple'
import { toast as sonnerToast } from 'sonner'
import type { Notification } from '@/stores/notification.store'
import useThemeStore from '@/stores/theme.store'
import localize from '@/utils/localize'

export const toast = (notification: Omit<Notification, 'id' | 'timestamp'>) => {
  const locale = useThemeStore.getState().locale
  sonnerToast.custom(
    (id) => {
      return (
        <div className="relative min-w-80 rounded-sm border border-muted bg-popover px-5 py-4 font-noto text-sm leading-snug shadow-sm backdrop-blur-sm select-none dark:border-border dark:bg-accent-foreground/85">
          <div className="absolute top-1 right-2 flex flex-row-reverse gap-1">
            <button
              type="button"
              aria-label={localize('close', locale)}
              className="cursor-pointer rounded-sm p-2 text-xs tracking-widest text-muted-foreground dark:text-(--white)"
              onClick={() => sonnerToast.dismiss(id)}
            >
              <DismissRegular className="size-3.5" />
            </button>
            <button
              type="button"
              aria-label={localize('clear_all', locale)}
              className="cursor-pointer rounded-sm p-2 text-xs tracking-widest text-muted-foreground dark:text-(--white)"
              onClick={() => sonnerToast.dismiss()}
            >
              <DismissSquareMultipleRegular className="size-3.5" />
            </button>
          </div>

          <header className="mb-2 flex gap-1.5 text-[11px] dark:text-(--white)">
            {typeof notification.source.iconSrc === 'string' ? (
              <img
                src={notification.source.iconSrc}
                alt=""
                className="size-4"
                width="16"
                height="16"
              />
            ) : (
              <notification.source.iconSrc className="size-4" />
            )}
            {localize(notification.source.label, locale)}
          </header>
          <p className="font-medium dark:text-(--white)">
            {localize(`notifications_${notification.content}`, locale)}
          </p>
          {notification.subcontent && (
            <p className="text-muted-foreground dark:text-muted-foreground">
              {localize(`notifications_${notification.subcontent}`, locale)}
            </p>
          )}
        </div>
      )
    },
    { duration: 5 * 1000 },
  )
}
