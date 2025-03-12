<script setup lang="ts">
import { ref } from 'vue'
import { collection, doc, setDoc } from 'firebase/firestore'

const { $firebase } = useNuxtApp()
const user = ref(null)

const signIn = async () => {
  try {
    const signedInUser = await $firebase.signInWithGoogle()
    user.value = signedInUser

    // Save user data to Firestore
    const usersCollection = collection($firebase.db, 'users')
    const userDoc = doc(usersCollection, signedInUser.uid)
    await setDoc(userDoc, {
      name: signedInUser.displayName,
      email: signedInUser.email,
      photoURL: signedInUser.photoURL,
      uid: signedInUser.uid,
    })

    console.log('User saved to Firestore:', signedInUser)
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div class="flex flex-col items-center space-y-4">
    <button @click="signIn" class="px-4 py-2 bg-blue-500 text-white rounded-md">
      Sign in with Google
    </button>

    <div v-if="user" class="mt-4 text-center">
      <p class="text-lg font-semibold">Welcome, {{ user.displayName }}!</p>
      <img :src="user.photoURL" alt="Profile" class="w-12 h-12 rounded-full mt-2" />
    </div>
  </div>
</template>
