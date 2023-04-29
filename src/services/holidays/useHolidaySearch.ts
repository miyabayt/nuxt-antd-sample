import dayjs from '@/utils/dayjs' // タイムゾーン設定済み
import fetcher from '@/utils/fetcher'

interface SearchHolidayParams {
  holidayName?: string
  holidayDate?: Date | string
  current?: number
  pageSize?: number
}

const useHolidaySearch = async (params?: SearchHolidayParams) => {
  const query = { ...params }
  if (params?.holidayDate) {
    query.holidayDate = dayjs(params.holidayDate)
      .tz()
      .format('YYYY-MM-DDTHH:mm:ss') // UTC→ローカル時間
  }

  const page = (query.current || 1) - 1
  const pageSize = query.pageSize || 20

  return await fetcher(
    `/api/system/holidays/search?page=${page}&size=${pageSize}`,
    {
      method: 'POST',
      body: query,
    },
  ).then(({ data }) => data)
}

export default useHolidaySearch
