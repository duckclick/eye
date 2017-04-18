import throttle from 'lodash.throttle'
import { isInTheViewport } from 'screen'
import dispatch from 'events/dispatch'
import { info, error } from 'logger'

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
  info('Setup events done')
}
