import type { FetchOptions } from 'ofetch'
import { User } from '@/types/user'
import fetcher from '@/utils/fetcher'

export const deleteUser = async (
  id: string,
  options?: FetchOptions,
): Promise<User> => {
  return await fetcher(`/api/user/users/${id}`, {
    method: 'DELETE',
    ...options,
  }).then(({ data }) => data?.data)
}
