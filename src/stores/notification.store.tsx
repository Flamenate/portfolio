import type { FluentIcon } from '@fluentui/react-icons/headless'
import { LaptopSettingsRegular } from '@fluentui/react-icons/headless/svg/laptop-settings'
import { create } from 'zustand/react'
import { toast } from '@/lib/toast'
import localize from '@/utils/localize'
import { useLogStore } from './log.store'
import useThemeStore from './theme.store'

export type Notification = {
  id: number
  timestamp: Date
  content: string
  subcontent?: string
  source: { iconSrc: string | FluentIcon; label: string }
}

type NotificationStore = {
  notifications: Notification[]
  addNotification: (
    notification: Omit<Notification, 'timestamp' | 'id'>,
  ) => void
  addSystemNotification: (
    notification: Omit<Notification, 'timestamp' | 'id' | 'source'>,
  ) => void
  clearNotifications: () => void
  clearNotificationsBySource: (sourceLabel: string) => void
  removeNotification: (id: number) => void
  doNotDisturb: boolean
  toggleDoNotDisturb: () => void
}

let lastId = 0

export const useNotificationStore = create<NotificationStore>()((set, get) => ({
  notifications: [],
  addNotification: (notification: Omit<Notification, 'timestamp' | 'id'>) => {
    if (!get().doNotDisturb) {
      const locale = useThemeStore.getState().locale
      toast({
        source: {
          label: localize(notification.source.label, locale),
          iconSrc: notification.source.iconSrc,
        },
        content: localize(`notifications_${notification.content}`, locale),
        ...(notification.subcontent
          ? {
              subcontent: localize(
                `notifications_${notification.subcontent}`,
                locale,
              ),
            }
          : {}),
      })
    }
    set((state) => ({
      notifications: [
        ...state.notifications,
        { ...notification, id: lastId++, timestamp: new Date() },
      ],
    }))
  },
  addSystemNotification: (
    notification: Omit<Notification, 'timestamp' | 'id' | 'source'>,
  ) => {
    get().addNotification({
      ...notification,
      source: { label: 'system', iconSrc: LaptopSettingsRegular },
    })
  },
  clearNotifications: () => {
    useLogStore.getState().logAction('clear_notifications')
    set({ notifications: [] })
  },
  clearNotificationsBySource: (sourceLabel: string) => {
    useLogStore
      .getState()
      .logAction('clear_notifications_by_source', sourceLabel)
    set((state) => ({
      notifications: state.notifications.filter(
        (n) => n.source.label !== sourceLabel,
      ),
    }))
  },
  removeNotification: (id: number) => {
    useLogStore.getState().logAction('remove_notification')
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }))
  },
  doNotDisturb: false,
  toggleDoNotDisturb: () => {
    useLogStore
      .getState()
      .logAction(get().doNotDisturb ? 'disable_dnd' : 'enable_dnd')
    set((state) => ({ doNotDisturb: !state.doNotDisturb }))
  },
}))

export default NotificationStore
