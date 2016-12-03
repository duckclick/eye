import API from './api'

const getCurrentHTML = () =>
  document.getElementsByTagName('html')[0].outerHTML

const publishMarkup = (markup) => {
  const trackEntry = {
    created_at: new Date().getTime(),
    markup: btoa(markup)
  }

  API.Wing
    .trackDOM({
      body: JSON.stringify(trackEntry),
      headers: { 'content-type': 'application/json;charset=utf-8'}
    })
    .then(() => console.log('tracked'))
    .catch(() => console.log('quack!'))
}

const listenTo = (events) => {
  events.forEach((event) => {
    document.addEventListener(event, () => {
      publishMarkup(getCurrentHTML())
    }, false)
  })
}

document.addEventListener('DOMContentLoaded', () => {
  listenTo(['DOMNodeInserted', 'DOMNodeRemoved'])
  publishMarkup(getCurrentHTML())
}, false)
