<template>
  <ACard title="顧客マスタ詳細" :loading="isLoading" bordered>
    <template #extra>
      <AButton
        type="primary"
        style="min-width: 100px"
        ghost
        @click="() => router.push(`/system/user/edit/${route.params.id}`)"
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
          {{ user.id }}
        </ADescriptionsItem>
        <ADescriptionsItem label="氏名" :span="3">
          {{ user.fullName }}
        </ADescriptionsItem>
        <ADescriptionsItem label="メールアドレス" :span="3">
          {{ user.email }}
        </ADescriptionsItem>
        <ADescriptionsItem label="電話番号" :span="3">
          {{ user.tel }}
        </ADescriptionsItem>
        <ADescriptionsItem label="登録日時" :span="3">
          {{ user.createdAt }}
        </ADescriptionsItem>
        <ADescriptionsItem label="更新日時" :span="3">
          {{ user.updatedAt }}
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
                  path: '/user/users',
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
  import { useUser, deleteUser } from '@/services/users'

  definePageMeta({
    middleware: ['login-required'],
  })

  const router = useRouter()
  const route = useRoute()
  const showConfirm = ref<boolean>(false)
  const { isLoading, data: user } = useUser(route.params.id as string)

  const setShowConfirm = (value: boolean) => {
    showConfirm.value = value
  }

  const handleOkClick = async () => {
    await deleteUser(route.params.id as string)
    router.push('/user/users')
    message.success('データ削除が成功しました。')
    return true
  }
</script>

<style scoped></style>
