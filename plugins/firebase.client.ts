import { defineNuxtPlugin, useRuntimeConfig } from '#imports'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const firebaseConfig = {
    apiKey: config.public.FIREBASE_API_KEY,
    authDomain: config.public.FIREBASE_AUTH_DOMAIN,
    projectId: config.public.FIREBASE_PROJECT_ID,
    storageBucket: config.public.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: config.public.FIREBASE_MESSAGING_SENDER_ID,
    appId: config.public.FIREBASE_APP_ID,
  }

  const app = initializeApp(firebaseConfig)
  const firestore = getFirestore(app)
  const auth = getAuth(app)
  const db = getFirestore(app)


  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    try {
      const result = await signInWithPopup(auth, provider)
      console.log('User signed in:', result.user)
      return result.user
    } catch (error) {
      console.error('Google Sign-In Error:', error)
      throw error
    }
  }

  return {
    provide: {
      firebase: {
        app,
        firestore,
        auth,
        signInWithGoogle,
        db
      },
    },
  }
})
