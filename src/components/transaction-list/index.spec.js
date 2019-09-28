import React from 'react'
import { renderWithStore, act, fireEvent } from '../../test-utils'
import TransactionList from './index'

describe('TextInput', () => {
  afterEach(() => {
    window.localStorage.removeItem('store')
  })

  it('show the empty state component when there are no transactions with a button to add one', () => {
    const onAddTransaction = jest.fn()
    const { container, findById } = renderWithStore(
      <TransactionList onAddTransaction={onAddTransaction} />
    )

    expect(findById('transaction-list__empty-state')).not.toBeNull()

    fireEvent.click(findById('transaction-list__empty-state__add-transaction'))

    expect(onAddTransaction).toHaveBeenCalledTimes(1)
  })

  it('renders the transactions sorted by date and grouped by day', () => {
    const { querySelectorAll } = renderWithStore(<TransactionList />, {
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

    const dayGroups = querySelectorAll('#transaction-list__list > li')

    const getSubheader = index =>
      dayGroups[index].querySelector('.MuiListSubheader-root').textContent

    const getItem = (groupIndex, index) =>
      dayGroups[groupIndex].querySelectorAll('.MuiListItem-root')[index].textContent

    expect(getSubheader(0)).toBe('22/09/2019')
    expect(getItem(0, 0)).toBe('Boteco do GóisR$ -30,00')
    expect(getSubheader(1)).toBe('21/09/2019')
    expect(getItem(1, 0)).toBe('Prime DogR$ -30,00')
    expect(getItem(1, 1)).toBe('SalaryR$ 5.000,00')
  })

  it('can remove a transaction', () => {
    const { findById } = renderWithStore(<TransactionList />, {
      currency: 'BRL',
      transactions: [
        {
          id: 1,
          description: 'Prime Dog',
          amount: 3000,
          type: 'debit',
          date: '2019-09-21'
        }
      ]
    })

    expect(findById('transaction__1')).not.toBeNull()

    act(() => fireEvent.click(findById('transaction__1__remove')))

    expect(findById('transaction__1')).toBeNull()
  })
})
