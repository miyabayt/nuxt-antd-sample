import { useQuery } from '@tanstack/vue-query'
import fetcher from '@/utils/fetcher'

const useHoliday = (id: string) => {
  return useQuery({
    queryKey: ['holiday', id],
    queryFn: () =>
      fetcher(`/api/system/holiday/${id}`, {
        method: 'GET',
      }),
    select: (response) => response.data,
  })
}

export default useHoliday
