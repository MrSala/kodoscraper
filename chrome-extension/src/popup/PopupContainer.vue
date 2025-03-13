<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { onAuthStateChanged } from 'firebase/auth'
import SignInButton from './components/SignInButton.vue'
import { auth } from '../firebase.ts'

// Create a reactive variable to store the current user
const user = ref(null)

// Listen for authentication state changes
onMounted(() => {
  onAuthStateChanged(auth, (firebaseUser) => {
    user.value = firebaseUser
  })
})
</script>

<template>
  <div class="p-4 bg-gray-100 min-w-[250px] text-center">
    <h1 class="text-xl font-bold mb-2">Kodomon Scrapers</h1>
    <!-- Render SignInButton only if user is not logged in -->
    <div v-if="!user">
      <SignInButton />
    </div>
    <!-- Optionally, render something else if the user is logged in -->
    <div v-else>
      <p>Welcome, {{ user.email }}</p>
    </div>
  </div>
</template>

<style scoped>
/* Add any styling you like */
</style>
