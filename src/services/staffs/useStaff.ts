import { useQuery } from '@tanstack/vue-query'
import fetcher from '@/utils/fetcher'

export const useStaff = (id: string) => {
  return useQuery({
    queryKey: ['staffs', `id=${id}`],
    queryFn: () =>
      fetcher(`/api/system/staff/${id}`, {
        method: 'GET',
      }),
    select: (response) => response.data,
  })
}
