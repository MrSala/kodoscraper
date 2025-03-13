// src/stores/boxItems.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface BoxItemData {
  date: string
  title: string
  pictureUri: string
}

export const useBoxItemsStore = defineStore('boxItems', () => {
  // Initialize with an empty array – we'll update it with scraped data.
  const items = ref<BoxItemData[]>([])

  // Reactive array to store the selected items
  const selectedItems = ref<BoxItemData[]>([])

  // Method to update the store with new box items (scraped data)
  function setBoxItems(newItems: BoxItemData[]) {
    items.value = newItems
  }

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

  return { items, selectedItems, setBoxItems, updateSelection, allSelected, toggleSelectAll }
})
