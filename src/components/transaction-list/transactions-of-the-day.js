import React from 'react'
import ListSubheader from '@material-ui/core/ListSubheader'
import Transaction from './transaction'
import styles from './transactions-of-the-day.module.css'

function parseDate(date) {
  const [year, month, day] = date.split('-')
  return `${day}/${month}/${year}`
}

function TransactionsOfTheDay({ date, transactions }) {
  return (
    <li>
      <ul className={styles.transactionsOfTheDay}>
        <ListSubheader className={styles.subheader}>{parseDate(date)}</ListSubheader>
        {transactions.map(transaction => (
          <Transaction key={transaction.id} {...transaction} />
        ))}
      </ul>
    </li>
  )
}

export default TransactionsOfTheDay
