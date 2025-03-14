<!-- BoxItemList.vue -->
<script setup lang="ts">
import { computed } from 'vue'
import BoxItem from './BoxItem.vue'
import { useBoxItemsStore } from '../../stores/boxItems'
import ActionButton from '../../components/ActionButton.vue'

const boxItemsStore = useBoxItemsStore()

// Computed property to check if anything is selected
const isScrapeDisabled = computed(() => boxItemsStore.selectedItems.length === 0)

// Scrape function (replace with actual logic)
const scrapeSelectedItems = () => {
  console.log("Scraping selected items:", boxItemsStore.selectedItems)
  // Implement actual scraping logic here
}
</script>

<template>
  <div class="space-y-4">
    <!-- Select All / Deselect All Button -->
    <ActionButton
      v-if="boxItemsStore.items.length > 0"
      :label="boxItemsStore.allSelected ? 'Deselect All' : 'Select All'"
      @click="boxItemsStore.toggleSelectAll"
      custom-class="w-full"
    />

    <!-- Loop through each item and render a BoxItem -->
    <BoxItem
      v-for="(item, index) in boxItemsStore.items"
      :key="index"
      :item="item"
      :selected="boxItemsStore.selectedItems.includes(item)"
      @update:selected="boxItemsStore.updateSelection(item, $event)"
    />

    <!-- Scrape Button (Disabled if no items are selected) -->
    <ActionButton
      v-if="boxItemsStore.items.length > 0"
      label="Scrape"
      @click="scrapeSelectedItems"
      :disabled="isScrapeDisabled"
      custom-class="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
    />
  </div>
</template>

<style scoped>
/* Add additional styling as needed */
</style>
