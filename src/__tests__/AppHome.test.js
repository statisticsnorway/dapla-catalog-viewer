import React from 'react'
import useAxios from 'axios-hooks'
import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'

import { AppHome } from '../components'
import { TEST_CONFIGURATIONS } from '../configurations/TEST'
import { UI } from '../enums'

import TestCatalogs from './test-data/TestCatalogs.json'
import EmptyCatalogs from './test-data/EmptyCatalogs.json'
import BrokenCatalogs from './test-data/BrokenCatalogs.json'
import CorruptedCatalogs from './test-data/CorruptedCatalogs.json'

jest.mock('../components/views/PseudoConfigView', () => () => null)

global.console = {
  log: jest.fn()
}

const { errorString, language, testPath } = TEST_CONFIGURATIONS
const apiContext = TEST_CONFIGURATIONS.apiContext(jest.fn())
const refetch = jest.fn()

const setup = () => {
  const { getAllByText, getByTestId, getByText, getByPlaceholderText, queryAllByText } = render(
    <AppHome restApi={apiContext.api} language={language} />
  )

  return { getAllByText, getByTestId, getByText, getByPlaceholderText, queryAllByText }
}

describe('Common mock', () => {
  beforeEach(() => {
    useAxios.mockReturnValue([{ data: TestCatalogs, error: undefined, loading: false }, refetch])
  })

  test('Filtering catalogs table works correctly', async () => {
    const { getByPlaceholderText, getByText, queryAllByText } = setup()

    expect(getByText(testPath)).toBeInTheDocument()

    await userEvent.type(getByPlaceholderText(UI.FILTER_TABLE[language]), '/another')

    expect(queryAllByText(testPath)).toHaveLength(0)
  })

  test('Clicking labels filters catalogs rable correctly', () => {
    const { getAllByText, getByText, queryAllByText } = setup()

    expect(getByText(testPath)).toBeInTheDocument()

    userEvent.click(getAllByText('/another')[0])

    expect(queryAllByText(testPath)).toHaveLength(0)

    userEvent.click(getByText('/'))

    expect(getByText(testPath)).toBeInTheDocument()
  })

  test('Table sorting works correctly', () => {
    const { getByText } = setup()

    userEvent.click(getByText(UI.PATH[language]))
    userEvent.click(getByText(UI.PATH[language]))
    userEvent.click(getByText(UI.TYPE[language]))
    userEvent.click(getByText(UI.STATE[language]))
    userEvent.click(getByText(UI.VALUATION[language]))
    userEvent.click(getByText(UI.TIMESTAMP[language]))
  })
})

test('Does not crash', () => {
  useAxios.mockReturnValue([{ data: EmptyCatalogs, error: undefined, loading: false }, refetch])
  const { getByPlaceholderText } = setup()

  expect(getByPlaceholderText(UI.FILTER_TABLE[language]))
})

test('Shows loading', () => {
  useAxios.mockReturnValue([{ data: undefined, error: undefined, loading: true }, refetch])
  setup()
})

test('Handles API returning something else than an array of catalogs', () => {
  useAxios.mockReturnValue([{ data: CorruptedCatalogs, error: undefined, loading: false }, refetch])
  setup()

  expect(global.console.log).toHaveBeenCalledWith('Recieved catalogs is not of Array format, recieved was:')
})

test('Handles API returning catalogs with missing or broken information', () => {
  useAxios.mockReturnValue([{ data: BrokenCatalogs, error: undefined, loading: false }, refetch])
  const { queryAllByText } = setup()

  expect(queryAllByText('Invalid Date - Invalid Date')).toHaveLength(1)
})

test('Renders error when api returns error', () => {
  useAxios.mockReturnValue([{ data: undefined, error: errorString, loading: false }, refetch])
  const { getByText } = setup()

  expect(getByText(errorString)).toBeInTheDocument()
})
