function useCurrency() {
  // this will be improved later, respecting the selected currency
  return function currency(amount, { negative = false } = {}) {
    const part = (amount / 100).toFixed(2)
    return negative ? `- ${part}` : part
  }
}

export default useCurrency
