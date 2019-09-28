import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import { styled } from '@material-ui/core/styles'
import Balance from './balance'

const Grow = styled('div')({ flexGrow: 1 })

function Footer({ onAddTransaction, onChangeCurrency }) {
  return (
    <AppBar position="static" color="primary" id="footer">
      <Toolbar>
        <Balance />
        <Grow />
        <IconButton
          id="footer__change-currency"
          size="small"
          color="inherit"
          onClick={onChangeCurrency}
          aria-label="alterar moeda"
        >
          <Icon>attach_money</Icon>
        </IconButton>
        <IconButton
          id="footer__add-transaction"
          size="small"
          color="inherit"
          onClick={onAddTransaction}
          aria-label="adicionar transação"
        >
          <Icon>add</Icon>
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default Footer
