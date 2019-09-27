import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
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
