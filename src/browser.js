let previousHTML = null

export const getPreviousHTML = () => previousHTML
export const setPreviousHTML = (html) => previousHTML = html
export const getCurrentHTML = () => document.getElementsByTagName('html')[0].outerHTML
