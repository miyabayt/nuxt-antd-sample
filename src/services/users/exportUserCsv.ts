import { saveAs } from 'file-saver'
import _ from 'lodash'
import fetcher from '@/utils/fetcher'

interface SearchUserParams {
  fullName: string | undefined
}

export const exportUserCsv = (params: Ref<SearchUserParams>) => {
  const query = _.omitBy({ ...params.value }, _.isEmpty)
  const filename = '顧客.csv'
  return fetcher(`/api/user/users/export/${filename}`, {
    method: 'POST',
    body: query,
  }).then((response) => {
    const blob = new Blob([response], { type: 'text/csv' })
    saveAs(blob, filename)
  })
}
