<template>
  <ABreadcrumb :routes="breadcrumbs" class="breadcrumb">
    <template #itemRender="{ route: r }">
      <span v-if="breadcrumbs.indexOf(r) === breadcrumbs.length - 1">
        {{ r.breadcrumbName }}
      </span>
      <NuxtLink v-else :to="r.path">
        {{ r.breadcrumbName }}
      </NuxtLink>
    </template>
  </ABreadcrumb>
</template>

<script setup lang="ts">
  import _ from 'lodash'
  import * as pathToRegexp from 'path-to-regexp'
  import getRoutes from '@/services/routes/getRoutes'

  interface IBreadcrumb {
    path: string
    breadcrumbName: string
    children?: Array<{
      path: string
      breadcrumbName: string
    }>
  }

  const route = useRoute()
  const breadcrumbs = ref<IBreadcrumb[]>([])

  watch(
    () => route.path,
    (currentPath) => {
      const routes = getRoutes()
      const currentRoute = routes.find((r) => {
        if (!_.isEmpty(route.params)) {
          const toPath = pathToRegexp.compile(r.path)
          const routePath = toPath(route.params)
          return routePath === currentPath
        } else {
          return r.path === currentPath && r.path !== '/'
        }
      })
      const tempBreadcrumbs = routes.filter((r) => {
        return (
          r.path === '/' || (currentRoute && r.path === currentRoute.parentPath)
        )
      })

      if (
        currentRoute &&
        !tempBreadcrumbs.some((b) => b.path === currentRoute.path)
      ) {
        tempBreadcrumbs.push(currentRoute)
      }

      const building: IBreadcrumb[] = []
      const sliced = tempBreadcrumbs.slice(0, 3)
      for (let i = 0; i < sliced.length; i++) {
        const { path, title } = sliced[i]
        building.push({ path, breadcrumbName: title })
      }
      breadcrumbs.value = building
    },
  )
</script>

<style scoped>
  .breadcrumb {
    margin-bottom: 16px;
  }
</style>
