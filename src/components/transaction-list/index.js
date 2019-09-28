import React from 'react'
import { useStore } from '../../store'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import TransactionsOfTheDay from './transactions-of-the-day'
import EmptyState from './empty-state'
import styles from './index.module.css'

function compareTransactionsByDate(a, b) {
  const dateA = new Date(a.date)
  const dateB = new Date(b.date)

  if (dateA > dateB) {
    return -1
  }

  if (dateA < dateB) {
    return 1
  }

  return 0
}

function sortTransactionsByDate(transactions) {
  const temp = [...transactions]
  temp.sort(compareTransactionsByDate)
  return temp
}

function TransactionList({ onAddTransaction }) {
  const { transactions } = useStore()
  const transactionsByDay = sortTransactionsByDate(transactions).reduce((days, transaction) => {
    days[transaction.date] = [...(days[transaction.date] || []), transaction]
    return days
  }, {})

  return (
    <div id="transaction-list">
      <Typography variant="h5" gutterBottom className={styles.title}>
        Transações
      </Typography>
      {transactions.length === 0 ? (
        <EmptyState onAddTransaction={onAddTransaction} />
      ) : (
        <List id="transaction-list__list">
          {Object.keys(transactionsByDay).map(date => (
            <TransactionsOfTheDay key={date} date={date} transactions={transactionsByDay[date]} />
          ))}
        </List>
      )}
    </div>
  )
}

export default TransactionList
