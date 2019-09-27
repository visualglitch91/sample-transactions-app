import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import { useDispatch } from '../../store'
import useCurrency from '../../hooks/use-currency'

function Transaction({ id, description, date, amount, type }) {
  const currency = useCurrency()
  const dispatch = useDispatch()

  function remove() {
    dispatch('REMOVE', id)
  }

  return (
    <ListItem id={`transaction__${id}`}>
      <ListItemText
        primary={description}
        secondary={currency(type === 'credit' ? amount : -amount)}
        secondaryTypographyProps={{ style: { color: type === 'debit' ? 'red' : 'green' } }}
      />

      <ListItemSecondaryAction>
        <IconButton
          id={`transaction__${id}__remove`}
          edge="end"
          aria-label="remover transação"
          onClick={remove}
        >
          <Icon>delete</Icon>
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

export default Transaction
