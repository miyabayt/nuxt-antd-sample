<template>
  <div class="form">
    <div class="logo">
      <strong>Sample Admin</strong>
    </div>
    <AForm
      :model="formState"
      :rules="rules"
      layout="vertical"
      @finish="handleSubmit"
    >
      <AFormItem label="ログインID" name="username" required>
        <AInput
          v-model:value="formState.username"
          autocomplete="off"
          size="large"
        />
      </AFormItem>
      <AFormItem label="パスワード" name="password" required>
        <AInputPassword
          v-model:value="formState.password"
          autocomplete="off"
          size="large"
        />
      </AFormItem>
      <AFormItem style="margin-top: 36px">
        <AButton
          type="primary"
          html-type="submit"
          :loading="isLoading"
          :block="true"
          size="large"
        >
          ログイン
        </AButton>
      </AFormItem>
    </AForm>
  </div>
</template>

<script setup lang="ts">
  import type { Rule } from 'ant-design-vue/es/form'
  import login from '@/services/auth/login'

  const router = useRouter()
  const route = useRoute()
  const isLoading = ref(false)

  interface LoginForm {
    username: string
    password: string
  }

  const formState = reactive<LoginForm>({
    username: '',
    password: '',
  })

  const rules: Record<string, Rule[]> = {
    username: [
      { required: true, message: '値を入力してください', trigger: 'blur' },
    ],
    password: [
      { required: true, message: '値を入力してください', trigger: 'blur' },
    ],
  }

  const handleSubmit = async ({ username, password }: LoginForm) => {
    try {
      isLoading.value = true
      const { success } = await login(username, password)

      if (success) {
        const originalPath = route.query.redirect_to as string
        const redirectTo = originalPath ?? '/'
        console.log('redirect to: ', redirectTo)
        await router.push(redirectTo)
      }

      // TODO toast?
    } finally {
      isLoading.value = false
    }
  }

  definePageMeta({ layout: false })
</script>

<style scoped>
  .form {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -220px 0 0 -220px;
    width: 440px;
    height: 400px;
    padding: 36px;
    box-shadow: 0 0 100px rgba(0, 0, 0, 0.08);
    border: 1px solid #d0d7de;
    border-radius: 4px;
  }

  .logo {
    font-size: 1.6em;
    text-align: center;
    cursor: pointer;
    margin-bottom: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
