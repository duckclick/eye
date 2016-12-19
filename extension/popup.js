var settings = JSON.parse(localStorage.getItem('settings') || '{}')
document.getElementById('eye_url').value = settings.eye_url || ''
document.getElementById('hostname_match').value = settings.hostname_match || ''

var saveButton = document.getElementById('save')
saveButton.onclick = function() {
  localStorage.setItem(
    'settings',
    JSON.stringify({
      eye_url: document.getElementById('eye_url').value,
      hostname_match: document.getElementById('hostname_match').value
    })
  )

  chrome.notifications.create('saved', {
    type: 'basic',
    title: 'duckclick.eye',
    message: 'Options saved',
    iconUrl: 'icons/duck.128.png',
    requireInteraction: false
  })
}
