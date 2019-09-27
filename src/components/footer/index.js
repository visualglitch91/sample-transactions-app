import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'

function Footer({ onAdd }) {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Button id="footer__add-transaction" size="small" color="inherit" onClick={onAdd}>
          <Icon style={{ marginTop: -2 }} aria-hidden>
            add
          </Icon>
          Adicionar transação
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Footer
