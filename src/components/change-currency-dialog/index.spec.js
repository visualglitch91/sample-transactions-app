import React from 'react'
import { render, act, fireEvent } from '@testing-library/react'
import { StoreProvider } from '../../store'
import ChangeCurrencyDialog from './index'

function immediate() {
  return new Promise(resolve => setImmediate(resolve))
}

jest.mock('@material-ui/core/Dialog', () => ({ children }) => children)

describe('ChangeCurrencyDialog', () => {
  afterEach(() => {
    window.localStorage.removeItem('store')
  })

  it('can be closed', () => {
    const onClose = jest.fn()
    const { container } = render(
      <StoreProvider>
        <ChangeCurrencyDialog onClose={onClose} />
      </StoreProvider>
    )

    const button = container.querySelector('#change-currency-dialog__close')

    fireEvent.click(button)

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('can change the currency', async () => {
    let _store

    const onClose = jest.fn()
    const { container } = render(
      <StoreProvider
        onChange={store => {
          _store = store
        }}
      >
        <ChangeCurrencyDialog onClose={onClose} />
      </StoreProvider>
    )

    const select = container.querySelector('[name="currency"]')

    expect(_store.currency).toBe('BRL')
    expect(select.value).toBe('BRL')

    act(() => {
      fireEvent.change(select, { target: { value: 'EUR' } })
    })

    act(() => {
      fireEvent.click(container.querySelector('button[type="submit"]'))
    })

    await act(immediate)

    expect(onClose).toHaveBeenCalledTimes(1)
    expect(_store.currency).toBe('EUR')
  })
})
