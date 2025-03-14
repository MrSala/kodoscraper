console.log('Background script loaded')

// Listen for messages from other scripts (e.g., content script or popup)
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Message received in background script:', message)
  if (message.action === 'fetchTimeline') {
    // Use the provided page number, default to 1 if not provided
    const page = message.page || 1
    const apiUrl = `https://ps-api.codmon.com/api/v2/parent/timeline/?listpage=${page}&search_type[]=new_all&service_id=21220&current_flag=0&use_image_edge=true&__env__=myapp`

    fetch(apiUrl)
      .then((response) => response.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data)) {
          // Process the items using reduce
          const items = json.data.reduce((acc, item) => {
            const date = item.display_date
            const thumbnail_url = item.thumbnail_url ?? ''
            const thumbnail_url2 = item.thumbnail_url2 ?? ''
            const thumbnail_url3 = item.thumbnail_url3 ?? ''
            // Only include items of kind "4"
            if (item.kind !== '4') {
              return acc
            }
            console.log({ thumbnail_url })
            // Attempt to parse content; if it’s a JSON string, extract memo
            let memo = ''
            try {
              const parsed = JSON.parse(item.content)
              memo = parsed.memo || ''
            } catch (e) {
              // If parsing fails, fall back to the raw content
              memo = item.content
            }
            acc.push({
              date,
              thumbnailUrl: thumbnail_url,
              thumbnailUrl2: thumbnail_url2,
              thumbnailUrl3: thumbnail_url3,
              memo,
            })
            return acc
          }, [])
          sendResponse({ result: items })
        } else {
          sendResponse({ error: 'Invalid API response' })
        }
      })
      .catch((error) => {
        sendResponse({ error: error.message })
      })
    // Return true to indicate that we'll respond asynchronously.
    return true
  }

  sendResponse({ status: 'Received' })
})
