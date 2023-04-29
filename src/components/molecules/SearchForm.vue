<template>
  <AForm
    ref="formRef"
    layout="horizontal"
    :name="props.name"
    :model="props.model"
    style="padding: 16px 0"
    @finish="onFinish"
  >
    <slot />
    <ARow>
      <ACol span="24" style="text-align: center">
        <ASpace size="middle">
          <AButton type="primary" html-type="submit" style="min-width: 100px">
            検索
          </AButton>
          <AButton
            style="min-width: 100px"
            @click="() => formRef?.resetFields()"
          >
            クリア
          </AButton>
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
  import type { FormInstance } from 'ant-design-vue'

  interface SearchFormProps {
    model: any
    name: string
    expandable?: boolean // 詳細検索のトグル
    onFinish?: (values: FormData) => void
    onExpandChange?: (expanded: boolean) => void
  }

  const props = withDefaults(defineProps<SearchFormProps>(), {
    expandable: false,
    onFinish: () => {},
    onExpandChange: () => {},
  })

  const formRef = ref<FormInstance>()
  const expanded = ref(false)
  const emit = defineEmits(['onExpandChange'])

  const onExpandClick = () => {
    expanded.value = !expanded.value
    emit('onExpandChange', expanded.value)
  }
</script>

<style scoped></style>
