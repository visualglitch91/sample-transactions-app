import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { StoreProvider } from '../../store'
import Footer from './index'

describe('Footer', () => {
  afterEach(() => {
    window.localStorage.removeItem('store')
  })

  it('renders a button to open the add transaction modal', () => {
    const onAdd = jest.fn()
    const { container } = render(
      <StoreProvider>
        ><Footer onAdd={onAdd} />
      </StoreProvider>
    )
    const button = container.querySelector('#footer__add-transaction')

    fireEvent.click(button)

    expect(onAdd).toHaveBeenCalledTimes(1)
  })

  it('renders the balance', () => {
    window.localStorage.setItem(
      'store',
      JSON.stringify({
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
    )

    const { container } = render(
      <StoreProvider>
        <Footer />
      </StoreProvider>
    )

    expect(container.querySelector('#footer__balance').textContent).toBe('Saldo: R$ 4.940,00')
  })
})
