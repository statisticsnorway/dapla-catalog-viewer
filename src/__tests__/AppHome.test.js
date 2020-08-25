import React from 'react'
import useAxios from 'axios-hooks'
import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'

import { AppHome } from '../components'
import { TEST_CONFIGURATIONS } from '../configurations/TEST'
import { TEST_IDS, UI } from '../enums'

jest.mock('../components/views/PseudoConfigView', () => () => null)

const { catalogs, emptyCatalogs, errorString, language } = TEST_CONFIGURATIONS
const apiContext = TEST_CONFIGURATIONS.apiContext(jest.fn())
const refetch = jest.fn()

const setup = () => {
  const { getAllByText, getByTestId, getByText, getByPlaceholderText, queryAllByText } = render(
    <AppHome restApi={apiContext.api} language={language} />
  )

  return { getAllByText, getByTestId, getByText, getByPlaceholderText, queryAllByText }
}

describe('Common mock', () => {
  useAxios.mockReturnValue([{ data: catalogs, error: undefined, loading: false }, refetch])

  test('Filtering catalogs table works correctly', async () => {
    const { getByPlaceholderText, getByText, queryAllByText } = setup()

    expect(getByText('/test/path/1')).toBeInTheDocument()

    await userEvent.type(getByPlaceholderText(UI.FILTER_TABLE[language]), '/another')

    expect(queryAllByText('/test/path/1')).toHaveLength(0)
  })

  test('Clicking labels filters catalogs rable correctly', () => {
    const { getAllByText, getByText, queryAllByText } = setup()

    expect(getByText('/test/path/1')).toBeInTheDocument()

    userEvent.click(getAllByText('/another')[0])

    expect(queryAllByText('/test/path/1')).toHaveLength(0)

    userEvent.click(getByText('/'))

    expect(getByText('/test/path/1')).toBeInTheDocument()
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

  test('Refetch triggers correctly', () => {
    const { getByTestId } = setup()

    userEvent.click(getByTestId(TEST_IDS.REFETCH_DATA_ICON))

    expect(refetch).toHaveBeenCalled()
  })
})

test('Does not crash', () => {
  useAxios.mockReturnValue([{ data: emptyCatalogs, error: undefined, loading: false }, refetch])
  const { getByPlaceholderText } = setup()

  expect(getByPlaceholderText(UI.FILTER_TABLE[language]))
})

test('Renders error when api returns error', () => {
  useAxios.mockReturnValue([{ data: undefined, error: errorString, loading: false }, refetch])
  const { getByText } = setup()

  expect(getByText(errorString)).toBeInTheDocument()
})
