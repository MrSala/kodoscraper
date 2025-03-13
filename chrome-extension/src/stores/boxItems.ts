// src/stores/boxItems.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface BoxItemData {
  date: string
  pictureUri: string
}

export const useBoxItemsStore = defineStore('boxItems', () => {
  // Sample data array (could be fetched or passed as a prop)
  const items = ref<BoxItemData[]>([
    { date: '2025-03-13', pictureUri: 'https://placehold.co/400x600' },
    { date: '2025-03-14', pictureUri: 'https://placehold.co/400x600' },
    { date: '2025-03-15', pictureUri: 'https://placehold.co/400x600' }
  ])

  // Reactive array to store the selected items
  const selectedItems = ref<BoxItemData[]>([])

  // Update the selection state for a given item
  function updateSelection(item: BoxItemData, isSelected: boolean) {
    if (isSelected) {
      if (!selectedItems.value.includes(item)) {
        selectedItems.value.push(item)
      }
    } else {
      selectedItems.value = selectedItems.value.filter((i) => i !== item)
    }
  }

  // Computed property to check if all items are selected
  const allSelected = computed(() => selectedItems.value.length === items.value.length)

  // Toggle select all: select all items if not all selected, otherwise clear selection.
  function toggleSelectAll() {
    if (allSelected.value) {
      selectedItems.value = []
    } else {
      selectedItems.value = [...items.value]
    }
  }

  return { items, selectedItems, updateSelection, allSelected, toggleSelectAll }
})
