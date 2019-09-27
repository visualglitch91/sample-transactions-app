import React from 'react'
import { render, act, fireEvent } from '@testing-library/react'
import { StoreProvider } from '../../store'
import App from './index'

function immediate() {
  return new Promise(resolve => setImmediate(resolve))
}

jest.mock('@material-ui/core/Dialog', () => ({ id, children }) => <div id={id}>{children}</div>)

describe('App', () => {
  afterEach(() => {
    window.localStorage.removeItem('store')
  })

  it('renders the transaction list', () => {
    const { container } = render(
      <StoreProvider>
        <App />
      </StoreProvider>
    )

    expect(container.querySelector('#transaction-list')).not.toBeNull()
  })

  it('renders the footer', () => {
    const { container } = render(
      <StoreProvider>
        <App />
      </StoreProvider>
    )

    expect(container.querySelector('#footer')).not.toBeNull()
  })

  it('can open and close the add transaction dialog', () => {
    const { container } = render(
      <StoreProvider>
        <App />
      </StoreProvider>
    )

    expect(container.querySelector('#add-transaction-dialog')).toBeNull()

    act(() => {
      fireEvent.click(container.querySelector('#footer__add-transaction'))
    })

    expect(container.querySelector('#add-transaction-dialog')).not.toBeNull()

    act(() => {
      fireEvent.click(container.querySelector('#add-transaction-dialog__close'))
    })

    expect(container.querySelector('#add-transaction-dialog')).toBeNull()
  })

  it('can open the change currency dialog', () => {
    const { container } = render(
      <StoreProvider>
        <App />
      </StoreProvider>
    )

    expect(container.querySelector('#change-currency-dialog')).toBeNull()

    act(() => {
      fireEvent.click(container.querySelector('#footer__change-currency'))
    })

    expect(container.querySelector('#change-currency-dialog')).not.toBeNull()

    act(() => {
      fireEvent.click(container.querySelector('#change-currency-dialog__close'))
    })

    expect(container.querySelector('#change-currency-dialog')).toBeNull()
  })
})
