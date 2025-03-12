import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { useRuntimeConfig } from '#imports' // Import Nuxt's config handler

const config = useRuntimeConfig() // Get public runtime config

const firebaseConfig = {
  apiKey: config.public.FIREBASE_API_KEY,
  authDomain: config.public.FIREBASE_AUTH_DOMAIN,
  projectId: config.public.FIREBASE_PROJECT_ID,
  storageBucket: config.public.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: config.public.FIREBASE_MESSAGING_SENDER_ID,
  appId: config.public.FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
export const auth = getAuth(app)

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider()
  try {
    const result = await signInWithPopup(auth, provider)
    console.log('User signed in:', result.user)
    return result.user
  } catch (error) {
    console.error('Google Sign-In Error:', error)
  }
}