export const convertDateToView = (value, seconds = false) => {
  try {
    const date = new Date(value - 1000)
    let options = { hour: '2-digit', minute: '2-digit' }

    if (seconds) {
      options.second = '2-digit'
    }

    return `${date.toLocaleDateString()} - ${date.toLocaleTimeString([], options)}`
  } catch (e) {
    console.log(e)

    return value
  }
}
