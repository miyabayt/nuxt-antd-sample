import { ofetch } from 'ofetch'
import { useAuthStore } from '@/stores/useAuthStore'
import { isTokenExpired } from '@/utils/jwt'
import refresh from '@/services/auth/refresh'

const fetcher = ofetch.create({
  async onRequest({ options }) {
    const authStore = useAuthStore()
    const { accessToken, refreshToken } = authStore

    let newAccessToken = accessToken
    if (accessToken && refreshToken && isTokenExpired(accessToken)) {
      try {
        console.log('try to refresh token...')
        const { data, success } = await refresh(accessToken, refreshToken)
        if (success) {
          console.log('access token has been refreshed!')
          newAccessToken = data.accessToken
        }
      } catch (e) {
        console.log('failed to refresh token.')
      }
    }

    options.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${newAccessToken}`,
      ...options.headers,
    }
  },
})

export default fetcher
