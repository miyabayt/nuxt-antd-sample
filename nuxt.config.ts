import { resolve } from 'path'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import { antdTheme } from './src/configs/theme'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'src',
  alias: {
    '@': resolve(__dirname, './src'),
  },
  typescript: {
    tsConfig: {
      compilerOptions: {
        types: ['unplugin-icons/types/vue'],
      },
    },
  },
  modules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    'unplugin-icons/nuxt',
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
  imports: {
    dirs: ['@/services/**', '@/utils/**'],
  },
  build: {
    transpile: ['@ant-design/icons-vue'],
  },
  pinia: {
    autoImports: ['defineStore', ['defineStore', 'definePiniaStore']],
  },
  piniaPersistedstate: {
    storage: 'sessionStorage',
  },
  vite: {
    ssr: {
      noExternal: ['ant-design-vue', '@ant-design/icons-vue', 'dayjs'],
    },
    plugins: [
      Components({
        resolvers: [
          IconsResolver({
            prefix: 'Icon',
          }),
          AntDesignVueResolver({ resolveIcons: true, importStyle: 'less' }),
        ],
        dts: 'types/components.d.ts',
      }),
      Icons(),
    ],
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          // https://www.antdv.com/docs/vue/customize-theme/#Ant-Design-Vue-Less-variables
          modifyVars: antdTheme(),
        },
      },
    },
  },
  nitro: {
    devProxy: {
      '/api': {
        // https://github.com/http-party/node-http-proxy#options
        target: 'http://172.28.64.1:8080/api',
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
