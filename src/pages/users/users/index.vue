<template>
  <ACard title="users">
    <p>Card content</p>
    <p>Card content</p>
    <p>Card content</p>
  </ACard>
</template>

<script setup lang="ts">
  import { useLoginUser } from '@/composables/auth/useLoginUser'

  definePageMeta({
    middleware: ['login-required'],
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const loginUser = useLoginUser()
</script>
