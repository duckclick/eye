import throttle from 'lodash.throttle'
import { isInTheViewport } from 'screen'
import dispatch from 'events/dispatch'

const THROTTLE_WAIT = 150

const listenTo = (names) => {
  names.forEach((eventName) => {
    const listener = (event) => {
      if (!isInTheViewport(event.target)) {
        return
      }

      dispatch(event)
    }

    document.addEventListener(
      eventName,
      throttle(listener, THROTTLE_WAIT),
      false
    )
  })
}

export default () => {
  listenTo(['DOMNodeInserted', 'DOMNodeRemoved'])
  dispatch({ type: 'DOMNodeInserted' })
}
