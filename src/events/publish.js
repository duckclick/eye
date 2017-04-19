import debounce from 'lodash.debounce'
import API from 'api'
import { info, error } from 'logger'

const DEBOUNCE_WAIT = 100

let publisherDisabled = false
let fetchingSessionToken = false
let retryOnce = true
let buffer = []

export default eventEntry => {
  if (publisherDisabled || !eventEntry) {
    return
  }

  buffer.push({
    created_at: new Date().getTime(),
    url: window.location.href,
    ...eventEntry
  })

  const hasSessionToken = !!getSessionToken()

  if (!hasSessionToken && !fetchingSessionToken) {
    info('Fetching session token')
    fetchSessionToken()
    return

  } else if (!hasSessionToken) {
    info('Waiting for session token')
    return
  }

  syncWithServer(buffer)
}

const syncWithServer = debounce(entries => {
  const toConsume = entries.splice(0, entries.length)
  const params = {
    body: toConsume,
    headers: {
      'Authorization': `Bearer ${getSessionToken()}`
    }
  }

  const onSuccess = () => info(`Tracked ${toConsume.length} events`)
  const onError = (response) => error('Quack!', response.data())

  API.Wing
    .trackDOM(params)
    .then(onSuccess)
    .catch(onError)
}, DEBOUNCE_WAIT)

const fetchSessionToken = () => {
  fetchingSessionToken = true
  const onSessionToken = (response) => {
    info('Session token acquired')
    setSessionToken(response.data().session_token)
  }

  const onError = (response) => {
    if (retryOnce) {
      info('Session token expired, retrying...')
      retryOnce = false
      fetchingSessionToken = false

    } else {
      publisherDisabled = true
    }

    error(response.data())
  }

  API.Wing
    .createSession()
    .then(onSessionToken)
    .catch(onError)
}

const getSessionToken = () => {
  const value = window.sessionStorage.getItem('duckclick_eye_session_token')
  if (value === 'undefined' || value === 'null') {
    return null
  }

  return value
}

const setSessionToken = (token) => {
  window.sessionStorage.setItem('duckclick_eye_session_token', token)
}
