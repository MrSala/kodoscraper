<!-- AuthContainer.vue -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { onAuthStateChanged } from 'firebase/auth'
import LoginForm from './components/LoginForm.vue'
import UserInfo from '../components/UserInfo.vue'
import { auth } from '../firebase.ts'

const user = ref(null)

// Listen for authentication state changes
onMounted(() => {
  onAuthStateChanged(auth, (firebaseUser) => {
    user.value = firebaseUser
  })
})

// Handle successful login from LoginForm component
const handleLoginSuccess = (firebaseUser: any) => {
  user.value = firebaseUser
}
</script>

<template>
  <div>
    <!-- If not logged in, show the login form -->
    <LoginForm v-if="!user" @login-success="handleLoginSuccess" />
    <!-- If logged in, display the user info -->
    <UserInfo v-else :user="user" />
  </div>
</template>

<style scoped>
/* Add additional styling as needed */
</style>
