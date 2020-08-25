import React from 'react'
import { Label } from 'semantic-ui-react'
import { SSB_COLORS } from '@statisticsnorway/dapla-js-utilities'

function CatalogLabels ({ commonPrefixes, length, setFilterBy }) {
  return (
    <>
      {commonPrefixes.map(commonPrefix =>
        <Label
          as='a'
          size='large'
          key={commonPrefix[0]}
          onClick={() => setFilterBy(`/${commonPrefix[0]}/`)}
          style={{ backgroundColor: SSB_COLORS.BLUE, marginRight: '1rem' }}
        >
          {`/${commonPrefix[0]}`}
          <Label.Detail>{`(${commonPrefix[1]})`}</Label.Detail>
        </Label>
      )}
      <Label as='a' size='large' onClick={() => setFilterBy('')} style={{ backgroundColor: SSB_COLORS.BLUE }}>
        {`/`}
        <Label.Detail>{`(${length})`}</Label.Detail>
      </Label>
    </>
  )
}

export default CatalogLabels
