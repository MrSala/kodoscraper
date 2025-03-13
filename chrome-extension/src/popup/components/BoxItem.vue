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

// Toggle selection by simply inverting the current value.
const toggleSelection = () => {
  emits('update:selected', !props.selected)
}
</script>

<template>
  <div
    class="flex items-center p-4 border rounded-md shadow-sm cursor-pointer"
    @click="toggleSelection"
  >
    <!-- Checkbox for selection with click event stopped to prevent double toggling -->
    <input
      type="checkbox"
      :checked="selected"
      @click.stop="toggleSelection"
      class="mr-4"
    />
    <!-- Picture (uses a placeholder if item.pictureUri is falsy) -->
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
