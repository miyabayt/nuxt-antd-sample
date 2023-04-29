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
  import getRoutes from '@/composables/routes/getRoutes'

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
      const currentRoute = routes.find((r) => r.path === currentPath)
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
