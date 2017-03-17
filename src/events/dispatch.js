import publish from 'events/publish'
import trackDOM from 'events/entries/track-dom'

export default (event) => {
  switch (event.type) {
    case 'DOMNodeInserted':
    case 'DOMNodeRemoved':
      publish(trackDOM(event))
      break
  }
}
