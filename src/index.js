import API from './api'
import jsBase64 from 'js-base64'
import throttle from 'lodash.throttle'

const THROTTLE_WAIT = 150
const THRESHOLD = 0

let currentMarkup = null
let screenWidth = null
let screenHeight = null

const getCurrentHTML = () =>
  document.getElementsByTagName('html')[0].outerHTML

const publishMarkup = (markup) => {
  if (markup === currentMarkup) {
    return
  }

  currentMarkup = markup
  const trackEntry = {
    created_at: new Date().getTime(),
    markup: jsBase64.Base64.encode(markup)
  }

  API.Wing
    .trackDOM({ body: trackEntry })
    .then(() => console.log('tracked'))
    .catch((response) => console.error('quack!', response.data()))
}

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

      publishMarkup(getCurrentHTML())
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
  publishMarkup(getCurrentHTML())
}

export default boot
document.addEventListener('DOMContentLoaded', () => boot(), false)
window.onDuckClickEyeLoaded && onDuckClickEyeLoaded(boot)
