chrome.runtime.sendMessage({ action: 'GET_SETTINGS' }, function(response) {
  if (response.err) {
    console.error('[duckclick.eye extension] error: ' + response.err.message, response.err)
    return
  }

  var settings = JSON.parse(response.value)
  var activeRegex = new RegExp('^' + settings.hostname_match + '$')

  if (settings.eye_url && activeRegex.test(document.location.hostname)) {
    chrome.runtime.sendMessage({ action: 'HIGHLIGHT_BROWSER_ACTION' })

    var script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = settings.eye_url

    var head = document.getElementsByTagName('head')[0]
    head.appendChild(script)
    console.info('[duckclick.eye extension] Loaded')
  }
});
