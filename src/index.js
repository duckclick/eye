const getCurrentHTML = () =>
  document.getElementsByTagName('html')[0].outerHTML

const publishMarkup = (markup) => {
  console.log(markup)
}

const listenTo = (events) => {
  events.forEach((event) => {
    document.addEventListener(event, () => {
      publishMarkup(getCurrentHTML())
    }, false)
  })
}

listenTo(['DOMContentLoaded', 'DOMNodeInserted', 'DOMNodeRemoved'])
