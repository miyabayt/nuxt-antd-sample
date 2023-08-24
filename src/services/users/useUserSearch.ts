import { useQuery } from '@tanstack/vue-query'
import _ from 'lodash'
import fetcher from '@/utils/fetcher'
import { Pagination } from '@/types'

interface SearchUserParams {
  fullName: string | undefined
  email: string | undefined
  tel: string | undefined
}

export const useUserSearch = (
  params: Ref<SearchUserParams>,
  pagination: Ref<Pagination>,
) => {
  return useQuery({
    queryKey: ['users', { params, pagination }],
    queryFn: () => {
      const query = _.omitBy({ ...params.value }, _.isEmpty)
      const page = Math.max((pagination.value.current || 0) - 1, 0)
      const pageSize = pagination.value.pageSize || 20
      return fetcher(`/api/user/users/search?page=${page}&size=${pageSize}`, {
        method: 'POST',
        body: query,
      })
    },
  })
}
