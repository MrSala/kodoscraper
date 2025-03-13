import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PopupContainer from './PopupContainer.vue'
import '../assets/tailwind.css'

const app = createApp(PopupContainer)
const pinia = createPinia()
app.use(pinia)

// Load stored user info (if available) from chrome.storage and update the store
chrome.storage.local.get('user', (data) => {
  if (data.user) {
    console.log('User found in storage:', data.user)
  }
})

app.mount('#app')
