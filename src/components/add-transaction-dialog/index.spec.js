import React from 'react'
import { renderWithStore, act, fireEvent, immediate } from '../../test-utils'
import AddTransactionDialog from './index'

jest.mock('@material-ui/core/Dialog', () => ({ children }) => children)

describe('AddTransactionDialog', () => {
  afterEach(() => {
    window.localStorage.removeItem('store')
  })

  it('validates the description field', async () => {
    const { findByName } = renderWithStore(<AddTransactionDialog />)
    const input = findByName('description')
    const inputWrapper = input.parentNode.parentNode

    await act(() => fireEvent.blur(input), () => immediate())

    expect(inputWrapper.querySelector('.MuiFormHelperText-root')).not.toBeNull()

    await act(
      () => fireEvent.change(input, { target: { value: 'some description' } }),
      () => immediate()
    )

    expect(inputWrapper.querySelector('.MuiFormHelperText-root')).toBeNull()
  })

  it('validates the amount field', async () => {
    const { findByName } = renderWithStore(<AddTransactionDialog />)
    const input = findByName('amount')
    const inputWrapper = input.parentNode.parentNode

    await act(
      () => fireEvent.change(input, { target: { value: '0.00' } }),
      () => fireEvent.blur(input),
      () => immediate()
    )

    expect(inputWrapper.querySelector('.MuiFormHelperText-root')).not.toBeNull()

    await act(() => fireEvent.change(input, { target: { value: '10.00' } }), () => immediate())

    expect(inputWrapper.querySelector('.MuiFormHelperText-root')).toBeNull()
  })

  it('validates the date field', async () => {
    const { findByName } = renderWithStore(<AddTransactionDialog />)
    const input = findByName('date')
    const inputWrapper = input.parentNode.parentNode

    await act(
      () => fireEvent.change(input, { target: { value: '' } }),
      () => fireEvent.blur(input),
      () => immediate()
    )

    expect(inputWrapper.querySelector('.MuiFormHelperText-root')).not.toBeNull()

    await act(() => fireEvent.change(input, { target: { value: '1991-09-21' } }), () => immediate())

    expect(inputWrapper.querySelector('.MuiFormHelperText-root')).toBeNull()
  })

  it('can be closed', () => {
    const onClose = jest.fn()
    const { querySelector } = renderWithStore(<AddTransactionDialog onClose={onClose} />)
    const button = querySelector('#add-transaction-dialog__close')

    fireEvent.click(button)

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('can add a debit transaction', async () => {
    const onClose = jest.fn()
    const { querySelector, findByName, getStore } = renderWithStore(
      <AddTransactionDialog onClose={onClose} />
    )

    await act(
      () => fireEvent.change(findByName('description'), { target: { value: 'some description' } }),
      () => fireEvent.change(findByName('amount'), { target: { value: '100.00' } }),
      () => fireEvent.change(findByName('date'), { target: { value: '2019-09-21' } }),
      () => fireEvent.change(findByName('type'), { target: { value: 'debit' } }),
      () => fireEvent.click(querySelector('button[type="submit"]')),
      () => immediate()
    )

    expect(onClose).toHaveBeenCalledTimes(1)
    expect(getStore().transactions).toEqual([
      {
        id: 1,
        description: 'some description',
        amount: 10000,
        date: '2019-09-21',
        type: 'debit'
      }
    ])
  })

  it('can add a credit transaction', async () => {
    const onClose = jest.fn()
    const { querySelector, findByName, getStore } = renderWithStore(
      <AddTransactionDialog onClose={onClose} />
    )

    await act(
      () => fireEvent.change(findByName('description'), { target: { value: 'some description' } }),
      () => fireEvent.change(findByName('amount'), { target: { value: '100.00' } }),
      () => fireEvent.change(findByName('date'), { target: { value: '2019-09-21' } }),
      () => fireEvent.change(findByName('type'), { target: { value: 'credit' } }),
      () => fireEvent.click(querySelector('button[type="submit"]')),
      () => immediate()
    )

    expect(onClose).toHaveBeenCalledTimes(1)
    expect(getStore().transactions).toEqual([
      {
        id: 1,
        description: 'some description',
        amount: 10000,
        date: '2019-09-21',
        type: 'credit'
      }
    ])
  })
})
