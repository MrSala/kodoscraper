<!-- BoxItemList.vue -->
<script setup lang="ts">
import BoxItem from './BoxItem.vue'
import { useBoxItemsStore } from '../../stores/boxItems'
import ActionButton from '../../components/ActionButton.vue'

const boxItemsStore = useBoxItemsStore()
</script>

<template>
  <div class="space-y-4">
    <!-- Select All / Deselect All Button -->
    <ActionButton  v-if="boxItemsStore.items.length > 0" :label="boxItemsStore.allSelected ? 'Deselect All' : 'Select All'" @click="boxItemsStore.toggleSelectAll" :custom-class="'w-full'" />
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
