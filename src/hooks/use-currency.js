function useCurrency() {
  // this will be improved later, respecting the selected currency
  return function currency(amount) {
    return (amount / 100).toFixed(2)
  }
}

export default useCurrency
