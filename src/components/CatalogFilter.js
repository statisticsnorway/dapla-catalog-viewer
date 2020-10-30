import React from 'react'
import { Grid, Icon, Input } from 'semantic-ui-react'
import { InfoPopup, SSB_COLORS } from '@statisticsnorway/dapla-js-utilities'

import { UI } from '../enums'

function CatalogFilter ({ error, loading, filterBy, language, setFilterBy, refetch, fetchTime }) {
  return (
    <Grid columns='equal'>
      <Grid.Column>
        <Input
          fluid
          size='large'
          icon='search'
          value={filterBy}
          disabled={loading || !!error}
          placeholder={UI.FILTER_TABLE[language]}
          onChange={(event, { value }) => setFilterBy(value)}
        />
      </Grid.Column>
      <Grid.Column />
      <Grid.Column />
      <Grid.Column textAlign='right' verticalAlign='middle'>
        <InfoPopup
          position='left center'
          text={UI.REFRESH_TABLE[language]}
          trigger={
            <Icon
              link
              name='sync'
              size='large'
              onClick={refetch}
              loading={loading}
              disabled={loading}
              style={{ color: SSB_COLORS.BLUE }}
            />
          }
        />
        {`${UI.DATA_LAST_FETCHED[language]}: ${loading ? '-' : fetchTime}`}
      </Grid.Column>
    </Grid>
  )
}

export default CatalogFilter
