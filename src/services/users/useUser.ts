import { useQuery } from '@tanstack/vue-query'
import fetcher from '@/utils/fetcher'

export const useUser = (id: string) => {
  return useQuery({
    queryKey: ['users', `id=${id}`],
    queryFn: () =>
      fetcher(`/api/user/user/${id}`, {
        method: 'GET',
      }),
    select: (response) => response.data,
  })
}
