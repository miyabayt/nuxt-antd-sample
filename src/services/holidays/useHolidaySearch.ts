import { useQuery } from '@tanstack/vue-query'
import _ from 'lodash'
import fetcher from '@/utils/fetcher'
import { Pagination } from '@/types'

interface SearchHolidayParams {
  holidayName: string | undefined
  holidayDate: string | undefined
}

export const useHolidaySearch = (
  params: Ref<SearchHolidayParams>,
  pagination: Ref<Pagination>,
) => {
  return useQuery({
    queryKey: ['holidays', { params, pagination }],
    queryFn: () => {
      const query = _.omitBy({ ...params.value }, _.isEmpty)
      if (params.value.holidayDate) {
        query.holidayDate = dayjs(params.value.holidayDate)
          .tz()
          .format('YYYY-MM-DD') // UTC→ローカル時間
      }
      const page = Math.max((pagination.value.current || 0) - 1, 0)
      const pageSize = pagination.value.pageSize || 20
      return fetcher(
        `/api/system/holidays/search?page=${page}&size=${pageSize}`,
        {
          method: 'POST',
          body: query,
        },
      )
    },
  })
}
