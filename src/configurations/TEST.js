import { LANGUAGE } from '@statisticsnorway/dapla-js-utilities'

import TestCatalogs from '../__tests__/test-data/TestCatalogs.json'

export const TEST_CONFIGURATIONS = {
  alternativeApi: 'http://localhost:9999',
  apiContext: (fn) => ({
    api: process.env.REACT_APP_API,
    setApi: fn
  }),
  catalogs: TestCatalogs,
  emptyCatalogs: { catalogs: [] },
  errorString: 'A problem occured',
  language: LANGUAGE.LANGUAGES.NORWEGIAN.languageCode,
  otherLanguage: LANGUAGE.LANGUAGES.ENGLISH.languageCode
}
