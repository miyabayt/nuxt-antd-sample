<template>
  <div v-if="props.loading" class="spinner">
    <ASpin>
      <LoadingOutlined style="font-size: 24px" :spin="true" />
    </ASpin>
  </div>
</template>

<script setup lang="ts">
  interface LoadingSpinnerProps {
    loading: boolean
  }

  const props = withDefaults(defineProps<LoadingSpinnerProps>(), {
    loading: false,
  })
</script>

<style scoped>
  @keyframes animation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .spinner {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1200;
    background-color: white;
    animation: animation 1s linear infinite;
  }
</style>
