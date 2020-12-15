import React, { useContext, useRef, useState } from 'react'
import { Ref, Segment } from 'semantic-ui-react'

import { AppHome, AppMenu, AppSettings } from './components'
import { ApiContext, LanguageContext } from './context/AppContext'

function App () {
  const { api } = useContext(ApiContext)
  const { language } = useContext(LanguageContext)

  const appRefArea = useRef()

  const [settingsOpen, setSettingsOpen] = useState(false)

  return (
    <>
      <AppMenu setSettingsOpen={setSettingsOpen} context={appRefArea} />
      <Ref innerRef={appRefArea}>
        <Segment basic>
          <AppHome restApi={api} language={language} />
        </Segment>
      </Ref>
      <AppSettings open={settingsOpen} setOpen={setSettingsOpen} />
    </>
  )
}

export default App
