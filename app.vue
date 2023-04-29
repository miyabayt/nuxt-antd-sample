<template>
  <AConfigProvider :locale="jaJP">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </AConfigProvider>
</template>

<script setup>
  import jaJP from 'ant-design-vue/es/locale/ja_JP'
  import '@/utils/dayjs'
</script>
