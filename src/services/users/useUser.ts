import { useQuery } from '@tanstack/vue-query'
import fetcher from '@/utils/fetcher'

const useUser = (id: string) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () =>
      fetcher(`/api/user/user/${id}`, {
        method: 'GET',
      }),
    select: (response) => response.data,
  })
}

export default useUser
