import { User } from '@/types/user'
import fetcher from '@/utils/fetcher'

export type updateUserParams = {
  user: User
}

export const updateUser = async ({ user }: updateUserParams): Promise<User> => {
  return await fetcher(`/api/user/users/${user.id}`, {
    method: 'PUT',
    body: user,
  }).then(({ data }) => data)
}
