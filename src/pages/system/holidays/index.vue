<template>
  <ACard title="祝日マスタ検索" bordered :head-style="{ 'font-weight': '600' }">
    <template #extra>
      <AButton
        type="primary"
        ghost
        style="min-width: 100px"
        @click="router.push('/system/holidays/new')"
      >
        <template #icon><PlusOutlined /></template>
        新規登録
      </AButton>
    </template>
    <SearchForm name="holidaySearchForm" @finish="handleSearch">
      <ARow :gutter="24">
        <ACol span="8">
          <AFormItem name="holidayName" label="名称">
            <AInput />
          </AFormItem>
        </ACol>
        <ACol span="8">
          <AFormItem name="holidayDate" label="日付">
            <ADatePicker />
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
        bordered
        :loading="pending"
        :row-selection="rowSelection"
        :data-source="data?.data"
        :pagination="pagination"
        :columns="columns"
        size="small"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'id'">
            <NuxtLink :to="`/system/holidays/show/${record.id}`">
              {{ record.id }}
            </NuxtLink>
          </template>
          <template v-else-if="column.dataIndex === 'action'">
            <ASpace size="middle">
              <AButton
                type="link"
                @click="() => router.push(`/system/holidays/edit/${record.id}`)"
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

  definePageMeta({
    middleware: ['login-required'],
  })

  interface TableParams {
    pagination?: TablePaginationConfig
    sortField?: string
    sortOrder?: string
  }

  const router = useRouter()
  const query = ref({})
  const selectedRowKeys = ref<(string | number)[]>([])
  const tableParams = ref<TableParams>({
    pagination: {
      current: 1,
      pageSize: 20,
    },
  })

  // const { data, pending } = await useAsyncData('holidays', () =>
  //   fetcher('/api/system/holidays/search', { method: 'POST' }),
  // )

  const { data, pending } = await useAsyncData('holidays', () =>
    fetcher('/api/system/holidays'),
  )

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
      `${total}件中、${range[0]}〜${range[1]}件を表示`,
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
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '名称',
      dataIndex: 'holidayName',
      key: 'holidayName',
    },
    {
      title: '日付',
      dataIndex: 'holidayDate',
      key: 'holidayDate',
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
