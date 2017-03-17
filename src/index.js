import setupEvents from 'events'

let loaded = false

const boot = () => {
  if (loaded) {
    return
  }

  loaded = true
  setupEvents()
}

export default boot
document.addEventListener('DOMContentLoaded', () => boot(), false)
window.onDuckClickEyeLoaded && onDuckClickEyeLoaded(boot)
