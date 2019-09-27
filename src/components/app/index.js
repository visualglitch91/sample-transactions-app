import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper'
import Footer from '../footer'
import AddTransactionDialog from '../add-transaction-dialog'
import TransactionList from '../transaction-list'
import styles from './index.module.css'

function App() {
  const [showDialog, setShowDialog] = useState(false)

  function toggleDialog() {
    setShowDialog(flag => !flag)
  }

  return (
    <Paper className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.innerContent}>
          <TransactionList />
        </div>
      </div>
      <Footer onAdd={toggleDialog} />
      {showDialog && <AddTransactionDialog onClose={toggleDialog} />}
    </Paper>
  )
}

export default App
