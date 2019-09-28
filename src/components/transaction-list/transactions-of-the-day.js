import React from 'react'
import ListSubheader from '@material-ui/core/ListSubheader'
import { makeStyles } from '@material-ui/core/styles'
import Transaction from './transaction'

const useStyles = makeStyles(theme => ({
  transactionsOfTheDay: {
    margin: 0,
    padding: 0,
    background: 'white',
    borderTop: '1px solid #eee'
  },
  subheader: {
    marginBottom: -11
  }
}))

function parseDate(date) {
  const [year, month, day] = date.split('-')
  return `${day}/${month}/${year}`
}

function TransactionsOfTheDay({ date, transactions }) {
  const classes = useStyles()

  return (
    <li>
      <ul className={classes.transactionsOfTheDay}>
        <ListSubheader className={classes.subheader}>{parseDate(date)}</ListSubheader>
        {transactions.map(transaction => (
          <Transaction key={transaction.id} {...transaction} />
        ))}
      </ul>
    </li>
  )
}

export default TransactionsOfTheDay
