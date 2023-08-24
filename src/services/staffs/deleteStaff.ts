import type { FetchOptions } from 'ofetch'
import { Staff } from '@/types/staff'
import fetcher from '@/utils/fetcher'

export const deleteStaff = async (
  id: string,
  options?: FetchOptions,
): Promise<Staff> => {
  return await fetcher(`/api/system/staff/${id}`, {
    method: 'DELETE',
    ...options,
  }).then(({ data }) => data?.data)
}
