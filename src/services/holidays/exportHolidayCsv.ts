import { saveAs } from 'file-saver'
import _ from 'lodash'
import dayjs from '@/utils/dayjs' // タイムゾーン設定済み
import fetcher from '@/utils/fetcher'

interface SearchHolidayParams {
  holidayName: string | undefined
  holidayDate: string | undefined
}

export const exportHolidayCsv = (params: Ref<SearchHolidayParams>) => {
  const query = _.omitBy({ ...params.value }, _.isEmpty)
  if (query.holidayDate) {
    query.holidayDate = dayjs(query.holidayDate).tz().format('YYYY-MM-DD') // UTC→ローカル時間
  }

  const filename = '祝日.csv'
  return fetcher(`/api/system/holidays/export/${filename}`, {
    method: 'POST',
    body: query,
  }).then((response) => {
    const blob = new Blob([response], { type: 'text/csv' })
    saveAs(blob, filename)
  })
}
