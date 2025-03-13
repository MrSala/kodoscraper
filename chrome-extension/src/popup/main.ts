import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PopupContainer from './PopupContainer.vue'
import '../assets/tailwind.css'
import { useBoxItemsStore } from '../stores/boxItems.ts'

const app = createApp(PopupContainer)
const pinia = createPinia()
app.use(pinia)

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  if (tabs.length && tabs[0].id) {
    const tabId = tabs[0].id
    chrome.runtime.sendMessage({ action: "scrapeData", tabId }, (response) => {
      if (response.error) {
        console.error("Error scraping data:", response.error)
      } else if (response.result) {
        const store = useBoxItemsStore(pinia)
        store.setBoxItems(response.result)
      }
    })
  }
})
app.mount('#app')
