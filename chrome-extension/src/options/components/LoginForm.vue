<!-- LoginForm.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

// Form state
const email = ref('')
const password = ref('')
const errorMessage = ref('')
const successMessage = ref('')

// Emit event to parent on successful login
const emit = defineEmits<{ (e: 'login-success', user: any): void }>()

const auth = getAuth()
const login = async () => {
  errorMessage.value = ''
  successMessage.value = ''
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)
    successMessage.value = `Logged in as ${userCredential.user.email}`
    // Notify parent component with the logged-in user data
    emit('login-success', userCredential.user)
  } catch (error: any) {
    console.error(error)
    errorMessage.value = error.message || 'Login failed.'
  }
}
</script>

<template>
  <div class="p-6 max-w-md mx-auto">
    <h1 class="text-2xl font-bold mb-4">Sign In</h1>
    <form @submit.prevent="login" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          v-model="email"
          required
          class="mt-1 block w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          v-model="password"
          required
          class="mt-1 block w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div>
        <button type="submit" class="w-full px-4 py-2 bg-blue-500 text-white rounded">
          Log In
        </button>
      </div>
      <div v-if="errorMessage" class="text-red-500 text-sm">
        {{ errorMessage }}
      </div>
      <div v-if="successMessage" class="text-green-500 text-sm">
        {{ successMessage }}
      </div>
    </form>
  </div>
</template>

<style scoped>
/* Add additional styling as needed */
</style>
