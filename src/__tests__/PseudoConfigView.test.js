import React from 'react'
import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'

import { PseudoConfigView } from '../components/views'
import { TEST_CONFIGURATIONS } from '../configurations/TEST'
import { TEST_IDS, UI } from '../enums'

import TestCatalogs from './test-data/TestCatalogs.json'

const { language } = TEST_CONFIGURATIONS
const testCatalog = TestCatalogs.catalogs[0]

const setup = () => {
  const { getByPlaceholderText, getByTestId, getByText } = render(
    <PseudoConfigView catalog={testCatalog.id.path} pseudoConfig={testCatalog.pseudoConfig} language={language} />
  )

  return { getByPlaceholderText, getByTestId, getByText }
}

test('Renders correctly', () => {
  const { getByTestId, getByText } = setup()

  userEvent.click(getByTestId(TEST_IDS.PSEUDO_CONFIG_ICON))

  expect(getByText(UI.PSEUDO_CONFIG[language])).toBeInTheDocument()
})
