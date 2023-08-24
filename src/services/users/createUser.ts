import { User } from '@/types/user'
import fetcher from '@/utils/fetcher'

export type createUserParams = {
  user: Omit<User, 'id'>
}

export const createUser = async ({ user }: createUserParams): Promise<User> => {
  return await fetcher(`/api/user/users`, {
    method: 'POST',
    body: user,
  }).then(({ data }) => data)
}
