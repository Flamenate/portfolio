import { DismissRegular } from '@fluentui/react-icons/headless/svg/dismiss'
import { DismissSquareMultipleRegular } from '@fluentui/react-icons/headless/svg/dismiss-square-multiple'
import { toast as sonnerToast } from 'sonner'
import { createLocale } from '@/lib/locale'
import type { Notification } from '@/stores/notification.store'
import useThemeStore from '@/stores/theme.store'

export const toast = (notification: Omit<Notification, 'id' | 'timestamp'>) => {
  const locale = createLocale(useThemeStore.getState().locale) //this is a design choice, we don't want this to be reactive.
  sonnerToast.custom(
    (id) => {
      return (
        <div className="relative min-w-80 rounded-sm border border-muted bg-popover px-5 py-4 font-noto text-sm leading-snug shadow-sm backdrop-blur-sm select-none dark:border-border dark:bg-accent-foreground/85">
          <div className="absolute top-1 right-2 flex flex-row-reverse gap-1">
            <button
              type="button"
              aria-label={locale.text('close')}
              className="cursor-pointer rounded-sm p-2 text-xs tracking-widest text-muted-foreground dark:text-(--white)"
              onClick={() => sonnerToast.dismiss(id)}
            >
              <DismissRegular className="size-3.5" />
            </button>
            <button
              type="button"
              aria-label={locale.text('clear_all')}
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
            {locale.text(notification.source.label)}
          </header>
          <p className="font-medium dark:text-(--white)">
            {locale.text(`notifications_${notification.content}`)}
          </p>
          {notification.subcontent && (
            <p className="text-muted-foreground dark:text-muted-foreground">
              {locale.text(`notifications_${notification.subcontent}`)}
            </p>
          )}
        </div>
      )
    },
    { duration: 5 * 1000 },
  )
}
