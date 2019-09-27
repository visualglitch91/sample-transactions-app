import React from 'react'
import { render, act, fireEvent } from '@testing-library/react'
import { StoreProvider } from '../../store'
import AddTransactionDialog from './index'

function immediate() {
  return new Promise(resolve => setImmediate(resolve))
}

jest.mock('@material-ui/core/Dialog', () => ({ children }) => children)

describe('AddTransactionDialog', () => {
  afterEach(() => {
    window.localStorage.removeItem('store')
  })

  it('validates the description field', async () => {
    const { container } = render(<AddTransactionDialog />)
    const input = container.querySelector('[name="description"]')
    const inputWrapper = input.parentNode.parentNode

    act(() => {
      fireEvent.blur(input)
    })

    await immediate()

    expect(inputWrapper.querySelector('.MuiFormHelperText-root')).not.toBeNull()

    act(() => {
      fireEvent.change(input, { target: { value: 'some description' } })
    })

    await immediate()

    expect(inputWrapper.querySelector('.MuiFormHelperText-root')).toBeNull()
  })

  it('validates the amount field', async () => {
    const { container } = render(<AddTransactionDialog />)
    const input = container.querySelector('[name="amount"]')
    const inputWrapper = input.parentNode.parentNode

    act(() => {
      fireEvent.change(input, { target: { value: '0.00' } })
    })

    act(() => {
      fireEvent.blur(input)
    })

    await immediate()

    expect(inputWrapper.querySelector('.MuiFormHelperText-root')).not.toBeNull()

    act(() => {
      fireEvent.change(input, { target: { value: '10.00' } })
    })

    await immediate()

    expect(inputWrapper.querySelector('.MuiFormHelperText-root')).toBeNull()
  })

  it('validates the date field', async () => {
    const { container } = render(<AddTransactionDialog />)
    const input = container.querySelector('[name="date"]')
    const inputWrapper = input.parentNode.parentNode

    act(() => {
      fireEvent.change(input, { target: { value: '' } })
    })

    act(() => {
      fireEvent.blur(input)
    })

    await immediate()

    expect(inputWrapper.querySelector('.MuiFormHelperText-root')).not.toBeNull()

    act(() => {
      fireEvent.change(input, { target: { value: '1991-09-21' } })
    })

    await immediate()

    expect(inputWrapper.querySelector('.MuiFormHelperText-root')).toBeNull()
  })

  it('can be closed', () => {
    const onClose = jest.fn()
    const { container } = render(<AddTransactionDialog onClose={onClose} />)
    const button = container.querySelector('#add-transaction-dialog__close')

    fireEvent.click(button)

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('can add a debit transaction', async () => {
    let _store

    const onClose = jest.fn()
    const { container } = render(
      <StoreProvider
        onChange={store => {
          _store = store
        }}
      >
        <AddTransactionDialog onClose={onClose} />
      </StoreProvider>
    )

    act(() => {
      fireEvent.change(container.querySelector('[name="description"]'), {
        target: { value: 'some description' }
      })
      fireEvent.change(container.querySelector('[name="amount"]'), { target: { value: '100.00' } })
      fireEvent.change(container.querySelector('[name="date"]'), {
        target: { value: '2019-09-21' }
      })
      fireEvent.change(container.querySelector('[name="type"]'), { target: { value: 'debit' } })
    })

    act(() => {
      fireEvent.click(container.querySelector('button[type="submit"]'))
    })

    await act(immediate)

    expect(onClose).toHaveBeenCalledTimes(1)
    expect(_store.transactions).toEqual([
      { id: 1, description: 'some description', amount: 10000, date: '2019-09-21', type: 'debit' }
    ])
  })

  it('can add a credit transaction', async () => {
    let _store

    const onClose = jest.fn()
    const { container } = render(
      <StoreProvider
        onChange={store => {
          _store = store
        }}
      >
        <AddTransactionDialog onClose={onClose} />
      </StoreProvider>
    )

    act(() => {
      fireEvent.change(container.querySelector('[name="description"]'), {
        target: { value: 'some description' }
      })
      fireEvent.change(container.querySelector('[name="amount"]'), { target: { value: '100.00' } })
      fireEvent.change(container.querySelector('[name="date"]'), {
        target: { value: '2019-09-21' }
      })
      fireEvent.change(container.querySelector('[name="type"]'), { target: { value: 'credit' } })
    })

    act(() => {
      fireEvent.click(container.querySelector('button[type="submit"]'))
    })

    await act(immediate)

    expect(onClose).toHaveBeenCalledTimes(1)
    expect(_store.transactions).toEqual([
      { id: 1, description: 'some description', amount: 10000, date: '2019-09-21', type: 'credit' }
    ])
  })
})
