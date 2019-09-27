export const initialState = {
  currency: 'BRL',
  nextId: 1,
  transactions: []
}

export function reducer(state, [type, payload]) {
  switch (type) {
    case 'ADD':
      return {
        ...state,
        nextId: state.nextId + 1,
        transactions: [...state.transactions, { id: state.nextId, ...payload }]
      }
    case 'REMOVE':
      return {
        ...state,
        transactions: state.transactions.filter(transaction => transaction.id !== payload)
      }
    case 'CHANGE_CURRENCY':
      return {
        ...state,
        currency: payload
      }
    default:
      throw new Error()
  }
}
