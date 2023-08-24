<template>
  <ACard title="担当者マスタ編集" :loading="isLoading" bordered>
    <StaffForm
      :form="staff"
      button-text="保存"
      :loading="isSaving"
      @on-save="handleSubmit"
    />
  </ACard>
</template>

<script setup lang="ts">
  import { message } from 'ant-design-vue'
  import { useQueryClient } from '@tanstack/vue-query'
  import { useStaff, updateStaff } from '@/services/staffs'
  import { Staff } from '@/types/staff'

  definePageMeta({
    middleware: ['login-required'],
  })

  const router = useRouter()
  const route = useRoute()
  const isSaving = ref(false)
  const { isLoading, data: staff } = useStaff(route.params.id as string)
  const queryClient = useQueryClient()

  const handleSubmit = async (values: Staff) => {
    try {
      isSaving.value = true
      const updated = await updateStaff({
        staff: { ...staff, ...values },
      })
      queryClient.invalidateQueries({
        queryKey: ['staffs', `id=${updated.id}`],
      })
      router.push(`/system/staffs/show/${updated.id}`)
      message.success('データ更新が成功しました。')
    } finally {
      isSaving.value = false
    }
  }
</script>

<style scoped></style>
