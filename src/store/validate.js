import currencies from '../currencies'

const transactionTypes = ['credit', 'debit']

function validate(state) {
  if (!currencies.includes(state.currency)) {
    throw new Error('invalid currency')
  }

  if (!Array.isArray(state.transactions)) {
    throw new Error('transactions must be an array')
  }

  let maxId = 0

  state.transactions.forEach(transaction => {
    if (
      typeof transaction.description !== 'string' ||
      typeof transaction.id !== 'number' ||
      typeof transaction.id < 1 ||
      typeof transaction.amount !== 'number' ||
      new Date(transaction.date).toString() === 'Invalid Date' ||
      !transactionTypes.includes(transaction.type)
    ) {
      throw new Error('invalid transaction')
    }

    maxId = Math.max(maxId, transaction.id)
  })

  if (state.nextId < maxId) {
    throw new Error('invalid nextId')
  }
}

export default validate
