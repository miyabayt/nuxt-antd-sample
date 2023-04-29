import { ofetch } from 'ofetch'
import { useAuthStore } from '@/stores/useAuthStore'

const logout = (
  accessToken: string | null,
  refreshToken: string | null,
): Promise<any> => {
  const authStore = useAuthStore()
  const clearAuth = (data: any) => {
    authStore.setAccessToken(null)
    authStore.setRefreshToken(null)
    authStore.setLoginUser(null)
    return Promise.resolve(data)
  }

  return ofetch('/api/auth/logout', {
    method: 'POST',
    body: { accessToken, refreshToken },
  })
    .then((data) => {
      return clearAuth(data)
    })
    .catch((error) => {
      if (error.status < 500) {
        return clearAuth(error)
      }

      return Promise.reject(error)
    })
}

export default logout
