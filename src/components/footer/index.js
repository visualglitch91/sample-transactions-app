import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import { useStore } from '../../store'
import useCurrency from '../../hooks/use-currency'
import styles from './index.module.css'

function Footer({ onAdd }) {
  const currency = useCurrency()
  const { transactions } = useStore()
  const balance = transactions.reduce(
    (balance, { amount, type }) => (type === 'credit' ? balance + amount : balance - amount),
    0
  )

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <p id="footer__balance" className={styles.balance}>{`Saldo: ${currency(balance)}`}</p>
        <IconButton
          id="footer__add-transaction"
          size="small"
          color="inherit"
          onClick={onAdd}
          aria-label="adicionar transação"
        >
          <Icon>add</Icon>
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default Footer
