const THRESHOLD = 0

let screenWidth = null
let screenHeight = null

const getScreenHeight = () => {
  if (!screenHeight) {
    screenHeight = window.innerHeight || document.documentElement.clientHeight
  }

  return screenHeight
}

const getScreenWidth = () => {
  if (!screenWidth) {
    screenWidth = window.innerWidth || document.documentElement.clientWidth
  }

  return screenWidth
}

export const isInTheViewport = (element) => {
  if (!element.getBoundingClientRect) {
    return false
  }

  const rect = element.getBoundingClientRect()
  const x1 = -THRESHOLD
  const y1 = -THRESHOLD
  const y2 = getScreenHeight() - y1
  const x2 = getScreenWidth() - x1

  return (
    (rect.top >= y1 && rect.top <= y2 || rect.bottom >= y1 && rect.bottom <= y2) &&
    (rect.left >= x1 && rect.left <= x2 || rect.right >= x1 && rect.right <= x2)
  )
}
