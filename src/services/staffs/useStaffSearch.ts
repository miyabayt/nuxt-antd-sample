import dayjs from '@/utils/dayjs' // タイムゾーン設定済み
import fetcher from '@/utils/fetcher'

interface SearchStaffParams {
  staffName?: string
  staffDate?: Date | string
  current?: number
  pageSize?: number
}

const useStaffSearch = async (params?: SearchStaffParams) => {
  const query = { ...params }
  if (params?.staffDate) {
    query.staffDate = dayjs(params.staffDate).tz().format('YYYY-MM-DDTHH:mm:ss') // UTC→ローカル時間
  }

  const page = (query.current || 1) - 1
  const pageSize = query.pageSize || 20

  return await fetcher(
    `/api/system/staffs/search?page=${page}&size=${pageSize}`,
    {
      method: 'POST',
      body: query,
    },
  ).then(({ data }) => data)
}

export default useStaffSearch
