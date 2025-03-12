<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { auth, signInWithGoogle } from '../firebase.ts'
import { onAuthStateChanged } from 'firebase/auth'

const user = ref<any>(null)

const signIn = async () => {
  try {
    const signedInUser = await signInWithGoogle()
    user.value = signedInUser
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  onAuthStateChanged(auth, (loggedInUser) => {
    user.value = loggedInUser
  })
})
</script>

<template>
  <div class="mt-4">
    <button v-if="!user" @click="signIn" class="px-4 py-2 bg-blue-500 text-white rounded-md">
      Sign in with Google
    </button>

    <div v-else class="flex flex-col items-center">
      <p class="text-lg font-semibold">Welcome, {{ user.displayName }}!</p>
      <img :src="user.photoURL" alt="Profile" class="w-12 h-12 rounded-full mt-2" />
    </div>
  </div>
</template>
