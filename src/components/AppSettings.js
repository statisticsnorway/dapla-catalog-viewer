import React, { useContext, useEffect, useState } from 'react'
import useAxios from 'axios-hooks'
import { Button, Container, Divider, Form, Grid, Header, Icon, List, Modal, Segment } from 'semantic-ui-react'
import { ErrorMessage, InfoPopup, InfoText, SSB_COLORS, SSB_STYLE } from '@statisticsnorway/dapla-js-utilities'

import { ApiContext, LanguageContext } from '../context/AppContext'
import { API } from '../configurations'
import { SETTINGS, TEST_IDS } from '../enums'

function AppSettings ({ open, setOpen }) {
  const { api, setApi } = useContext(ApiContext)
  const { language } = useContext(LanguageContext)

  const [apiUrl, setApiUrl] = useState(api)
  const [settingsEdited, setSettingsEdited] = useState(false)

  const [{ error, loading }, execute] = useAxios(`${apiUrl}${API.GET_HEALTH}`, { manual: true, useCache: false })

  const applySettings = () => {
    execute()
    setApi(apiUrl)
    setSettingsEdited(false)
  }

  const changeSettings = (value) => {
    setApiUrl(value)
    setSettingsEdited(true)
  }

  const setDefaults = () => {
    setSettingsEdited(true)
    setApi(process.env.REACT_APP_API)
    setApiUrl(process.env.REACT_APP_API)
  }

  useEffect(() => {
    execute()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Modal open={open} onClose={() => setOpen(false)} style={SSB_STYLE}>
      <Header size='large' style={SSB_STYLE}>
        <Icon name='cog' style={{ color: SSB_COLORS.GREEN }} />
        {SETTINGS.HEADER[language]}
      </Header>
      <Modal.Content as={Segment} basic style={SSB_STYLE}>
        <Form size='large'>
          <Form.Input
            value={apiUrl}
            loading={loading}
            label={SETTINGS.API[language]}
            error={!!error && !settingsEdited}
            placeholder={SETTINGS.API[language]}
            onChange={(event, { value }) => changeSettings(value)}
            onKeyPress={({ key }) => key === 'Enter' && applySettings()}
            icon={!loading && !settingsEdited && !error ?
              <Icon name='check' style={{ color: SSB_COLORS.GREEN }} /> : null
            }
          />
        </Form>
        {!loading && !settingsEdited && error && <ErrorMessage error={error} language={language} />}
        {!loading && settingsEdited &&
        <Container style={{ marginTop: '0.5rem' }}>
          <InfoText text={SETTINGS.EDITED_VALUES[language]} />
        </Container>
        }
        <Container style={{ marginTop: '1rem' }}>
          <Divider hidden />
          <Grid columns='equal'>
            <Grid.Column>
              <Button primary size='large' disabled={loading} onClick={() => applySettings()}>
                <Icon name='sync' style={{ paddingRight: '0.5rem' }} />
                {SETTINGS.APPLY[language]}
              </Button>
            </Grid.Column>
            <Grid.Column textAlign='right'>
              <InfoPopup
                position='left center'
                text={SETTINGS.RESET_VALUES[language]}
                trigger={
                  <Icon
                    link
                    fitted
                    name='undo'
                    size='large'
                    onClick={() => setDefaults()}
                    style={{ color: SSB_COLORS.BLUE }}
                    data-testid={TEST_IDS.DEFAULT_SETTINGS_VALUES_BUTTON}
                  />
                }
              />
            </Grid.Column>
          </Grid>
        </Container>
      </Modal.Content>
      <Container fluid textAlign='center'>
        <Divider />
        <List horizontal divided link size='small' style={{ marginTop: '3rem', marginBottom: '3rem' }}>
          <List.Item as='a' href={`${process.env.REACT_APP_SOURCE_URL}`} icon={{ fitted: true, name: 'github' }} />
          <List.Item content={`${SETTINGS.APP_VERSION[language]}: ${process.env.REACT_APP_VERSION}`} />
        </List>
      </Container>
    </Modal>
  )
}

export default AppSettings
