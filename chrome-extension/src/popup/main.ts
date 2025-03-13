import { createApp } from 'vue'
import PopupContainer from './PopupContainer.vue'
import '../assets/tailwind.css'  // If using Tailwind

// Load stored user info (if available)
chrome.storage.local.get('user', (data) => {
  if (data.user) {
    console.log('User found in storage:', data.user)
  }
})

createApp(PopupContainer).mount('#app')
