import React from 'react'
import { render, act, fireEvent } from '@testing-library/react'
import { StoreProvider } from '../../store'
import TransactionList from './index'

describe('TextInput', () => {
  afterEach(() => {
    window.localStorage.removeItem('store')
  })

  it('renders the transactions sorted by date and grouped by day', () => {
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
            type: 'crebit',
            date: '2019-09-21'
          }
        ]
      })
    )

    const { container } = render(
      <StoreProvider>
        <TransactionList />
      </StoreProvider>
    )

    const dayGroups = container.querySelectorAll('#transaction-list__list > li')

    const getSubheader = index =>
      dayGroups[index].querySelector('.MuiListSubheader-root').textContent

    const getItem = (groupIndex, index) =>
      dayGroups[groupIndex].querySelectorAll('.MuiListItem-root')[index].textContent

    expect(getSubheader(0)).toBe('22/09/2019')
    expect(getItem(0, 0)).toBe('Boteco do Góis- 30.00')
    expect(getSubheader(1)).toBe('21/09/2019')
    expect(getItem(1, 0)).toBe('Prime Dog- 30.00')
    expect(getItem(1, 1)).toBe('Salary5000.00')
  })

  it('can remove a transaction', () => {
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
          }
        ]
      })
    )

    const { container } = render(
      <StoreProvider>
        <TransactionList />
      </StoreProvider>
    )

    expect(container.querySelector('#transaction__1')).not.toBeNull()

    act(() => {
      fireEvent.click(container.querySelector('#transaction__1__remove'))
    })

    expect(container.querySelector('#transaction__1')).toBeNull()
  })
})
