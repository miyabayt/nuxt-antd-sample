import { useLoginUser } from '@/composables/auth/useLoginUser'

export default defineNuxtRouteMiddleware(async (to, _from) => {
  if (to.path !== '/login') {
    const loginUser = await useLoginUser()

    if (!loginUser || !loginUser.id) {
      console.info('auth: redirect to /login')
      return navigateTo({ name: 'login' })
    }
  }
})
