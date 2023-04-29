import { saveAs } from 'file-saver'

import dayjs from '@/utils/dayjs' // タイムゾーン設定済み
import fetcher from '@/utils/fetcher'

interface SearchUserParams {
  userName?: string
  userDate?: Date | string
}

const exportUserCsv = (params?: SearchUserParams) => {
  const query = { ...params }
  if (params?.userDate) {
    query.userDate = dayjs(params.userDate).tz().format('YYYY-MM-DDTHH:mm:ss') // UTC→ローカル時間
  }

  const filename = '祝日.csv'
  return fetcher(`/api/user/users/export/${filename}`, {
    method: 'POST',
    body: query,
  }).then((response) => {
    const blob = new Blob([response.data], { type: 'text/csv' })
    saveAs(blob, filename)
  })
}

export default exportUserCsv
