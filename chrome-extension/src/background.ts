console.log('Background script loaded')

// Listen for messages from other scripts (e.g., content script or popup)
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Message received in background script:', message)
  sendResponse({ status: 'Received' })
})
