import { AlertFilled } from '@fluentui/react-icons/headless/svg/alert'
import { AlertOffRegular } from '@fluentui/react-icons/headless/svg/alert-off'
import { ChevronDownRegular } from '@fluentui/react-icons/headless/svg/chevron-down'
import { ChevronUpRegular } from '@fluentui/react-icons/headless/svg/chevron-up'
import { DismissRegular } from '@fluentui/react-icons/headless/svg/dismiss'
import { format, formatDistanceToNow } from 'date-fns'
import type { Locale } from 'date-fns'
import { AnimatePresence, motion } from 'motion/react'
import { forwardRef, useState } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import useDatetime from '@/hooks/useDatetime'
import useLocalize from '@/hooks/useLocalize'
import type { Notification as Notif } from '@/stores/notification.store'
import { useNotificationStore } from '@/stores/notification.store'
import useThemeStore, { datefnsLocales } from '@/stores/theme.store'

const Notification = forwardRef(function (
  {
    notification,
    locale,
    removeNotification,
  }: {
    notification: Notif
    locale: Locale
    removeNotification: (id: number) => void
  },
  ref: React.ForwardedRef<HTMLElement>,
) {
  const localize = useLocalize()
  return (
    <motion.article
      layout
      ref={ref}
      key={notification.id}
      drag="x"
      dragConstraints={{ left: 0 }}
      dragMomentum={false}
      dragSnapToOrigin
      dragElastic={0.05}
      onDragEnd={(_, pan) => {
        if (pan.offset.x > 150) {
          removeNotification(notification.id)
        }
      }}
      className="group relative rounded-sm bg-(--white) px-2 pt-2 pb-3 leading-relaxed shadow-sm dark:bg-accent-foreground/30"
      exit={{ x: 350 }}
    >
      <button
        type="button"
        aria-label={localize('close')}
        className="absolute top-0 right-1 hidden cursor-pointer rounded-sm px-2 py-1 text-primary group-hover:inline-block dark:text-muted-foreground"
        onClick={() => removeNotification(notification.id)}
      >
        {' '}
        <DismissRegular className="size-3.5" />
      </button>
      <p className="mb-2 text-xs text-muted-foreground">
        {formatDistanceToNow(notification.timestamp, {
          addSuffix: true,
          locale,
        })}
      </p>
      <div className="flex items-center gap-3">
        <div className="flex aspect-square size-11 items-center justify-center rounded-full border bg-accent/25 p-1 dark:bg-accent-foreground">
          {typeof notification.source.iconSrc === 'string' ? (
            <img
              src={notification.source.iconSrc}
              alt=""
              className="aspect-square size-7 object-contain"
              width="32"
              height="32"
            />
          ) : (
            <notification.source.iconSrc className="size-8" />
          )}
        </div>

        <div>
          <p className="text-sm font-medium">
            {localize(`notifications_${notification.content}`)}
          </p>
          {notification.subcontent && (
            <p className="text-sm text-muted-foreground">
              {localize(`notifications_${notification.subcontent}`)}
            </p>
          )}
        </div>
      </div>
    </motion.article>
  )
})

const NotificationPanelContent = ({
  locale,
  localize,
}: {
  locale: keyof typeof datefnsLocales
  localize: ReturnType<typeof useLocalize>
}) => {
  const notificationStore = useNotificationStore()
  const notificationsBySource = Map.groupBy(
    notificationStore.notifications,
    (n) => n.source.label,
  )
  return (
    <>
      <header className="flex justify-between">
        <span>{localize('notifications')}</span>
        <div className="inline-flex gap-2">
          <button
            type="button"
            aria-label={localize('dnd')}
            className={`${notificationStore.doNotDisturb ? 'bg-accent/75 text-accent' : 'dark:bg-accent-foreground/30'} rounded-sm border bg-(--white) hover-shade px-2 py-1 text-xs`}
            onClick={notificationStore.toggleDoNotDisturb}
          >
            <AlertOffRegular className="size-3.5" />
          </button>
          {notificationStore.notifications.length > 0 && (
            <button
              className="rounded-sm border bg-(--white) hover-shade px-2 py-1 text-xs dark:bg-accent-foreground/30"
              onClick={notificationStore.clearNotifications}
            >
              {localize('clear_all')}
            </button>
          )}
        </div>
      </header>
      <AnimatePresence>
        {notificationStore.doNotDisturb && (
          <motion.div
            initial={{ filter: 'blur(2px)', opacity: 0, height: 0 }}
            animate={{ filter: 'blur(0px)', opacity: 1, height: 'auto' }}
            exit={{ filter: 'blur(2px)', opacity: 0, height: 0 }}
            className="flex items-center gap-3"
          >
            <AlertOffRegular className="size-5 min-w-5 grow" />
            <div className="shrink grow-0 text-sm">
              <p className="font-bold">{localize('dnd_enabled')}</p>
              <p className="text-xs text-muted-foreground">
                {localize('dnd_description')}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-h-full grow space-y-5 overflow-x-clip overflow-y-auto">
        <AnimatePresence propagate mode="popLayout">
          {Array.from(notificationsBySource, ([sourceLabel, notifications]) => (
            <motion.section
              layout
              key={sourceLabel}
              className="flex flex-col gap-1.5"
              // initial={{ x: -100 }}
              animate={{ x: 0 }}
              exit={{ x: 350 }}
            >
              <div className="group relative flex max-h-min items-start gap-2">
                <div className="relative size-4.5 shrink-0">
                  {typeof notifications[0].source.iconSrc === 'string' ? (
                    <img
                      src={notifications[0].source.iconSrc}
                      alt=""
                      className="absolute inset-0 size-full object-contain"
                    />
                  ) : (
                    (() => {
                      const IconComponent = notifications[0].source.iconSrc
                      return (
                        <IconComponent
                          className="absolute inset-0 size-full"
                          style={{ width: '100%', height: '100%' }}
                        />
                      )
                    })()
                  )}
                </div>

                <h2 className="pb-1 text-sm font-medium">
                  {localize(sourceLabel)}
                </h2>
                <button
                  type="button"
                  aria-label={localize('close')}
                  className="absolute top-0 right-1 hidden cursor-pointer rounded-sm text-primary group-hover:inline-block dark:text-muted-foreground"
                  onClick={() =>
                    notificationStore.clearNotificationsBySource(sourceLabel)
                  }
                >
                  {' '}
                  <DismissRegular className="size-3.5" />
                </button>
              </div>

              <AnimatePresence mode="popLayout">
                {notifications.map((notification) => (
                  <Notification
                    key={notification.id}
                    notification={notification}
                    locale={datefnsLocales[locale]}
                    removeNotification={notificationStore.removeNotification}
                  />
                ))}
              </AnimatePresence>
            </motion.section>
          ))}
        </AnimatePresence>
      </div>
    </>
  )
}

export function NotificationMenu() {
  const localize = useLocalize()
  const [showCalendar, setShowCalendar] = useState(true)
  const datetime = useDatetime()
  const locale = useThemeStore((state) => state.locale)
  const { doNotDisturb, notificationCount } = useNotificationStore(
    useShallow((state) => ({
      doNotDisturb: state.doNotDisturb,
      notificationCount: state.notifications.length,
    })),
  )
  return (
    <Popover>
      <Tooltip>
        <PopoverTrigger asChild>
          <TooltipTrigger asChild>
            <button
              type="button"
              className="flex flex-row-reverse items-center"
              aria-label={localize('notifications')}
            >
              {doNotDisturb ? (
                <AlertOffRegular className="size-4.5" />
              ) : notificationCount > 0 ? (
                <AlertFilled className="size-4.5" />
              ) : null}
              <div
                className="flex flex-col items-end justify-center px-2 py-1 text-sm"
                suppressHydrationWarning
              >
                <span suppressHydrationWarning>
                  {format(datetime, 'p', { locale: datefnsLocales[locale] })}
                </span>
                <span suppressHydrationWarning>
                  {format(datetime, 'P', { locale: datefnsLocales[locale] })}
                </span>
              </div>
            </button>
          </TooltipTrigger>
        </PopoverTrigger>
        <TooltipContent>
          <p>
            {format(datetime, 'PPPP', { locale: datefnsLocales[locale] })}
            <br />
            {format(datetime, 'p', { locale: datefnsLocales[locale] })} (
            {localize('local_time')})
          </p>
        </TooltipContent>
      </Tooltip>
      <PopoverContent
        sideOffset={12}
        className={`mr-1.5 max-h-[calc(100dvh-80px)] w-[320px] max-w-[320px] overflow-hidden border-none bg-transparent`}
        asChild
      >
        {/* This could be achieved without motion.div, using interpolate-size, but firefox. */}
        <motion.div
          animate={{
            height: notificationCount > 0 ? 'calc(100dvh - 80px)' : 'auto',
          }}
          className="flex max-h-[calc(100dvh-80px)] origin-bottom flex-col gap-3"
        >
          <div className="flex min-h-40 grow flex-col gap-4 overflow-hidden rounded-md border bg-popover/70 px-3 py-2">
            <NotificationPanelContent locale={locale} localize={localize} />
          </div>

          <div className="flex min-h-min flex-col rounded-md border bg-popover/70">
            <div className="flex items-center justify-between border-b bg-popover py-4 pr-3 pl-5 text-sm">
              <p>
                {format(datetime, 'PPPP', { locale: datefnsLocales[locale] })}
              </p>
              <button
                type="button"
                aria-expanded={showCalendar}
                aria-label={localize('notifications')}
                className="inline-flex items-center justify-center rounded-sm border bg-accent/20 hover-shade p-1"
                onClick={() => setShowCalendar((prev) => !prev)}
              >
                {showCalendar ? (
                  <ChevronDownRegular className="size-4" />
                ) : (
                  <ChevronUpRegular className="size-4" />
                )}
              </button>
            </div>

            <AnimatePresence initial={false}>
              {showCalendar && (
                <motion.div
                  exit={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  initial={{ height: 0 }}
                >
                  <Calendar
                    mode="single"
                    className="w-full"
                    selected={datetime}
                    locale={datefnsLocales[locale]}
                    weekStartsOn={1}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </PopoverContent>
    </Popover>
  )
}
