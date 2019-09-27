import React from 'react'
import { Field } from 'formik'
import TextField from '@material-ui/core/TextField'

function TextInput({ id, label, type, ...props }) {
  return (
    <Field
      {...props}
      render={({ field, form: { touched, errors } }) => {
        const error = touched[field.name] && errors[field.name]

        return (
          <TextField
            {...field}
            type={type}
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

export default TextInput
