import { ofetch } from 'ofetch'
import { useAuthStore } from '@/stores/useAuthStore'

interface AccessToken {
  accessToken: string
  refreshToken: string
}

const login = (
  username: string,
  password: string,
): Promise<{ data: AccessToken; success: boolean; message: string }> => {
  const authStore = useAuthStore()

  return ofetch('/api/auth/login', {
    method: 'POST',
    body: {
      username,
      password,
    },
  }).then((data) => {
    const { accessToken, refreshToken } = data?.data as AccessToken
    authStore.setAccessToken(accessToken)
    authStore.setRefreshToken(refreshToken)
    console.log('accessToken: ' + accessToken)
    return data
  })
}

export default login
