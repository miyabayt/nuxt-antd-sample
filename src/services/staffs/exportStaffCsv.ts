import { saveAs } from 'file-saver'

import dayjs from '@/utils/dayjs' // タイムゾーン設定済み
import fetcher from '@/utils/fetcher'

interface SearchStaffParams {
  staffName?: string
  staffDate?: Date | string
}

const exportStaffCsv = (params?: SearchStaffParams) => {
  const query = { ...params }
  if (params?.staffDate) {
    query.staffDate = dayjs(params.staffDate).tz().format('YYYY-MM-DDTHH:mm:ss') // UTC→ローカル時間
  }

  const filename = '祝日.csv'
  return fetcher(`/api/system/staffs/export/${filename}`, {
    method: 'POST',
    body: query,
  }).then((response) => {
    const blob = new Blob([response.data], { type: 'text/csv' })
    saveAs(blob, filename)
  })
}

export default exportStaffCsv
