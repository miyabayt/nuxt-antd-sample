<template>
  <AForm
    layout="horizontal"
    :name="formName"
    :model="formRef"
    style="padding: 16px 0"
    @finish="onFinish"
  >
    <slot />
    <ARow>
      <ACol :span="24" style="text-align: center">
        <ASpace size="middle">
          <AButton type="primary" html-type="submit" style="min-width: 100px">
            検索
          </AButton>
          <AButton style="min-width: 100px" @click="resetForm">クリア</AButton>
          <a v-show="expandable" style="font-size: 12px" @click="onExpandClick">
            <UpOutlined v-show="expanded" />
            <DownOutlined v-show="!expanded" />
            詳細検索
          </a>
        </ASpace>
      </ACol>
    </ARow>
  </AForm>
</template>

<script setup lang="ts">
  import { Form } from 'ant-design-vue'

  interface SearchFormProps {
    model: any
    name: string
    expandable?: boolean // 詳細検索のトグル
    onFinish?: () => void
    onExpandChange?: (expanded: boolean) => void
  }

  const props = withDefaults(defineProps<SearchFormProps>(), {
    expandable: false,
    onFinish: () => {},
    onExpandChange: () => {},
  })

  const expanded = ref(false)
  const emits = defineEmits(['onExpandChange'])
  const formName = ref(props.name)
  const formRef = ref(props.model)

  const onExpandClick = () => {
    expanded.value = !expanded.value
    emits('onExpandChange', expanded.value)
  }

  const useForm = Form.useForm
  const { resetFields } = useForm(formRef)
  const resetForm = () => {
    resetFields()
  }
</script>

<style scoped></style>
