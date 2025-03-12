console.log('Content script injected')

// Example: Send a message to the background script
chrome.runtime.sendMessage({ action: 'content_script_loaded' }, (response) => {
  console.log('Background response:', response)
})
