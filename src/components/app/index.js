import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import Footer from '../footer'
import AddTransactionDialog from '../add-transaction-dialog'
import ChangeCurrencyDialog from '../change-currency-dialog'
import TransactionList from '../transaction-list'

const useStyles = makeStyles(theme => ({
  wrapper: {
    maxWidth: 770,
    width: '90%',
    height: '70%',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('xs')]: {
      maxWidth: '100%',
      width: '100%',
      height: '100%'
    },
    '@media (max-height: 800px)': {
      height: '100%'
    }
  },
  content: {
    flexGrow: 1,
    position: 'relative'
  },
  innerContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column'
  }
}))

function App() {
  const classes = useStyles()
  const [showAddTransactionDialog, setShowAddTransactionDialog] = useState(false)
  const [showChangeCurrencyDialog, setShowChangeCurrencyDialog] = useState(false)

  function toggleAddTransactionDialog() {
    setShowAddTransactionDialog(flag => !flag)
  }
  function toggleChangeCurrencyDialog() {
    setShowChangeCurrencyDialog(flag => !flag)
  }

  return (
    <Paper className={classes.wrapper}>
      <div className={classes.content}>
        <div className={classes.innerContent}>
          <TransactionList onAddTransaction={toggleAddTransactionDialog} />
        </div>
      </div>
      <Footer
        onAddTransaction={toggleAddTransactionDialog}
        onChangeCurrency={toggleChangeCurrencyDialog}
      />
      {showAddTransactionDialog && <AddTransactionDialog onClose={toggleAddTransactionDialog} />}
      {showChangeCurrencyDialog && <ChangeCurrencyDialog onClose={toggleChangeCurrencyDialog} />}
    </Paper>
  )
}

export default App
