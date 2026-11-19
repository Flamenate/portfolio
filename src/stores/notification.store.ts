import type { FluentIcon } from '@fluentui/react-icons/headless'
import { LaptopSettingsRegular } from '@fluentui/react-icons/headless/svg/laptop-settings'
import { create } from 'zustand/react'
import type { TranslationKey, TranslationSuffix } from '@/lib/localize'
import { toast } from '@/lib/toast'
import { logAction } from './log.store'

export type Notification = {
  id: number
  timestamp: Date
  content: TranslationSuffix<'notifications'>
  subcontent?: TranslationSuffix<'notifications'>
  source: { iconSrc: string | FluentIcon; label: TranslationKey }
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
    if (!get().doNotDisturb) toast(notification)
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
    set({ notifications: [] })
    logAction('clear_notifications')
  },
  clearNotificationsBySource: (sourceLabel: string) => {
    set((state) => ({
      notifications: state.notifications.filter(
        (n) => n.source.label !== sourceLabel,
      ),
    }))
    logAction('clear_notifications_by_source', sourceLabel)
  },
  removeNotification: (id: number) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }))
    logAction('remove_notification')
  },
  doNotDisturb: false,
  toggleDoNotDisturb: () => {
    set((state) => ({ doNotDisturb: !state.doNotDisturb }))
    logAction(get().doNotDisturb ? 'enable_dnd' : 'disable_dnd')
  },
}))

export default useNotificationStore
