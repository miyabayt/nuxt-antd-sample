<template>
  <ACard title="担当者マスタ詳細" :loading="isLoading" bordered>
    <template #extra>
      <AButton
        type="primary"
        style="min-width: 100px"
        ghost
        @click="() => router.push(`/system/staffs/edit/${route.params.id}`)"
      >
        <template #icon>
          <EditOutlined />
        </template>
        編集
      </AButton>
    </template>
    <ASpace direction="vertical" size="middle" style="display: flex">
      <ADescriptions
        size="small"
        :label-style="{ width: 200, fontWeight: 600 }"
        bordered
      >
        <ADescriptionsItem label="ID" :span="3">
          {{ staff.id }}
        </ADescriptionsItem>
        <ADescriptionsItem label="氏名" :span="3">
          {{ staff.fullName }}
        </ADescriptionsItem>
        <ADescriptionsItem label="メールアドレス" :span="3">
          {{ staff.email }}
        </ADescriptionsItem>
        <ADescriptionsItem label="電話番号" :span="3">
          {{ staff.tel }}
        </ADescriptionsItem>
        <ADescriptionsItem label="登録日時" :span="3">
          {{ staff.createdAt }}
        </ADescriptionsItem>
        <ADescriptionsItem label="更新日時" :span="3">
          {{ staff.updatedAt }}
        </ADescriptionsItem>
      </ADescriptions>
      <ARow justify="center">
        <ASpace direction="horizontal" size="middle">
          <AButton
            type="primary"
            style="min-width: 100px"
            ghost
            @click="
              () =>
                router.push({
                  path: '/system/staffs',
                  query: { page: route.params.page },
                })
            "
          >
            戻る
          </AButton>
          <AButton
            type="primary"
            style="min-width: 100px"
            danger
            @click="() => setShowConfirm(true)"
          >
            削除
          </AButton>
          <AModal
            title="確認"
            :open="showConfirm"
            ok-text="削除"
            cancel-text="キャンセル"
            ok-type="danger"
            centered
            @ok="handleOkClick"
            @cancel="() => setShowConfirm(false)"
          >
            <p>データを削除します。よろしいですか？</p>
          </AModal>
        </ASpace>
      </ARow>
    </ASpace>
  </ACard>
</template>

<script setup lang="ts">
  import { message } from 'ant-design-vue'
  import { useStaff, deleteStaff } from '@/services/staffs'

  definePageMeta({
    middleware: ['login-required'],
  })

  const router = useRouter()
  const route = useRoute()
  const showConfirm = ref<boolean>(false)
  const { isLoading, data: staff } = useStaff(route.params.id as string)

  const setShowConfirm = (value: boolean) => {
    showConfirm.value = value
  }

  const handleOkClick = async () => {
    await deleteStaff(route.params.id as string)
    router.push('/system/staffs')
    message.success('データ削除が成功しました。')
    return true
  }
</script>

<style scoped></style>
