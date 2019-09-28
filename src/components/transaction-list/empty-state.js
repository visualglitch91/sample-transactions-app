import React from 'react'
import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import grey from '@material-ui/core/colors/grey'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  wrapper: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    padding: theme.spacing(2)
  },
  icon: {
    fontSize: 60,
    color: grey[400]
  },
  title: {
    color: grey[400],
    marginBottom: theme.spacing(1)
  },
  text: {
    color: grey[700],
    marginBottom: theme.spacing(2)
  }
}))

function EmptyState({ onAddTransaction }) {
  const classes = useStyles()

  return (
    <div id="transaction-list__empty-state" className={classes.wrapper}>
      <Icon className={classes.icon}>mood</Icon>
      <Typography variant="h6" className={classes.title}>
        Nenhuma transação!
      </Typography>
      <Typography variant="body2" className={classes.text}>
        Clique no botão abaixo para cadastrar sua primeira transação
      </Typography>
      <Button
        id="transaction-list__empty-state__add-transaction"
        color="primary"
        variant="contained"
        onClick={onAddTransaction}
      >
        Adicionar transação
      </Button>
    </div>
  )
}

export default EmptyState
