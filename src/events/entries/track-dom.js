import jsBase64 from 'js-base64'
import { getPreviousHTML, setPreviousHTML, getCurrentHTML } from 'browser'

export default () => {
  const markup = getCurrentHTML()
  if (markup === getPreviousHTML()) {
    return
  }

  setPreviousHTML(markup)

  return {
    markup: jsBase64.Base64.encode(markup)
  }
}
