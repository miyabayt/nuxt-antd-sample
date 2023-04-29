<template>
  <ACard
    title="担当者マスタ編集"
    :loading="isLoading"
    bordered
    :head-style="{ padding: '4px 16px', 'font-weight': '600' }"
  >
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
  import useStaff from '@/services/staffs/useStaff'
  import updateStaff from '@/services/staffs/updateStaff'
  import { Staff } from '@/types/staff'

  definePageMeta({
    middleware: ['login-required'],
  })

  const router = useRouter()
  const route = useRoute()
  const isSaving = ref(false)
  const { isLoading, data: staff } = useStaff(route.params.id as string)

  const handleSubmit = async (values: Staff) => {
    try {
      isSaving.value = true
      const updated = await updateStaff({
        staff: { ...staff, ...values },
      })
      router.push(`/system/staffs/show/${updated.id}`)
      message.success('データ更新が成功しました。')
    } finally {
      isSaving.value = false
    }
  }
</script>

<style scoped></style>
