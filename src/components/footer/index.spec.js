import React from 'react'
import { renderWithStore, fireEvent } from '../../test-utils'
import Footer from './index'

describe('Footer', () => {
  afterEach(() => {
    window.localStorage.removeItem('store')
  })

  it('renders a button to open the add transaction modal', () => {
    const onAddTransaction = jest.fn()
    const { findById } = renderWithStore(<Footer onAddTransaction={onAddTransaction} />)
    const button = findById('footer__add-transaction')

    fireEvent.click(button)

    expect(onAddTransaction).toHaveBeenCalledTimes(1)
  })

  it('renders a button to open the change currency modal', () => {
    const onChangeCurrency = jest.fn()
    const { findById } = renderWithStore(<Footer onChangeCurrency={onChangeCurrency} />)
    const button = findById('footer__change-currency')

    fireEvent.click(button)

    expect(onChangeCurrency).toHaveBeenCalledTimes(1)
  })

  it('renders the balance', () => {
    const { findById } = renderWithStore(<Footer />, {
      currency: 'BRL',
      transactions: [
        {
          id: 1,
          description: 'Prime Dog',
          amount: 3000,
          type: 'debit',
          date: '2019-09-21'
        },
        {
          id: 2,
          description: 'Boteco do Góis',
          amount: 3000,
          type: 'debit',
          date: '2019-09-22'
        },
        {
          id: 3,
          description: 'Salary',
          amount: 500000,
          type: 'credit',
          date: '2019-09-21'
        }
      ]
    })

    expect(findById('footer__balance').textContent).toBe('Saldo: R$ 4.940,00')
  })
})
