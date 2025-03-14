<!-- PopupContainer.vue -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { onAuthStateChanged } from 'firebase/auth'
import SignInButton from './components/SignInButton.vue'
import { auth } from '../firebase.ts'
import BoxItemList from './components/BoxItemList.vue'
import { useBoxItemsStore } from '../stores/boxItems'
import ActionButton from '../components/ActionButton.vue'

const user = ref(null)
onMounted(() => {
  onAuthStateChanged(auth, (firebaseUser) => {
    user.value = firebaseUser
  })
})

// Reactive variable for the page number
const page = ref(1)

// Function to load timeline data from the background service worker
const loadTimeline = () => {
  chrome.runtime.sendMessage({ action: "fetchTimeline", page: page.value }, (response) => {
    if (response.error) {
      console.error("Error fetching timeline:", response.error)
    } else if (response.result) {
      const store = useBoxItemsStore()
      store.setBoxItems(response.result)
    }
  })
}
</script>

<template>
  <div class="p-4 bg-gray-100 min-w-[250px] text-center">
    <h1 class="text-xl font-bold mb-2">Kodomon Scraper</h1>
    <div v-if="!user">
      <SignInButton />
    </div>
    <div v-else>
      <div class="mb-4 flex justify-center items-center">
        <input
          type="number"
          v-model.number="page"
          min="1"
          class="p-1 mr-2 w-12 text-center border rounded-md shadow-sm"
          placeholder="Page"
        />

        <ActionButton label="Load Timeline" @click="loadTimeline" />
      </div>
      <BoxItemList />
    </div>
  </div>
</template>

<style scoped>
/* Add any styling you like */
</style>
