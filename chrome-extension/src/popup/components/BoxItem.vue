<!-- BoxItem.vue -->
<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

interface BoxItemData {
  date: string
  pictureUri: string
}

const props = defineProps<{
  item: BoxItemData
  selected: boolean
}>()

const emits = defineEmits<{
  (e: 'update:selected', value: boolean): void
}>()

const toggleSelection = (event: Event) => {
  const target = event.target as HTMLInputElement
  emits('update:selected', target.checked)
}
</script>

<template>
  <div class="flex items-center p-4 border rounded-md shadow-sm">
    <!-- Checkbox for selection -->
    <input
      type="checkbox"
      :checked="selected"
      @change="toggleSelection"
      class="mr-4"
    />
    <!-- Picture (uses placeholder if none provided) -->
    <img
      :src="item.pictureUri || 'https://via.placeholder.com/50'"
      alt="Picture"
      class="w-12 h-12 object-cover rounded-full mr-4"
    />
    <!-- Display the date -->
    <div>
      <p class="font-medium">{{ item.date }}</p>
    </div>
  </div>
</template>

<style scoped>
/* Add additional styling as needed */
</style>
