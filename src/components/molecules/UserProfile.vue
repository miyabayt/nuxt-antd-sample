<template>
  <div>
    <ADropdown
      overlay-class-name="dropdown-menu"
      placement="bottomRight"
      :trigger="['hover']"
      :allow="true"
    >
      <AAvatar class="avatar">
        <template #icon><UserOutlined /></template>
      </AAvatar>
      <template #overlay>
        <AMenu :force-sub-menu-render="true">
          <AMenuItem>
            {{ fullName }}
          </AMenuItem>
          <AMenuDivider />
          <AMenuItem @click="handleLogout">ログアウト</AMenuItem>
        </AMenu>
      </template>
    </ADropdown>
  </div>
</template>

<script setup lang="ts">
  import { useAuthStore } from '@/stores/useAuthStore'
  import logout from '@/services/auth/logout'
  const router = useRouter()
  const authStore = useAuthStore()
  const { accessToken, refreshToken, loginUser } = authStore

  const handleLogout = async () => {
    try {
      await logout(accessToken, refreshToken)
    } finally {
      router.push('/login')
    }

    // TODO: toast?
  }

  const fullName = computed(() => {
    return `${loginUser?.lastName} ${loginUser?.firstName}さん`
  })
</script>

<style scoped>
  .avatar {
    padding-top: -5px;
    margin-top: -5px;
    cursor: pointer;
  }

  .dropdown-menu {
    width: 180px;
  }
</style>
