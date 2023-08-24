<template>
  <ACard title="祝日マスタ検索" bordered>
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
    <SearchForm
      :model="formState"
      name="holidaySearchForm"
      @finish="handleSearch"
    >
      <ARow :gutter="24">
        <ACol :span="8">
          <AFormItem name="holidayName" label="名称">
            <AInput v-model:value="formState.holidayName" />
          </AFormItem>
        </ACol>
        <ACol :span="8">
          <AFormItem name="holidayDate" label="日付">
            <ADatePicker v-model:value="formState.holidayDate" />
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
            :disabled="!holidays?.count"
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
        :data-source="holidays?.data"
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
  import { TablePaginationConfig } from 'ant-design-vue/es/table/Table'
  import { exportHolidayCsv, useHolidaySearch } from '@/services/holidays'
  import { usePaginationStore } from '@/stores/usePaginationStore'

  definePageMeta({
    middleware: ['login-required'],
  })

  interface QueryParams {
    holidayName: string | undefined
    holidayDate: string | undefined
  }

  const router = useRouter()
  const paginationStore = usePaginationStore()
  const currentPath = ref(router.currentRoute.value.path)
  const pageInfo = computed(() =>
    paginationStore.getPagination(currentPath.value),
  )
  const formState = ref<QueryParams>({
    holidayName: undefined,
    holidayDate: undefined,
  })
  const queryParams = ref<QueryParams>({
    holidayName: undefined,
    holidayDate: undefined,
  })
  const selectedRowKeys = ref<(string | number)[]>([])

  const { isLoading, data: holidays } = useHolidaySearch(queryParams, pageInfo)

  const pagination = computed(() => ({
    total: holidays?.value?.count,
    current: pageInfo.value.current,
    pageSize: pageInfo.value.pageSize,
    showTotal: (total: any, range: any[]) =>
      `${total}件中、${range[0]}〜${range[1]}件を表示`,
    showSizeChanger: true,
    defaultPageSize: 20,
    pageSizeOptions: ['20', '50', '100'],
  }))

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
      path: '/system/holidays',
      query: { page: pagination.value.current },
    })
  }

  const handleCsvExport = () => {
    exportHolidayCsv(queryParams)
  }

  const handleTableChange = (
    pagination: TablePaginationConfig,
    sorter: any,
  ) => {
    paginationStore.setPagination(currentPath.value, pagination)
    paginationStore.setSort(currentPath.value, sorter)

    router.push({
      path: '/system/holidays',
      query: { page: pagination?.current },
    })
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
