import React from 'react'
import { renderWithStore, act, immediate, fireEvent } from '../../test-utils'
import ChangeCurrencyDialog from './index'

jest.mock('@material-ui/core/Dialog', () => ({ children }) => children)

describe('ChangeCurrencyDialog', () => {
  afterEach(() => {
    window.localStorage.removeItem('store')
  })

  it('can be closed', () => {
    const onClose = jest.fn()
    const { findById } = renderWithStore(<ChangeCurrencyDialog onClose={onClose} />)
    const button = findById('change-currency-dialog__close')

    fireEvent.click(button)

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('can change the currency', async () => {
    const onClose = jest.fn()
    const { getStore, findByName, querySelector } = renderWithStore(
      <ChangeCurrencyDialog onClose={onClose} />
    )

    const select = findByName('currency')

    expect(getStore().currency).toBe('BRL')
    expect(select.value).toBe('BRL')

    await act(
      () => fireEvent.change(select, { target: { value: 'EUR' } }),
      () => fireEvent.click(querySelector('button[type="submit"]')),
      () => immediate()
    )

    expect(onClose).toHaveBeenCalledTimes(1)
    expect(getStore().currency).toBe('EUR')
  })
})
