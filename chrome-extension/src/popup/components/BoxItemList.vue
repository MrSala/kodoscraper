<!-- BoxItemList.vue -->
<script setup lang="ts">
import BoxItem from './BoxItem.vue'
import { useBoxItemsStore } from '../../stores/boxItems'

const boxItemsStore = useBoxItemsStore()
</script>

<template>
  <div class="space-y-4">
    <!-- Select All / Deselect All Button -->
    <button
      @click="boxItemsStore.toggleSelectAll"
      class="w-full px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
    >
      {{ boxItemsStore.allSelected ? 'Deselect All' : 'Select All' }}
    </button>

    <!-- Loop through each item and render a BoxItem -->
    <BoxItem
      v-for="(item, index) in boxItemsStore.items"
      :key="index"
      :item="item"
      :selected="boxItemsStore.selectedItems.includes(item)"
      @update:selected="boxItemsStore.updateSelection(item, $event)"
    />
  </div>
</template>

<style scoped>
/* Add additional styling as needed */
</style>
