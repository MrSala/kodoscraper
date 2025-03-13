console.log('Background script loaded')

// Listen for messages from other scripts (e.g., content script or popup)
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Message received in background script:', message)
  if (message.action === "scrapeData") {
    const tabId = message.tabId;
    if (!tabId) {
      sendResponse({ error: "No tabId provided" });
      return;
    }
    chrome.scripting.executeScript({
      target: { tabId },
      // This function runs in the context of the active tab
      func: () => {
        // Check if URL contains the required string
        if (!document.location.href.includes("https://parents.codmon.com/home")) {
          return { error: "URL not matched" };
        }
        const articles = Array.from(document.querySelectorAll('div[role="article"]'));
        // Use reduce to extract and filter the articles based on title
        return articles.reduce((acc, article) => {
          // Extract the date string from the <span> inside .homeCard_date
          const dateElem = article.querySelector('.homeCard_date span');
          const date = dateElem ? dateElem.innerText.trim() : '';

          // Extract the title text from .homeCard__title
          const titleElem = article.querySelector('.homeCard__title');
          const title = titleElem ? titleElem.innerText.trim() : '';

          // Only include articles where the title contains '連絡帳'
          if (!title.includes('連絡帳')) {
            return acc;
          }

          // Extract the image source from the <img> inside ons-carousel-item
          const carouselElem = article.querySelector('ons-carousel-item img');
          const pictureUri = carouselElem ? carouselElem.getAttribute('src') || '' : '';

          acc.push({ date, title, pictureUri });
          return acc;
        }, []);
      }
    }, (results) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
        sendResponse({ error: chrome.runtime.lastError.message });
      } else {
        sendResponse({ result: results[0].result });
      }
    });
    // Return true to indicate asynchronous response.
    return true;
  }

  sendResponse({ status: 'Received' })
})
