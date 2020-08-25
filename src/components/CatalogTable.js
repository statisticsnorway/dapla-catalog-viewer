import React from 'react'
import { Popup, Table } from 'semantic-ui-react'
import { truncateString } from '@statisticsnorway/dapla-js-utilities'

import { PseudoConfigView } from './views'
import { convertDateToView } from '../utilities'
import { API, VALUATION_COLORS } from '../configurations'
import { UI } from '../enums'

function CatalogTable ({ catalogs, handleSort, language, sortedBy, sortDirection }) {
  return (
    <Table celled selectable sortable basic='very' compact='very' size='large'>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell
            onClick={() => handleSort(API.CATALOG_OBJECT.OBJECT.STRING[0], 'nestedString')}
            sorted={sortedBy === API.CATALOG_OBJECT.OBJECT.STRING[0] ? sortDirection : null}
          >
            {UI.PATH[language]}
          </Table.HeaderCell>
          <Table.HeaderCell
            onClick={() => handleSort(API.CATALOG_OBJECT.OBJECT.STRING[1], 'timestamp')}
            sorted={sortedBy === API.CATALOG_OBJECT.OBJECT.STRING[1] ? sortDirection : null}
          >
            {UI.TIMESTAMP[language]}
          </Table.HeaderCell>
          <Table.HeaderCell
            onClick={() => handleSort(API.CATALOG_OBJECT.ENUM[2], 'string')}
            sorted={sortedBy === API.CATALOG_OBJECT.ENUM[2] ? sortDirection : null}
          >
            {UI.TYPE[language]}
          </Table.HeaderCell>
          <Table.HeaderCell
            onClick={() => handleSort(API.CATALOG_OBJECT.ENUM[0], 'string')}
            sorted={sortedBy === API.CATALOG_OBJECT.ENUM[0] ? sortDirection : null}
          >
            {UI.VALUATION[language]}
          </Table.HeaderCell>
          <Table.HeaderCell
            onClick={() => handleSort(API.CATALOG_OBJECT.ENUM[1], 'string')}
            sorted={sortedBy === API.CATALOG_OBJECT.ENUM[1] ? sortDirection : null}
          >
            {UI.STATE[language]}
          </Table.HeaderCell>
          <Table.HeaderCell>{UI.PSEUDO_CONFIG[language]}</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {catalogs.map(({ id, pseudoConfig, state, type, valuation }, index) =>
          <Table.Row key={index}>
            <Table.Cell style={{ fontWeight: 'bold' }}>
              {id[API.CATALOG_OBJECT.OBJECT.STRING[0]].length > 100 ?
                <Popup
                  basic
                  flowing
                  trigger={<div>{truncateString(id[API.CATALOG_OBJECT.OBJECT.STRING[0]], 100)}</div>}
                >
                  {id[API.CATALOG_OBJECT.OBJECT.STRING[0]]}
                </Popup>
                :
                id[API.CATALOG_OBJECT.OBJECT.STRING[0]]
              }
            </Table.Cell>
            <Table.Cell>{convertDateToView(id[API.CATALOG_OBJECT.OBJECT.STRING[1]])}</Table.Cell>
            <Table.Cell>{type}</Table.Cell>
            <Table.Cell style={{ color: VALUATION_COLORS[valuation] }}>{valuation}</Table.Cell>
            <Table.Cell>{state}</Table.Cell>
            <Table.Cell textAlign='center'>
              <PseudoConfigView
                language={language}
                pseudoConfig={pseudoConfig}
                catalog={id[API.CATALOG_OBJECT.OBJECT.STRING[0]]}
              />
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  )
}

export default CatalogTable
