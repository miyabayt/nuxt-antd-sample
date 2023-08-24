import { useQuery } from '@tanstack/vue-query'
import fetcher from '@/utils/fetcher'

export const useHoliday = (id: string) => {
  return useQuery({
    queryKey: ['holidays', `id=${id}`],
    queryFn: () =>
      fetcher(`/api/system/holiday/${id}`, {
        method: 'GET',
      }),
    select: (response) => response.data,
  })
}
