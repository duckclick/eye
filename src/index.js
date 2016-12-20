import API from './api'
import jsBase64 from 'js-base64'

const getCurrentHTML = () =>
  document.getElementsByTagName('html')[0].outerHTML

const publishMarkup = (markup) => {
  const trackEntry = {
    created_at: new Date().getTime(),
    markup: jsBase64.Base64.encode(markup)
  }

  API.Wing
    .trackDOM({
      body: JSON.stringify(trackEntry),
      headers: { 'content-type': 'application/json;charset=utf-8'}
    })
    .then(() => console.log('tracked'))
    .catch((e) => console.error('quack!', e))
}

const listenTo = (events) => {
  events.forEach((event) => {
    document.addEventListener(event, () => {
      publishMarkup(getCurrentHTML())
    }, false)
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
