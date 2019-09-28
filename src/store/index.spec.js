import { renderWithStore } from '../test-utils'

function build(initialData) {
  return renderWithStore(null, initialData)
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
      date: '2019-09-27',
      type: 'debit'
    })

    dispatch('ADD', {
      description: 'Transaction 2',
      amount: -5000,
      date: '2019-09-27',
      type: 'debit'
    })

    expect(getStore().transactions).toEqual([
      {
        id: 1,
        description: 'Transaction 1',
        amount: 10000,
        date: '2019-09-27',
        type: 'debit'
      },
      {
        id: 2,
        description: 'Transaction 2',
        amount: -5000,
        date: '2019-09-27',
        type: 'debit'
      }
    ])
  })

  it('can remove transactions', () => {
    const { getStore, dispatch } = build()

    dispatch('ADD', {
      description: 'Transaction 1',
      amount: 10000,
      date: '2019-09-27',
      type: 'debit'
    })

    dispatch('ADD', {
      description: 'Transaction 2',
      amount: -5000,
      date: '2019-09-27',
      type: 'debit'
    })

    dispatch('ADD', {
      description: 'Transaction 3',
      amount: 2000,
      date: '2019-09-27',
      type: 'debit'
    })

    dispatch('REMOVE', 2)

    expect(getStore().transactions).toEqual([
      {
        id: 1,
        description: 'Transaction 1',
        amount: 10000,
        date: '2019-09-27',
        type: 'debit'
      },
      {
        id: 3,
        description: 'Transaction 3',
        amount: 2000,
        date: '2019-09-27',
        type: 'debit'
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
      date: '2019-09-27',
      type: 'debit'
    })

    const { getStore } = build()

    expect(getStore().transactions).toEqual([
      {
        id: 1,
        description: 'Transaction 1',
        amount: 10000,
        date: '2019-09-27',
        type: 'debit'
      }
    ])
  })

  describe('falls back to the initial state if stored data is corrupted', () => {
    let data

    beforeEach(() => {
      data = {
        nextId: 3,
        currency: 'BRL',
        transactions: [
          {
            id: 1,
            description: 'Transaction 1',
            amount: 10000,
            date: '2019-09-27',
            type: 'debit'
          },
          {
            id: 2,
            description: 'Transaction 3',
            amount: 2000,
            date: '2019-09-27',
            type: 'debit'
          }
        ]
      }
    })

    it.each([
      ['bad nextId', () => (data.nextId = 1)],
      ['bad currnecy', () => (data.currency = 'AAA')],
      ['bad transactions', () => (data.transactions = null)],
      ['bad transaction id', () => (data.transactions[0].id = 'some id')],
      ['bad transaction description', () => (data.transactions[0].description = null)],
      ['bad transaction amount', () => (data.transactions[0].amount = 'some amount')],
      ['bad transaction date', () => (data.transactions[0].date = '2019-30-30')],
      ['bad transaction type', () => (data.transactions[0].type = 'transference')]
    ])('%s', (name, transform) => {
      transform()

      expect(build(data).getStore()).toEqual({
        currency: 'BRL',
        nextId: 1,
        transactions: []
      })
    })
  })
})
