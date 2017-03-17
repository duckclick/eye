import debounce from 'lodash.debounce'
import API from 'api'

const DEBOUNCE_WAIT = 100

let buffer = []

export default (eventEntry) => {
  if (!eventEntry) {
    return
  }

  buffer.push({
    created_at: new Date().getTime(),
    url: window.location.href,
    ...eventEntry
  })

  syncWithServer(buffer)
}

const syncWithServer = debounce((entries) => {
  const toConsume = entries.splice(0, entries.length)

  API.Wing
    .trackDOM({ body: toConsume })
    .then(() => console.log('tracked'))
    .catch((response) => console.error('quack!', response.data()))
}, DEBOUNCE_WAIT)
