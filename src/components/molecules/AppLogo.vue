<template>
  <div class="logo" @click="handleClick">
    <strong v-if="props.collapseLogo">
      <span v-show="collapsed">SA</span>
      <span v-show="!collapsed">Sample Admin</span>
    </strong>
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { useSettingsStore } from '@/stores/useSettingsStore'

  const router = useRouter()
  const settingsStore = useSettingsStore()
  const { collapsed } = storeToRefs(settingsStore)

  interface AppLogoProps {
    collapseLogo?: boolean // サイドバーが無い場合はfalseにする
  }

  const props = withDefaults(defineProps<AppLogoProps>(), {
    collapseLogo: true,
  })

  const handleClick = () => {
    router.push('/')
  }
</script>

<style scoped>
  .logo {
    font-size: 1rem;
    height: 50px;
    line-height: 50px;
    text-align: center;
    cursor: pointer;
  }
</style>
