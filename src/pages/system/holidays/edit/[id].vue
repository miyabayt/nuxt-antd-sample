<template>
  <ACard title="祝日マスタ編集" :loading="isLoading" bordered>
    <HolidayForm
      :form="holiday"
      button-text="保存"
      :loading="isSaving"
      @on-save="handleSubmit"
    />
  </ACard>
</template>

<script setup lang="ts">
  import { message } from 'ant-design-vue'
  import { useQueryClient } from '@tanstack/vue-query'
  import { useHoliday, updateHoliday } from '@/services/holidays'
  import { Holiday } from '@/types/holiday'

  definePageMeta({
    middleware: ['login-required'],
  })

  const router = useRouter()
  const route = useRoute()
  const isSaving = ref(false)
  const { isLoading, data: holiday } = useHoliday(route.params.id as string)
  const queryClient = useQueryClient()

  const handleSubmit = async (values: Holiday) => {
    try {
      isSaving.value = true
      const updated = await updateHoliday({
        holiday: { ...holiday, ...values },
      })
      queryClient.invalidateQueries({
        queryKey: ['holidays', `id=${updated.id}`],
      })
      router.push(`/system/holidays/show/${updated.id}`)
      message.success('データ更新が成功しました。')
    } finally {
      isSaving.value = false
    }
  }
</script>

<style scoped></style>
