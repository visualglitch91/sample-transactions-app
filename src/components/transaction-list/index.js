import React from 'react'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { useStore } from '../../store'
import TransactionsOfTheDay from './transactions-of-the-day'
import EmptyState from './empty-state'

const useStyles = makeStyles(theme => ({
  wrapper: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    padding: theme.spacing(3, 2, 0)
  }
}))

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
  const classes = useStyles()
  const { transactions } = useStore()
  const transactionsByDay = sortTransactionsByDate(transactions).reduce((days, transaction) => {
    days[transaction.date] = [...(days[transaction.date] || []), transaction]
    return days
  }, {})

  return (
    <div id="transaction-list" className={classes.wrapper}>
      <Typography variant="h5" gutterBottom className={classes.title}>
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
