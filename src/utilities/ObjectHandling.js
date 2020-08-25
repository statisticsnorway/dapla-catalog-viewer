export const findCommonPrefixes = catalogs => {
  const prefixes = catalogs.map(catalog => catalog.id.path.split('/').filter(element => element !== '').slice(0, 1))
  const mergedPrefixes = [].concat.apply([], prefixes)
  const countedPrefixes = mergedPrefixes.reduce((acc, e) => {
    if (e in acc) {
      acc[e]++
    } else {
      acc[e] = 1
    }

    return acc
  }, {})

  return Object.entries(countedPrefixes).sort((a, b) => b[1] - a[1]).filter(value => value[1] >= 3)
}

export const sortArrayBy = (array, by, type) => {
  switch (type) {
    case 'string':
      return array.sort((a, b) => {
        if (a.hasOwnProperty(by) && b.hasOwnProperty(by)) {
          return a[by].localeCompare(b[by])
        } else if (a.hasOwnProperty(by)) {
          return a[by].localeCompare('')
        } else if (b.hasOwnProperty(by)) {
          return ''.localeCompare(b[by])
        } else {
          return 0
        }
      })

    case 'timestamp':
      return array.sort((a, b) => {
        if (a.id.hasOwnProperty(by) && b.id.hasOwnProperty(by)) {
          return new Date(b.id[by] - 1000) - new Date(a.id[by] - 1000)
        } else {
          return 0
        }
      })

    case 'nestedString':
      return array.sort((a, b) => {
        if (a.id.hasOwnProperty(by) && b.id.hasOwnProperty(by)) {
          return a.id[by].localeCompare(b.id[by])
        } else {
          return 0
        }
      })

    default:
      return array
  }
}
