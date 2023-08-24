<template>
  <ALayoutSider
    :trigger="null"
    collapsible
    :collapsed="collapsed"
    theme="light"
    class="sider"
    width="250"
    collapsed-width="50"
  >
    <AppLogo />
    <div class="menu-container">
      <AMenu
        mode="inline"
        theme="light"
        :force-sub-menu-render="true"
        :selected-keys="activeMenuKeys"
        :open-keys="openKeys"
        style="border: 0"
        @open-change="onOpenChange"
      >
        <template v-for="item in sidebarItems" :key="item.key">
          <template v-if="!item.children">
            <AMenuItem :key="item.key">
              <template #icon>
                <component :is="item.icon" />
              </template>
              <NuxtLink :to="item.key">{{ item.title }}</NuxtLink>
            </AMenuItem>
          </template>
          <template v-else>
            <ASubMenu :key="item.key" :title="item.title">
              <template #icon>
                <component :is="item.icon" />
              </template>
              <AMenuItem v-for="child in item.children" :key="child.key">
                <NuxtLink :to="child.key">{{ child.title }}</NuxtLink>
              </AMenuItem>
            </ASubMenu>
          </template>
        </template>
      </AMenu>
    </div>
  </ALayoutSider>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import type { MenuProps } from 'ant-design-vue'
  import { Key } from 'ant-design-vue/lib/_util/type'
  import getMenus, { Menu } from '@/services/menus/getMenus'
  import getRoutes from '@/services/routes/getRoutes'
  import { useSettingsStore } from '@/stores/useSettingsStore'

  const route = useRoute()
  const settingsStore = useSettingsStore()
  const { collapsed, openKeys, activeMenuKeys } = storeToRefs(settingsStore)
  const sidebarItems = ref<Menu[]>([])

  const onOpenChange: MenuProps['onOpenChange'] = (keys: Key[]) => {
    const latestOpenKey = keys.find(
      (key) => !settingsStore.openKeys.includes(key),
    )
    settingsStore.setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
  }

  const isSubMenuKey = (menus: Menu[], targetKey: string): boolean => {
    return menus.some((m) => {
      if (m.key === targetKey) {
        return true
      }
      if (m.children) {
        return isSubMenuKey(m.children, targetKey)
      }
      return false
    })
  }

  watch(
    () => route.path,
    (currentPath) => {
      const menus = getMenus()
      sidebarItems.value = menus

      const routes = getRoutes()
      const currentRoute = routes.find((r) => r.path === currentPath)
      if (currentRoute) {
        if (isSubMenuKey(menus, route.path)) {
          settingsStore.setActiveMenuKeys([currentRoute.path])
        } else {
          settingsStore.setActiveMenuKeys([currentRoute.parentPath])
        }
      }
    },
  )
</script>

<style scoped>
  .sider {
    border-right: 1px solid #d0d7de;
  }

  .menu-container {
    height: calc(100vh - 50px);
  }
</style>
