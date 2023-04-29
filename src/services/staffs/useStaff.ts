import { useQuery } from '@tanstack/vue-query'
import fetcher from '@/utils/fetcher'

const useStaff = (id: string) => {
  return useQuery({
    queryKey: ['staff', id],
    queryFn: () =>
      fetcher(`/api/system/staff/${id}`, {
        method: 'GET',
      }),
    select: (response) => response.data,
  })
}

export default useStaff
