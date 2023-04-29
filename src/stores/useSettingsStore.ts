import { defineStore } from 'pinia'
import { Key } from 'ant-design-vue/lib/_util/type'

interface SettingsState {
  collapsed: boolean
  openKeys: Key[]
  activeMenuKeys: Key[]
}

export const useSettingsStore = defineStore('settings', {
  state: (): SettingsState => ({
    collapsed: false,
    openKeys: [],
    activeMenuKeys: [],
  }),
  actions: {
    setCollapsed(collapsed: boolean): void {
      this.collapsed = collapsed
    },
    setOpenKeys(openKeys: Key[]): void {
      this.openKeys = openKeys
    },
    setActiveMenuKeys(activeMenuKeys: Key[]): void {
      this.activeMenuKeys = activeMenuKeys
    },
  },
})
