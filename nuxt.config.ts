import { resolve } from 'path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'src',
  alias: {
    '@': resolve(__dirname, './src'),
  },
  modules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@ant-design-vue/nuxt',
  ],
  components: {
    dirs: [
      {
        path: '@/components',
        pathPrefix: false,
        extensions: ['vue', 'tsx'],
      },
    ],
  },
  css: ['@/assets/styles/globals.scss'],
  imports: {
    dirs: ['@/services/**', '@/utils/**'],
  },
  pinia: {
    autoImports: ['defineStore', ['defineStore', 'definePiniaStore']],
  },
  piniaPersistedstate: {
    storage: 'sessionStorage',
  },
  nitro: {
    devProxy: {
      '/api': {
        // https://github.com/http-party/node-http-proxy#options
        target: 'http://localhost:8080/api',
        changeOrigin: true,
      },
    },
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: '',
    },
  },
})
