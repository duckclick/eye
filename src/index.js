import API from './api'
import jsBase64 from 'js-base64'
import throttle from 'lodash.throttle'

const THROTTLE_WAIT = 150
let currentMarkup = null

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

const listenTo = (events) => {
  events.forEach((event) => {
    document.addEventListener(event, throttle(() => {
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
  listenTo(['DOMNodeInserted', 'DOMNodeRemoved'])
  publishMarkup(getCurrentHTML())
}

export default boot
document.addEventListener('DOMContentLoaded', () => boot(), false)
window.onDuckClickEyeLoaded && onDuckClickEyeLoaded(boot)
