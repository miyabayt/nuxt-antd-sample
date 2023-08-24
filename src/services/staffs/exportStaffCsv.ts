import { saveAs } from 'file-saver'
import _ from 'lodash'
import fetcher from '@/utils/fetcher'

interface SearchStaffParams {
  fullName: string | undefined
}

export const exportStaffCsv = (params: Ref<SearchStaffParams>) => {
  const query = _.omitBy({ ...params.value }, _.isEmpty)
  const filename = '担当者.csv'
  return fetcher(`/api/system/staffs/export/${filename}`, {
    method: 'POST',
    body: query,
  }).then((response) => {
    const blob = new Blob([response], { type: 'text/csv' })
    saveAs(blob, filename)
  })
}
