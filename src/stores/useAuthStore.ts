import { defineStore } from 'pinia'
import { LoginUser } from '@/types/loginUser'

interface AuthState {
  accessToken: string | null
  refreshToken: string | null
  loginUser: LoginUser | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    accessToken: null,
    refreshToken: null,
    loginUser: null,
  }),
  getters: {
    isAuthenticated(): boolean {
      return !!this.loginUser && !!this.accessToken
    },
  },
  actions: {
    setAccessToken(accessToken: string | null): void {
      this.accessToken = accessToken
    },
    setRefreshToken(refreshToken: string | null): void {
      this.refreshToken = refreshToken
    },
    setLoginUser(loginUser: LoginUser | null): void {
      this.loginUser = loginUser
    },
  },
})
