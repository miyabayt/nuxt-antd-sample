import nProgress from 'nprogress'
import 'nprogress/nprogress.css'

export default defineNuxtPlugin((nuxtApp) => {
  nProgress.configure({ showSpinner: false })

  nuxtApp.hooks.hook('page:start', () => {
    nProgress.start()
  })
  nuxtApp.hooks.hook('page:finish', () => {
    nProgress.done()
  })
})
