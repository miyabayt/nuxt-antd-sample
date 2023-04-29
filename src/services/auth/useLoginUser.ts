import getLoginUser from '@/services/auth/getLoginUser'
import { LoginUser } from '@/types/loginUser'

export const useLoginUser = async (): Promise<LoginUser> => {
  const { data: loginUser } = await getLoginUser()
  return loginUser
}
