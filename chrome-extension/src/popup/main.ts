import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PopupContainer from './PopupContainer.vue'
import '../assets/tailwind.css'
import { useBoxItemsStore } from '../stores/boxItems.ts'

const app = createApp(PopupContainer)
const pinia = createPinia()
app.use(pinia)

app.mount('#app')
