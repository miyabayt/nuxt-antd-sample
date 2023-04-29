import dayjs from '@/utils/dayjs' // タイムゾーン設定済み
import fetcher from '@/utils/fetcher'

interface SearchUserParams {
  userName?: string
  userDate?: Date | string
  current?: number
  pageSize?: number
}

const useUserSearch = async (params?: SearchUserParams) => {
  const query = { ...params }
  if (params?.userDate) {
    query.userDate = dayjs(params.userDate).tz().format('YYYY-MM-DDTHH:mm:ss') // UTC→ローカル時間
  }

  const page = (query.current || 1) - 1
  const pageSize = query.pageSize || 20

  return await fetcher(`/api/user/users/search?page=${page}&size=${pageSize}`, {
    method: 'POST',
    body: query,
  }).then(({ data }) => data)
}

export default useUserSearch
