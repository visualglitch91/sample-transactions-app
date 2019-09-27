import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import useCurrency from '../../hooks/use-currency'

function Transaction({ id, description, date, amount, type }) {
  const currency = useCurrency()

  return (
    <ListItem>
      <ListItemText
        primary={description}
        secondary={currency(amount, { negative: type === 'debit' })}
        secondaryTypographyProps={{ style: { color: type === 'debit' ? 'red' : 'green' } }}
      />
    </ListItem>
  )
}

export default Transaction
