import { queryOptions } from '@tanstack/react-query'
import { getRepos } from '@/lib/github/repos'
import { useNotificationStore } from '@/stores/notification.store'

export const reposQuery = queryOptions({
  queryKey: ['github', 'repos'],
  staleTime: Infinity,
  retry: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  queryFn: async () => {
    try {
      return await getRepos()
    } catch (error) {
      console.error('[vscope] failed to load repos:', error)
      useNotificationStore.getState().addNotification({
        source: { label: 'vscope', iconSrc: '/images/icons/vscope.webp' },
        content: 'vscope_unavailable',
        subcontent: 'vscope_unavailable_description',
      })
      throw error
    }
  },
})
