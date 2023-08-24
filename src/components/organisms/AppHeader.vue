<template>
  <ALayoutHeader class="header">
    <ARow align="middle" type="flex">
      <ACol v-show="showAppLogo"><AppLogo /></ACol>
      <ACol v-show="showTrigger" flex="100px">
        <MenuUnfoldOutlined
          v-show="collapsed"
          class="trigger"
          @click="setCollapsed"
        />
        <MenuFoldOutlined
          v-show="!collapsed"
          class="trigger"
          @click="setCollapsed"
        />
      </ACol>
      <ACol flex="auto" />
      <ACol><UserProfile v-show="showUserProfile" /></ACol>
    </ARow>
  </ALayoutHeader>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { MenuUnfoldOutlined } from '@ant-design/icons-vue'
  import { useSettingsStore } from '@/stores/useSettingsStore'

  const settingsStore = useSettingsStore()
  const { collapsed } = storeToRefs(settingsStore)

  interface AppHeaderProps {
    showTrigger?: boolean // 折りたたみアイコン表示有無（サイドバーが無い場合はfalseにする）
    showUserProfile?: boolean
    showAppLogo?: boolean
  }

  withDefaults(defineProps<AppHeaderProps>(), {
    showTrigger: true,
    showUserProfile: true,
    showAppLogo: false,
  })

  const setCollapsed = () => {
    settingsStore.setCollapsed(!collapsed.value)
  }
</script>

<style scoped>
  .header {
    padding: 0 16px;
    height: 50px;
    background-color: #fff;
    line-height: 50px;
    border-bottom: 1px solid #d0d7de;
  }

  .trigger {
    font-size: 16px;
    cursor: pointer;
    transition: color 0.3s;
  }
</style>
