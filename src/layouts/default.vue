<template>
  <AConfigProvider :theme="theme" :locale="jaJP">
    <ALayout>
      <AppSidebar />
      <ALayout>
        <AppHeader />
        <div>
          <ALayoutContent class="content">
            <AppBreadcrumb />
            <slot />
          </ALayoutContent>
        </div>
        <AppFooter />
      </ALayout>
    </ALayout>
  </AConfigProvider>
</template>

<script setup>
  import jaJP from 'ant-design-vue/es/locale/ja_JP'
  import '@/utils/dayjs'
  import { theme } from '@/configs/theme'
</script>

<style scoped>
  .content {
    padding: 16px;
    min-height: calc(100vh - 100px);
    border-bottom: 1px solid #d0d7de;
  }
</style>
