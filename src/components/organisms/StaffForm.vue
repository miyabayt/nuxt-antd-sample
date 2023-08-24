<template>
  <AForm :model="form" :rules="rules" layout="vertical" @finish="handleSubmit">
    <ARow :gutter="24">
      <ACol>
        <AFormItem label="姓" name="lastName" required>
          <AInput v-model:value="form.lastName" />
        </AFormItem>
      </ACol>
      <ACol>
        <AFormItem label="名" name="firstName" required>
          <AInput v-model:value="form.firstName" />
        </AFormItem>
      </ACol>
    </ARow>
    <ARow>
      <AFormItem label="パスワード" name="password" required>
        <AInputPassword v-model:value="form.password" style="width: 390px" />
      </AFormItem>
    </ARow>
    <ARow>
      <AFormItem label="確認用パスワード" name="passwordConfirm" required>
        <AInputPassword
          v-model:value="form.passwordConfirm"
          style="width: 390px"
        />
      </AFormItem>
    </ARow>
    <ARow>
      <AFormItem label="メールアドレス" name="email" required>
        <AInput v-model:value="form.email" style="width: 390px" />
      </AFormItem>
    </ARow>
    <ARow>
      <AFormItem label="電話番号" name="tel" required>
        <AInput v-model:value="form.tel" />
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
  import { Staff } from '@/types/staff'

  interface StaffFormProps {
    form: Staff
    loading: boolean
    buttonText: string
  }

  const props = withDefaults(defineProps<StaffFormProps>(), {
    loading: false,
  })
  const emits = defineEmits(['onSave'])
  const form = ref({
    ...props.form,
  })

  const rules: Record<string, Rule[]> = {
    lastName: [
      { required: true, message: '値を入力してください', trigger: 'blur' },
    ],
    firstName: [
      { required: true, message: '値を入力してください', trigger: 'blur' },
    ],
    password: [
      { required: true, message: '値を入力してください', trigger: 'blur' },
    ],
    passwordConfirm: [
      { required: true, message: '値を入力してください', trigger: 'blur' },
    ],
    email: [
      { required: true, message: '値を入力してください', trigger: 'blur' },
    ],
    tel: [{ required: true, message: '値を入力してください', trigger: 'blur' }],
  }

  const handleSubmit = () => {
    emits('onSave', form.value)
  }

  const router = useRouter()
  const goBack = () => {
    router.push({
      path: '/system/staffs',
      query: { page: router.currentRoute.value.query.page },
    })
  }
</script>

<style scoped></style>
