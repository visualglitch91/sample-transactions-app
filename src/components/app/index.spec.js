import React from 'react'
import { renderWithStore, act, fireEvent } from '../../test-utils'
import App from './index'

jest.mock('@material-ui/core/Dialog', () => ({ id, children }) => <div id={id}>{children}</div>)

describe('App', () => {
  afterEach(() => {
    window.localStorage.removeItem('store')
  })

  it('renders the transaction list', () => {
    const { findById } = renderWithStore(<App />)
    expect(findById('transaction-list')).not.toBeNull()
  })

  it('renders the footer', () => {
    const { findById } = renderWithStore(<App />)
    expect(findById('footer')).not.toBeNull()
  })

  it('can open and close the add transaction dialog', () => {
    const { findById } = renderWithStore(<App />)

    expect(findById('add-transaction-dialog')).toBeNull()

    act(() => fireEvent.click(findById('footer__add-transaction')))

    expect(findById('add-transaction-dialog')).not.toBeNull()

    act(() => fireEvent.click(findById('add-transaction-dialog__close')))

    expect(findById('add-transaction-dialog')).toBeNull()
  })

  it('can open the change currency dialog', () => {
    const { findById } = renderWithStore(<App />)

    expect(findById('change-currency-dialog')).toBeNull()

    act(() => fireEvent.click(findById('footer__change-currency')))

    expect(findById('change-currency-dialog')).not.toBeNull()

    act(() => fireEvent.click(findById('change-currency-dialog__close')))

    expect(findById('change-currency-dialog')).toBeNull()
  })
})
