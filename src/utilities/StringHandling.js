export const convertDateToView = (value, seconds = false) => {
  if (value !== undefined) {
    const date = new Date(value - 1000)
    let options = { hour: '2-digit', minute: '2-digit' }

    if (seconds) {
      options.second = '2-digit'
    }

    return `${date.toLocaleDateString()} - ${date.toLocaleTimeString([], options)}`
  } else {
    return value
  }
}
