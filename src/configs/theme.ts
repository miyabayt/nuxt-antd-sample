import { theme as antdTheme } from 'ant-design-vue'
import { reactive } from '#imports'

export const theme = reactive({
  algorithm: antdTheme.defaultAlgorithm,
  token: {
    colorPrimary: '#1677ff',
    borderRadius: 3,
    colorBorder: '#d0d7de',
    colorBorderSecondary: '#d0d7de',
  },
})
