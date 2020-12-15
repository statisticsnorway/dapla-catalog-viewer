import React from 'react'
import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'

import { PseudoConfigView } from '../components/views'
import { TEST_CONFIGURATIONS } from '../configurations/TEST'
import { TEST_IDS, UI } from '../enums'

import TestCatalogs from './test-data/TestCatalogs.json'

const { language } = TEST_CONFIGURATIONS

const setup = (id, pseudoConfig) => {
  const { getByPlaceholderText, getByTestId, getByText } = render(
    <PseudoConfigView catalog={id.path} pseudoConfig={pseudoConfig} language={language} />
  )

  return { getByPlaceholderText, getByTestId, getByText }
}

test('Renders correctly', () => {
  const { id, pseudoConfig } = TestCatalogs.catalogs[0]
  const { getByTestId, getByText } = setup(id, pseudoConfig)

  userEvent.click(getByTestId(TEST_IDS.PSEUDO_CONFIG_ICON))

  expect(getByText(UI.PSEUDO_CONFIG[language])).toBeInTheDocument()
})

test('Renders nothing if received pseudoConfig is not an object', () => {
  const { id, pseudoConfig } = TestCatalogs.catalogs[1]
  setup(id, pseudoConfig)
})

test('Renders nothing if received pseudoConfig is empty', () => {
  const { id, pseudoConfig } = TestCatalogs.catalogs[2]
  setup(id, pseudoConfig)
})
