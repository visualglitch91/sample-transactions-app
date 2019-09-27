import React from 'react'
import { Field } from 'formik'
import TextField from '@material-ui/core/TextField'
import useCurrency from '../../hooks/use-currency'

function MoneyInput({ label, ...props }) {
  const currency = useCurrency()

  return (
    <Field
      {...props}
      render={({ field: { value, onChange, ...field }, form: { touched, errors } }) => {
        const error = touched[field.name] && errors[field.name]

        return (
          <TextField
            {...field}
            value={currency(value)}
            onChange={event =>
              onChange({
                target: {
                  name: event.target.name,
                  value: parseInt(event.target.value.replace(/[^0-9]/g, ''))
                }
              })
            }
            label={label}
            error={Boolean(error)}
            helperText={error}
            fullWidth
            margin="normal"
            variant="outlined"
          />
        )
      }}
    />
  )
}

export default MoneyInput
