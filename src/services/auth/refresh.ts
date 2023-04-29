import { ofetch } from 'ofetch'
import { useAuthStore } from '@/stores/useAuthStore'

interface AccessToken {
  accessToken: string
  refreshToken: string
}

const refresh = (
  accessToken: string | null,
  refreshToken: string | null,
): Promise<{ data: AccessToken; success: boolean; message: string }> => {
  const authStore = useAuthStore()

  return ofetch('/api/auth/refresh', {
    method: 'POST',
    body: { accessToken, refreshToken },
  })
    .then((data) => {
      const { accessToken, refreshToken } = data?.data as AccessToken
      authStore.setAccessToken(accessToken)
      authStore.setRefreshToken(refreshToken)
      return data
    })
    .catch((error) => {
      authStore.setAccessToken(null)
      authStore.setRefreshToken(null)
      return Promise.reject(error)
    })
}

export default refresh
