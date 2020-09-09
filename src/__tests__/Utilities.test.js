import { sortArrayBy } from '../utilities'

import UnsortableCatalogs from './test-data/UnsortableCatalogs.json'
import CatalogsWithMissingProperties from './test-data/CatalogsWithMissingProperties.json'
import CatalogsWithSomeMissingProperties from './test-data/CatalogsWithSomeMissingProperties.json'

test('Returns the array if type does not match a case', () => {
  const array = ['array with unrecognized type']
  const sortedArray = sortArrayBy(array, 'by', 'number')

  expect(sortedArray).toBe(array)
})

test('Returns unsorted array if sorting on type nestedString is not possible', () => {
  const sortedArray = sortArrayBy(UnsortableCatalogs, 'path', 'nestedString')

  expect(sortedArray).toBe(UnsortableCatalogs)
})

test('Returns unsorted array if sorting on type timestamp is not possible', () => {
  const sortedArray = sortArrayBy(UnsortableCatalogs, 'timestamp', 'timestamp')

  expect(sortedArray).toBe(UnsortableCatalogs)
})

test('Returns sorted array with empty values first if sorting an array of objects where properties are missing', () => {
  const arrayWithMissingPropertiesReversed = [...CatalogsWithSomeMissingProperties].reverse()
  const sortedArray = sortArrayBy(CatalogsWithSomeMissingProperties, 'state', 'string')
  const sortedArrayReverse = sortArrayBy(arrayWithMissingPropertiesReversed, 'state', 'string')

  expect(sortedArray).toStrictEqual(arrayWithMissingPropertiesReversed)
  expect(sortedArrayReverse).toStrictEqual(CatalogsWithSomeMissingProperties)
})

test('Returns unsorted array if sorting an array of objects where all properties are missing', () => {
  const sortedArray = sortArrayBy(CatalogsWithMissingProperties, 'state', 'string')

  expect(sortedArray).toBe(CatalogsWithMissingProperties)
})
