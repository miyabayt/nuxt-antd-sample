<template>
  <ACard
    title="顧客マスタ編集"
    :loading="isLoading"
    bordered
    :head-style="{ padding: '4px 16px', 'font-weight': '600' }"
  >
    <UserForm
      :form="user"
      button-text="保存"
      :loading="isSaving"
      @on-save="handleSubmit"
    />
  </ACard>
</template>

<script setup lang="ts">
  import { message } from 'ant-design-vue'
  import useUser from '@/services/users/useUser'
  import updateUser from '@/services/users/updateUser'
  import { User } from '@/types/user'

  definePageMeta({
    middleware: ['login-required'],
  })

  const router = useRouter()
  const route = useRoute()
  const isSaving = ref(false)
  const { isLoading, data: user } = useUser(route.params.id as string)

  const handleSubmit = async (values: User) => {
    try {
      isSaving.value = true
      const updated = await updateUser({
        user: { ...user, ...values },
      })
      router.push(`/user/users/show/${updated.id}`)
      message.success('データ更新が成功しました。')
    } finally {
      isSaving.value = false
    }
  }
</script>

<style scoped></style>
