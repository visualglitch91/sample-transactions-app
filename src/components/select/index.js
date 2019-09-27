import React from 'react'
import { Field } from 'formik'
import TextField from '@material-ui/core/TextField'

function Select({ label, children, ...props }) {
  return (
    <Field
      {...props}
      render={({ field, form: { touched, errors } }) => {
        const error = touched[field.name] && errors[field.name]

        return (
          <TextField
            {...field}
            select
            SelectProps={{ native: true }}
            label={label}
            error={Boolean(error)}
            helperText={error}
            fullWidth
            margin="normal"
            variant="outlined"
          >
            {children}
          </TextField>
        )
      }}
    />
  )
}

export default Select
