<template>
  <ACard title="担当者マスタ検索" bordered>
    <template #extra>
      <AButton
        type="primary"
        ghost
        style="min-width: 100px"
        @click="router.push('/system/staffs/new')"
      >
        <template #icon><PlusOutlined /></template>
        新規登録
      </AButton>
    </template>
    <SearchForm
      :model="formState"
      name="staffSearchForm"
      :expandable="true"
      @on-expand-change="onExpandChange"
      @finish="handleSearch"
    >
      <ARow :gutter="24">
        <ACol :span="8">
          <AFormItem name="fullName" label="氏名">
            <AInput v-model:value="formState.fullName" />
          </AFormItem>
        </ACol>
        <ACol :span="8">
          <AFormItem name="email" label="メールアドレス">
            <AInput v-model:value="formState.email" />
          </AFormItem>
        </ACol>
      </ARow>
      <ARow v-show="expanded" :gutter="24">
        <ACol :span="8">
          <AFormItem name="tel" label="電話番号">
            <AInput v-model:value="formState.tel" />
          </AFormItem>
        </ACol>
      </ARow>
    </SearchForm>
    <ASpace direction="vertical" size="middle" style="display: flex">
      <ARow align="middle" justify="end">
        <ACol>
          <AButton
            type="primary"
            style="min-width: 80px"
            :disabled="!staffs?.count"
            @click="handleCsvExport"
          >
            <template #icon>
              <DownloadOutlined />
            </template>
            CSVダウンロード
          </AButton>
        </ACol>
      </ARow>
      <ATable
        row-key="id"
        bordered
        :loading="isLoading"
        :row-selection="rowSelection"
        :data-source="staffs?.data"
        :pagination="pagination"
        :columns="columns"
        size="small"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'id'">
            <NuxtLink :to="`/system/staffs/show/${record.id}`">
              {{ record.id }}
            </NuxtLink>
          </template>
          <template v-else-if="column.dataIndex === 'action'">
            <ASpace size="middle">
              <AButton
                type="link"
                @click="() => router.push(`/system/staffs/edit/${record.id}`)"
              >
                <template #icon><EditOutlined /></template>
              </AButton>
            </ASpace>
          </template>
        </template>
      </ATable>
    </ASpace>
  </ACard>
</template>

<script setup lang="ts">
  import { TablePaginationConfig } from 'ant-design-vue/es/table'
  import { exportStaffCsv, useStaffSearch } from '@/services/staffs'
  import { usePaginationStore } from '@/stores/usePaginationStore'

  definePageMeta({
    middleware: ['login-required'],
  })

  interface QueryParams {
    fullName: string | undefined
    email: string | undefined
    tel: string | undefined
  }

  const router = useRouter()
  const paginationStore = usePaginationStore()
  const currentPath = ref(router.currentRoute.value.path)
  const pageInfo = computed(() =>
    paginationStore.getPagination(currentPath.value),
  )
  const formState = ref<QueryParams>({
    fullName: undefined,
    email: undefined,
    tel: undefined,
  })
  const queryParams = ref<QueryParams>({
    fullName: undefined,
    email: undefined,
    tel: undefined,
  })
  const expanded = ref(false)
  const selectedRowKeys = ref<(string | number)[]>([])

  const { isLoading, data: staffs } = useStaffSearch(queryParams, pageInfo)

  const pagination = computed(() => ({
    total: staffs?.value?.count,
    current: pageInfo.value.current,
    pageSize: pageInfo.value.pageSize,
    showTotal: (total: any, range: any[]) =>
      `${total}件中、${range[0]}〜${range[1]}件を表示`,
    showSizeChanger: true,
    defaultPageSize: 20,
    pageSizeOptions: ['20', '50', '100'],
  }))

  const onExpandChange = (expand: boolean) => {
    expanded.value = expand
  }

  const onSelectChange = (newSelectedRowKeys: (string | number)[]) => {
    selectedRowKeys.value = newSelectedRowKeys
  }

  const rowSelection = ref({
    selectedRowKeys,
    onChange: onSelectChange,
  })

  const handleSearch = () => {
    paginationStore.setPagination(currentPath.value, {
      current: 1,
      pageSize: pageInfo.value.pageSize,
    })
    queryParams.value = {
      ...formState.value,
    }

    router.replace({
      path: '/system/staffs',
      query: { page: pagination.value.current },
    })
  }

  const handleCsvExport = () => {
    exportStaffCsv(queryParams)
  }

  const handleTableChange = (
    pagination: TablePaginationConfig,
    sorter: any,
  ) => {
    paginationStore.setPagination(currentPath.value, pagination)
    paginationStore.setSort(currentPath.value, sorter)

    router.push({
      path: '/system/staffs',
      query: { page: pagination?.current },
    })
  }

  const columns = [
    {
      title: 'ID',
      key: 'id',
    },
    {
      title: '氏名',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'メールアドレス',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '電話番号',
      dataIndex: 'tel',
      key: 'tel',
    },
    {
      title: 'アクション',
      dataIndex: 'action',
      key: 'action',
      align: 'center',
      width: 100,
    },
  ]
</script>
