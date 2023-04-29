<template>
  <ACard title="担当者マスタ検索" :bordered="true">
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
      name="staffSearchForm"
      :expandable="true"
      @on-expand-change="onExpandChange"
      @finish="handleSearch"
    >
      <ARow :gutter="24">
        <ACol span="8">
          <AFormItem name="fullName" label="氏名">
            <AInput />
          </AFormItem>
        </ACol>
        <ACol span="8">
          <AFormItem name="email" label="メールアドレス">
            <AInput />
          </AFormItem>
        </ACol>
      </ARow>
      <ARow v-show="expanded" :gutter="24">
        <ACol :span="8">
          <AFormItem name="tel" label="電話番号">
            <AInput />
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
            :disabled="!data.count"
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
        :bordered="true"
        :loading="pending"
        :row-selection="rowSelection"
        :data-source="data?.data"
        :pagination="pagination"
        :columns="columns"
        size="small"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'fullName'">
            {{ `${record.firstName} ${record.lastName}` }}
          </template>
          <template v-else-if="column.dataIndex === 'action'">
            <ASpace size="middle">
              <AButton
                type="text"
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

  interface TableParams {
    pagination?: TablePaginationConfig
    sortField?: string
    sortOrder?: string
  }

  definePageMeta({
    middleware: ['login-required'],
  })

  const router = useRouter()
  const query = ref({})
  const expanded = ref(false)
  const selectedRowKeys = ref<(string | number)[]>([])
  const tableParams = ref<TableParams>({
    pagination: {
      current: 1,
      pageSize: 20,
    },
  })

  const { data, pending } = await useAsyncData('staffs', () =>
    fetcher('/api/system/staffs'),
  )

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

  const handleSearch = (values: FormData) => {
    const pagination = { current: 1 } // 1ページ目に戻す

    tableParams.value = {
      ...tableParams,
      pagination,
    }

    query.value = {
      ...values,
      ...pagination,
    }
  }

  const pagination = computed(() => ({
    total: data?.value.count,
    current: tableParams.value.pagination?.current,
    pageSize: tableParams.value.pagination?.pageSize,
    showTotal: (total: any, range: any[]) =>
      `${total}件中、${range[0]}〜${range[1]}を表示`,
    showSizeChanger: true,
    defaultPageSize: 20,
    pageSizeOptions: ['20', '50', '100'],
  }))

  const handleTableChange = (
    pagination: TablePaginationConfig,
    sorter: any,
  ) => {
    tableParams.value = {
      pagination,
      ...sorter,
    }
    query.value = {
      ...query,
      ...pagination,
    }
  }

  const columns = [
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
    },
  ]
</script>
