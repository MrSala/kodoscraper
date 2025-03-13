<!-- UserInfo.vue -->
<script setup lang="ts">
const props = defineProps<{
  user: { email: string }
}>()
</script>

<template>
  <div class="p-6 max-w-md mx-auto">
    <h1 class="text-2xl font-bold mb-4">Welcome</h1>
    <p>You are logged in as: <strong>{{ user.email }}</strong></p>
  </div>
</template>

<style scoped>
/* Add additional styling as needed */
</style>
