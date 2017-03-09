import API from './api'
import jsBase64 from 'js-base64'
import throttle from 'lodash.throttle'
import debounce from 'lodash.debounce'

const THROTTLE_WAIT = 150
const DEBOUNCE_WAIT = 500
const THRESHOLD = 0

let currentMarkup = null
let screenWidth = null
let screenHeight = null
let buffer = []

const enqueuePublishMarkup = (markup) => {
  if (markup === currentMarkup) {
    return
  }

  currentMarkup = markup
  buffer.push({
    created_at: new Date().getTime(),
    url: window.location.href,
    markup: jsBase64.Base64.encode(markup)
  })

  publishMarkup(buffer)
}

const getCurrentHTML = () =>
  document.getElementsByTagName('html')[0].outerHTML

const publishMarkup = debounce((entries) => {
  const toConsume = entries.splice(0, entries.length)

  API.Wing
    .trackDOM({ body: toConsume })
    .then(() => console.log('tracked'))
    .catch((response) => console.error('quack!', response.data()))
}, DEBOUNCE_WAIT)

const isInTheViewport = (element) => {
  if (!element.getBoundingClientRect) {
    return false
  }

  const rect = element.getBoundingClientRect()
  const x1 = -THRESHOLD
  const y1 = -THRESHOLD
  const y2 = screenHeight - y1
  const x2 = screenWidth - x1

  return (
    (rect.top >= y1 && rect.top <= y2 || rect.bottom >= y1 && rect.bottom <= y2) &&
    (rect.left >= x1 && rect.left <= x2 || rect.right >= x1 && rect.right <= x2)
  )
}

const listenTo = (events) => {
  events.forEach((event) => {
    document.addEventListener(event, throttle((e) => {
      if (!isInTheViewport(e.target)) {
        return
      }

      enqueuePublishMarkup(getCurrentHTML())
    }, THROTTLE_WAIT), false)
  })
}

let loaded = false
const boot = () => {
  if (loaded) {
    return
  }

  loaded = true
  screenHeight = window.innerHeight || document.documentElement.clientHeight
  screenWidth = window.innerWidth || document.documentElement.clientWidth

  listenTo(['DOMNodeInserted', 'DOMNodeRemoved'])
  enqueuePublishMarkup(getCurrentHTML())
}

export default boot
document.addEventListener('DOMContentLoaded', () => boot(), false)
window.onDuckClickEyeLoaded && onDuckClickEyeLoaded(boot)
