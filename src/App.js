import React, { useContext, useState } from 'react'
import { Segment } from 'semantic-ui-react'

import { AppHome, AppMenu, AppSettings } from './components'
import { ApiContext, LanguageContext } from './context/AppContext'

function App () {
  const { api } = useContext(ApiContext)
  const { language } = useContext(LanguageContext)

  const [settingsOpen, setSettingsOpen] = useState(false)

  return (
    <>
      <AppMenu setSettingsOpen={setSettingsOpen} />
      <Segment basic>
        <AppHome restApi={api} language={language} />
      </Segment>
      <AppSettings open={settingsOpen} setOpen={setSettingsOpen} />
    </>
  )
}

export default App
