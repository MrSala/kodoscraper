<script setup lang="ts">
const openOptionsPage = () => {
  chrome.runtime.openOptionsPage()
}
</script>

<template>
  <button @click="openOptionsPage" class="px-4 py-2 bg-blue-500 text-white rounded-md">
    Sign in with Google
  </button>
</template>
