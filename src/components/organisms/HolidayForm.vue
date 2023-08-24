<template>
  <AForm :model="form" :rules="rules" layout="vertical" @finish="handleSubmit">
    <ARow>
      <AFormItem label="名称" name="holidayName" required>
        <AInput v-model:value="form.holidayName" />
      </AFormItem>
    </ARow>
    <ARow>
      <AFormItem label="日付" name="holidayDate" required>
        <ADatePicker v-model:value="form.holidayDate" style="width: 178px" />
      </AFormItem>
    </ARow>
    <ARow justify="center">
      <ASpace direction="horizontal" size="middle">
        <AButton type="primary" style="min-width: 100px" ghost @click="goBack">
          戻る
        </AButton>
        <AButton
          type="primary"
          html-type="submit"
          style="min-width: 100px"
          :loading="loading"
        >
          {{ props.buttonText }}
        </AButton>
      </ASpace>
    </ARow>
  </AForm>
</template>

<script setup lang="ts">
  import type { Rule } from 'ant-design-vue/es/form'
  import dayjs from '@/utils/dayjs'
  import { Holiday } from '@/types/holiday'

  interface HolidayFormProps {
    form: Holiday
    loading: boolean
    buttonText: string
  }

  const props = withDefaults(defineProps<HolidayFormProps>(), {
    loading: false,
  })
  const emits = defineEmits<{ (e: 'on-save', args: any): void }>()
  const form = ref({
    ...props.form,
    holidayDate: props.form.holidayDate ? dayjs(props.form.holidayDate) : null,
  })

  const rules: Record<string, Rule[]> = {
    holidayName: [
      { required: true, message: '値を入力してください', trigger: 'blur' },
    ],
    holidayDate: [
      { required: true, message: '値を入力してください', trigger: 'blur' },
    ],
  }

  const handleSubmit = () => {
    emits('on-save', form.value)
  }

  const router = useRouter()
  const goBack = () => {
    router.push({
      path: '/system/holidays',
      query: { page: router.currentRoute.value.query.page },
    })
  }
</script>

<style scoped></style>
