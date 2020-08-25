import React, { useState } from 'react'
import { Header, Icon, Modal } from 'semantic-ui-react'
import { SSB_COLORS, SSB_STYLE } from '@statisticsnorway/dapla-js-utilities'

import { TEST_IDS, UI } from '../../enums'

function PseudoConfigView ({ catalog, pseudoConfig, language }) {
  const [modalOpen, setModalOpen] = useState(false)

  if (typeof pseudoConfig === 'object' && pseudoConfig !== null) {
    if (Object.keys(pseudoConfig).length !== 0) {
      return (
        <Modal
          closeIcon
          size='large'
          open={modalOpen}
          style={SSB_STYLE}
          onClose={() => setModalOpen(false)}
          trigger={
            <Icon
              link
              name='key'
              data-testid={TEST_IDS.PSEUDO_CONFIG_ICON}
              style={{ color: SSB_COLORS.YELLOW }}
              onClick={() => setModalOpen(true)}
            />
          }
        >
          <Header size='large' style={SSB_STYLE}>
            <Icon name='key' style={{ color: SSB_COLORS.YELLOW }} />
            <Header.Content>
              {UI.PSEUDO_CONFIG[language]}
              <Header.Subheader>{catalog}</Header.Subheader>
            </Header.Content>
          </Header>
          <Modal.Content style={SSB_STYLE}>
            <pre>{JSON.stringify(pseudoConfig, null, 2)}</pre>
          </Modal.Content>
        </Modal>
      )
    } else {
      return null
    }
  } else {
    return null
  }
}

export default PseudoConfigView
