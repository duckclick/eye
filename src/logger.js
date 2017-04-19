const isDebugEnabled = () => !!window.localStorage.getItem('duckclick_eye_debug')

export const info = (...args) => isDebugEnabled() && console.info.apply(this, ['[duckclick.eye]', ...args])
export const error = (...args) => isDebugEnabled() && console.error.apply(this, ['[duckclick.eye]', ...args])
