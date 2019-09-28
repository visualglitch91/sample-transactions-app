import React from 'react'
import { Formik, Form } from 'formik'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import { useDispatch, useStore } from '../../store'
import currencies from '../../currencies'
import Select from '../select'

function ChangeCurrencyDialog({ onClose }) {
  const { currency: currentCurrency } = useStore()
  const dispatch = useDispatch()

  function onSubmit({ currency }) {
    dispatch('CHANGE_CURRENCY', currency)
    onClose()
  }

  return (
    <Dialog
      id="change-currency-dialog"
      onClose={onClose}
      aria-labelledby="change-currency-dialog__dialog-title"
      open
    >
      <Formik onSubmit={onSubmit} initialValues={{ currency: currentCurrency }}>
        <Form>
          <DialogTitle id="change-currency-dialog__dialog-title">Alterar moeda</DialogTitle>
          <DialogContent dividers>
            <Select name="currency" label="Moeda">
              {currencies.map(currency => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </Select>
          </DialogContent>
          <DialogActions>
            <Button id="change-currency-dialog__close" onClick={onClose} color="secondary">
              Cancelar
            </Button>
            <Button id="change-currency-dialog__save" type="submit" color="primary">
              Salvar
            </Button>
          </DialogActions>
        </Form>
      </Formik>
    </Dialog>
  )
}

export default ChangeCurrencyDialog
