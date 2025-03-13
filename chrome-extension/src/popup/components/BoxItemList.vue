<!-- BoxItemList.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import BoxItem from './BoxItem.vue'

interface BoxItemData {
  date: string
  pictureUri: string
}

// Sample data array (could be fetched or passed as a prop)
const items = ref<BoxItemData[]>([
  { date: '2025-03-13', pictureUri: 'https://via.placeholder.com/50' },
  { date: '2025-03-14', pictureUri: 'https://via.placeholder.com/50' },
  { date: '2025-03-15', pictureUri: 'https://via.placeholder.com/50' }
])

// Reactive array to store the selected items
const selectedItems = ref<BoxItemData[]>([])

// Handler to update the selection state for an item
const updateSelection = (item: BoxItemData, isSelected: boolean) => {
  if (isSelected) {
    if (!selectedItems.value.includes(item)) {
      selectedItems.value.push(item)
    }
  } else {
    selectedItems.value = selectedItems.value.filter((i) => i !== item)
  }
}
</script>

<template>
  <div class="space-y-4">
    <!-- Loop through each item and render a BoxItem -->
    <BoxItem
      v-for="(item, index) in items"
      :key="index"
      :item="item"
      :selected="selectedItems.includes(item)"
      @update:selected="updateSelection(item, $event)"
    />
  </div>
</template>

<style scoped>
/* Add additional styling as needed */
</style>
