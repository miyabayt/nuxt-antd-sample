import { defineStore } from 'pinia'
import { Pages, Sorts, Pagination, Sort } from '@/types/pagination'

interface PaginationState {
  pages: Pages
  sorts: Sorts
}

export const usePaginationStore = defineStore('pagination', {
  state: (): PaginationState => ({
    pages: {},
    sorts: {},
  }),
  actions: {
    setPagination(
      path: string,
      pageInfo: { current?: number | undefined; pageSize?: number | undefined },
    ): void {
      this.pages[path] = {
        current: pageInfo.current || 1,
        pageSize: pageInfo.pageSize || 20,
      }
    },
    getPagination(path: string): Pagination {
      return this.pages[path] || { current: 1, pageSize: 20 }
    },
    setSort(path: string, sort: { sortField: string; sortOrder: string }) {
      this.sorts[path] = sort
    },
    getSort(path: string): Sort {
      return this.sorts[path]
    },
  },
})
