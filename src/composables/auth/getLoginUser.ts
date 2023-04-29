import { useAuthStore } from '@/stores/useAuthStore'
import { LoginUser } from '@/types/loginUser'

const getLoginUser = (): Promise<{
  data: LoginUser
  success: boolean
  message: string
}> => {
  const authStore = useAuthStore()

  return fetcher('/api/auth/me', {
    method: 'GET',
  })
    .then((data) => {
      authStore.setLoginUser(data?.data)
      return data
    })
    .catch((_error) => {
      authStore.setLoginUser(null)
      return { data: null, success: false }
    })
}

export default getLoginUser
