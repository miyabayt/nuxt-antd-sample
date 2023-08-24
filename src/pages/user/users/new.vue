<template>
  <ACard title="顧客マスタ登録" bordered>
    <UserForm
      :form="{}"
      button-text="登録"
      :loading="isSaving"
      @on-save="handleSubmit"
    />
  </ACard>
</template>

<script setup lang="ts">
  import { message } from 'ant-design-vue'
  import { createUser } from '@/services/users'
  import { User } from '@/types/user'

  definePageMeta({
    middleware: ['login-required'],
  })

  const router = useRouter()
  const isSaving = ref(false)

  const handleSubmit = async (values: User) => {
    try {
      isSaving.value = true
      const updated = await createUser({
        user: { ...values },
      })
      router.push(`/user/users/show/${updated.id}`)
      message.success('データ登録が成功しました。')
    } finally {
      isSaving.value = false
    }
  }
</script>

<style scoped></style>
