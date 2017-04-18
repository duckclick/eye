import setupEvents from 'events'
import { info, error } from 'logger'

let loaded = false

const boot = () => {
  if (loaded) {
    return
  }

  info('Loading...')
  loaded = true
  setupEvents()
}

export default boot
document.addEventListener('DOMContentLoaded', () => boot(), false)
window.onDuckClickEyeLoaded && onDuckClickEyeLoaded(boot)
