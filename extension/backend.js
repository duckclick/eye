var DEFAULT_SETTINGS = JSON.stringify({ eye_url: '', hostname_match: '' })

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  try {
    switch (request.action) {
      case 'HIGHLIGHT_BROWSER_ACTION':
        chrome.tabs.query({ active: true }, function(results) {
          if (results.length > 0) {
            var tabId = results[0].id
            chrome.browserAction.setIcon({ path: 'icons/active.128.png', tabId: tabId })
          }
        })
        break

      case 'GET_SETTINGS':
        var settings = localStorage.getItem('settings') || DEFAULT_SETTINGS
        sendResponse({ err: null, value: settings })
        break
    }
  } catch(e) {
    console.error('[duckclick.eye extension] error: ' + e.message, e)
    sendResponse({ err: e })
  }
})
