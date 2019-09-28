import { renderWithStore } from '../test-utils'

function build() {
  return renderWithStore(null)
}

describe('Store', () => {
  afterEach(() => {
    window.localStorage.removeItem('store')
  })

  it('initializes with the correct initial state', () => {
    const { getStore } = build()
    expect(getStore()).toEqual({
      currency: 'BRL',
      nextId: 1,
      transactions: []
    })
  })

  it('can add transactions', () => {
    const { getStore, dispatch } = build()

    dispatch('ADD', {
      description: 'Transaction 1',
      amount: 10000,
      date: '2019-09-27'
    })

    dispatch('ADD', {
      description: 'Transaction 2',
      amount: -5000,
      date: '2019-09-27'
    })

    expect(getStore().transactions).toEqual([
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
    const { getStore, dispatch } = build()

    dispatch('ADD', {
      description: 'Transaction 1',
      amount: 10000,
      date: '2019-09-27'
    })

    dispatch('ADD', {
      description: 'Transaction 2',
      amount: -5000,
      date: '2019-09-27'
    })

    dispatch('ADD', {
      description: 'Transaction 3',
      amount: 2000,
      date: '2019-09-27'
    })

    dispatch('REMOVE', 2)

    expect(getStore().transactions).toEqual([
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
    const { getStore, dispatch } = build()

    dispatch('CHANGE_CURRENCY', 'EUR')

    expect(getStore().currency).toBe('EUR')
  })

  it('persists data on local storage', () => {
    const { dispatch } = build()

    dispatch('ADD', {
      description: 'Transaction 1',
      amount: 10000,
      date: '2019-09-27'
    })

    const { getStore } = build()

    expect(getStore().transactions).toEqual([
      {
        id: 1,
        description: 'Transaction 1',
        amount: 10000,
        date: '2019-09-27'
      }
    ])
  })
})
