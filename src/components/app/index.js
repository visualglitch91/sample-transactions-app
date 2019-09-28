import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper'
import Footer from '../footer'
import AddTransactionDialog from '../add-transaction-dialog'
import ChangeCurrencyDialog from '../change-currency-dialog'
import TransactionList from '../transaction-list'
import styles from './index.module.css'

function App() {
  const [showAddTransactionDialog, setShowAddTransactionDialog] = useState(false)
  const [showChangeCurrencyDialog, setShowChangeCurrencyDialog] = useState(false)

  function toggleAddTransactionDialog() {
    setShowAddTransactionDialog(flag => !flag)
  }
  function toggleChangeCurrencyDialog() {
    setShowChangeCurrencyDialog(flag => !flag)
  }

  return (
    <Paper className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.innerContent}>
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
