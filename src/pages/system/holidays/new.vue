<template>
  <ACard title="祝日マスタ登録" bordered>
    <HolidayForm
      :form="{}"
      button-text="登録"
      :loading="isSaving"
      @on-save="handleSubmit"
    />
  </ACard>
</template>

<script setup lang="ts">
  import { message } from 'ant-design-vue'
  import { createHoliday } from '@/services/holidays'
  import { Holiday } from '@/types/holiday'

  definePageMeta({
    middleware: ['login-required'],
  })

  const router = useRouter()
  const isSaving = ref(false)

  const handleSubmit = async (values: Holiday) => {
    try {
      isSaving.value = true
      const updated = await createHoliday({
        holiday: { ...values },
      })
      router.push(`/system/holidays/show/${updated.id}`)
      message.success('データ登録が成功しました。')
    } finally {
      isSaving.value = false
    }
  }
</script>

<style scoped></style>
