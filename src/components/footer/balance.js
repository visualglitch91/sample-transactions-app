import React from 'react'
import { useStore } from '../../store'
import useCurrency from '../../hooks/use-currency'

function Balance() {
  const currency = useCurrency()
  const { transactions } = useStore()
  const balance = transactions.reduce(
    (balance, { amount, type }) => (type === 'credit' ? balance + amount : balance - amount),
    0
  )

  return <p id="footer__balance">{`Saldo: ${currency(balance)}`}</p>
}

export default Balance
