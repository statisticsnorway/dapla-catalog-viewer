import { sortArrayBy } from '../utilities'

const unsortableArray = [
  {
    id: {
      path: '/test/path/1'
    }
  },
  {
    id: {
      timestamp: '1595926728857'
    }
  }
]

test('Returns the array if type does not match a case', () => {
  const array = ['array with unrecognized type']
  const sortedArray = sortArrayBy(array, 'by', 'number')

  expect(sortedArray).toBe(array)
})

test('Returns unsorted array if sorting on type nestedString is not possible', () => {
  const sortedArray = sortArrayBy(unsortableArray, 'path', 'nestedString')

  expect(sortedArray).toBe(unsortableArray)
})

test('Returns unsorted array if sorting on type timestamp is not possible', () => {
  const sortedArray = sortArrayBy(unsortableArray, 'timestamp', 'timestamp')

  expect(sortedArray).toBe(unsortableArray)
})

test('Returns sorted array with empty values first if sorting an array of objects where properties are missing', () => {
  const arrayWithMissingProperties = [
    {
      id: {
        path: '/test/path/1'
      },
      state: 'RAW'
    },
    {
      id: {
        path: '/test/path/2'
      }
    },
    {
      id: {
        path: '/test/path/3'
      },
      state: 'OTHER'
    }
  ]
  const arrayWithMissingPropertiesReversed = arrayWithMissingProperties.reverse()
  const sortedArray = sortArrayBy(arrayWithMissingProperties, 'state', 'string')
  const sortedArrayReverse = sortArrayBy(arrayWithMissingPropertiesReversed, 'state', 'string')

  expect(sortedArray).toBe(arrayWithMissingPropertiesReversed)
  expect(sortedArrayReverse).toBe(arrayWithMissingProperties)
})

test('Returns unsorted array if sorting an array of objects where all properties are missing', () => {
  const arrayWithMissingProperties = [
    {
      id: {
        path: '/test/path/1'
      }
    },
    {
      id: {
        path: '/test/path/2'
      }
    }
  ]
  const sortedArray = sortArrayBy(arrayWithMissingProperties, 'state', 'string')

  expect(sortedArray).toBe(arrayWithMissingProperties)
})
