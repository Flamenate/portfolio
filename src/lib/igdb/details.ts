import { queryOptions, useQuery } from '@tanstack/react-query'
import { getGameDetails } from '@/lib/igdb/igdb'
import type { GameDetails } from '@/lib/igdb/igdb'
import { useNotificationStore } from '@/stores/notification.store'

export const gameDetailsQuery = queryOptions({
  queryKey: ['igdb', 'game-details'],
  staleTime: Infinity,
  gcTime: Infinity,
  retry: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  queryFn: async () => {
    try {
      return await getGameDetails()
    } catch (error) {
      console.error('[vapor] failed to load game details:', error)
      useNotificationStore.getState().addNotification({
        source: { label: 'vapor', iconSrc: '/media/icons/vapor.webp' },
        content: 'vapor_unavailable',
        subcontent: 'vapor_unavailable_description',
      })
      throw error
    }
  },
})

export function useGameDetails(name: string): {
  details: GameDetails | undefined
  loading: boolean
} {
  const query = useQuery({
    ...gameDetailsQuery,
    select: (details) => details[name],
  })

  return {
    details: query.data,
    loading: query.isPending || (query.isFetching && query.data === undefined),
  }
}
