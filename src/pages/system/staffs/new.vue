<template>
  <ACard title="担当者マスタ登録" bordered>
    <StaffForm
      :form="{}"
      button-text="登録"
      :loading="isSaving"
      @on-save="handleSubmit"
    />
  </ACard>
</template>

<script setup lang="ts">
  import { message } from 'ant-design-vue'
  import { createStaff } from '@/services/staffs'
  import { Staff } from '@/types/staff'

  definePageMeta({
    middleware: ['login-required'],
  })

  const router = useRouter()
  const isSaving = ref(false)

  const handleSubmit = async (values: Staff) => {
    try {
      isSaving.value = true
      const updated = await createStaff({
        staff: { ...values },
      })
      router.push(`/system/staffs/show/${updated.id}`)
      message.success('データ登録が成功しました。')
    } finally {
      isSaving.value = false
    }
  }
</script>

<style scoped></style>
