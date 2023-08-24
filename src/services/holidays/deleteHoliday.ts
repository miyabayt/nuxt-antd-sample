import type { FetchOptions } from 'ofetch'
import { Holiday } from '@/types/holiday'
import fetcher from '@/utils/fetcher'

export const deleteHoliday = async (
  id: string,
  options?: FetchOptions,
): Promise<Holiday> => {
  return await fetcher(`/api/system/holiday/${id}`, {
    method: 'DELETE',
    ...options,
  }).then(({ data }) => data?.data)
}
