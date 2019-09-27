import React from 'react'
import { render, act } from '@testing-library/react'
import { StoreProvider, useStore, useDispatch } from './index'

function build() {
  let _store
  let _dispatch

  function TestComponent() {
    _store = useStore()
    _dispatch = useDispatch()
    return null
  }

  render(
    <StoreProvider>
      <TestComponent />
    </StoreProvider>
  )

  return {
    dispatch(...args) {
      act(() => _dispatch(...args))
    },
    get current() {
      return _store
    }
  }
}

describe('Store', () => {
  afterEach(() => {
    window.localStorage.removeItem('store')
  })

  it('initializes with the correct initial state', () => {
    const store = build()
    expect(store.current).toEqual({
      currency: 'BRL',
      nextId: 1,
      transactions: []
    })
  })

  it('can add transactions', () => {
    const store = build()

    store.dispatch('ADD', {
      description: 'Transaction 1',
      amount: 10000,
      date: '2019-09-27'
    })

    store.dispatch('ADD', {
      description: 'Transaction 2',
      amount: -5000,
      date: '2019-09-27'
    })

    expect(store.current.transactions).toEqual([
      {
        id: 1,
        description: 'Transaction 1',
        amount: 10000,
        date: '2019-09-27'
      },
      {
        id: 2,
        description: 'Transaction 2',
        amount: -5000,
        date: '2019-09-27'
      }
    ])
  })

  it('can remove transactions', () => {
    const store = build()

    store.dispatch('ADD', {
      description: 'Transaction 1',
      amount: 10000,
      date: '2019-09-27'
    })

    store.dispatch('ADD', {
      description: 'Transaction 2',
      amount: -5000,
      date: '2019-09-27'
    })

    store.dispatch('ADD', {
      description: 'Transaction 3',
      amount: 2000,
      date: '2019-09-27'
    })

    store.dispatch('REMOVE', 2)

    expect(store.current.transactions).toEqual([
      {
        id: 1,
        description: 'Transaction 1',
        amount: 10000,
        date: '2019-09-27'
      },
      {
        id: 3,
        description: 'Transaction 3',
        amount: 2000,
        date: '2019-09-27'
      }
    ])
  })

  it('can change the currency', () => {
    const store = build()
    store.dispatch('CHANGE_CURRENCY', 'EUR')
    expect(store.current.currency).toBe('EUR')
  })

  it('persists data on local storage', () => {
    const store1 = build()

    store1.dispatch('ADD', {
      description: 'Transaction 1',
      amount: 10000,
      date: '2019-09-27'
    })

    const store2 = build()

    expect(store2.current.transactions).toEqual([
      {
        id: 1,
        description: 'Transaction 1',
        amount: 10000,
        date: '2019-09-27'
      }
    ])
  })
})
