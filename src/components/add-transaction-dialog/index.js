import React from 'react'
import { Formik, Form } from 'formik'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import { useDispatch } from '../../store'
import TextInput from '../text-input'
import MoneyInput from '../money-input'
import Select from '../select'
import styles from './index.module.css'

const initialValues = {
  description: '',
  amount: 0,
  date: '2019-09-27',
  type: 'debit'
}

function required(message) {
  return function(value) {
    if (value === '') {
      return message
    }
  }
}

function greaterThan(min, message) {
  return function(value) {
    if (value <= min) {
      return message
    }
  }
}

function AddTransactionDialog({ onClose }) {
  const dispatch = useDispatch()
  const fullScreen = useMediaQuery('@media(max-width: 728px)')

  function onSubmit(values) {
    dispatch('ADD', values)
    onClose()
  }

  return (
    <Dialog
      fullScreen={fullScreen}
      onClose={onClose}
      aria-labelledby="add-transaction-dialog__dialog-title"
      open
      fullWidth
    >
      <Formik onSubmit={onSubmit} initialValues={initialValues}>
        <Form className={styles.form}>
          <DialogTitle id="add-transaction-dialog__dialog-title">Adicionar transação</DialogTitle>
          <DialogContent dividers>
            <TextInput
              validate={required('Esse campo é requerido.')}
              name="description"
              label="Descrição"
            />
            <MoneyInput
              validate={greaterThan(0, 'O valor não pode ser zero.')}
              name="amount"
              label="Valor"
            />
            <TextInput
              validate={required('Esse campo é requerido.')}
              name="date"
              label="Data"
              type="date"
            />
            <Select validate={required('Esse campo é requerido.')} name="type" label="Tipo">
              <option value="debit">Débito</option>
              <option value="credit">Crédito</option>
            </Select>
          </DialogContent>
          <DialogActions>
            <Button id="add-transaction-dialog__close" onClick={onClose} color="secondary">
              Cancelar
            </Button>
            <Button id="add-transaction-dialog__save" type="submit" color="primary">
              Salvar
            </Button>
          </DialogActions>
        </Form>
      </Formik>
    </Dialog>
  )
}

export default AddTransactionDialog
