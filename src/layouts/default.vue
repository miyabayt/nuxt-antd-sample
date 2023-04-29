<template>
  <ALayout>
    <AppSidebar />
    <ALayout>
      <AppHeader />
      <div>
        <ALayoutContent class="content">
          <AppBreadcrumb />
          <slot />
        </ALayoutContent>
      </div>
      <AppFooter />
    </ALayout>
  </ALayout>
</template>

<style scoped>
  .content {
    padding: 16px;
    min-height: calc(100vh - 100px);
    border-bottom: 1px solid #d0d7de;
  }
</style>
