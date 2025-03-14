<script setup lang="ts">
import ActionButton from '../../components/ActionButton.vue'

const openOptionsPage = () => {
  chrome.runtime.openOptionsPage()
}
</script>

<template>
  <ActionButton @click="openOptionsPage" label="Sign in" />
</template>
