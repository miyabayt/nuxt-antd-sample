<template>
  <ACard title="顧客マスタ編集" :loading="isLoading" bordered>
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
  import { useQueryClient } from '@tanstack/vue-query'
  import { useUser, updateUser } from '@/services/users'
  import { User } from '@/types/user'

  definePageMeta({
    middleware: ['login-required'],
  })

  const router = useRouter()
  const route = useRoute()
  const isSaving = ref(false)
  const { isLoading, data: user } = useUser(route.params.id as string)
  const queryClient = useQueryClient()

  const handleSubmit = async (values: User) => {
    try {
      isSaving.value = true
      const updated = await updateUser({
        user: { ...user, ...values },
      })
      queryClient.invalidateQueries({
        queryKey: ['users', `id=${updated.id}`],
      })
      router.push(`/user/users/show/${updated.id}`)
      message.success('データ更新が成功しました。')
    } finally {
      isSaving.value = false
    }
  }
</script>

<style scoped></style>
