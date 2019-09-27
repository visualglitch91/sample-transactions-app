import currencyFormatter from 'currency-formatter'

function useCurrency() {
  return function format(amount) {
    return currencyFormatter
      .format(amount / 100, {
        code: 'BRL'
      })
      .replace(/\u00a0/g, ' ') // Replace non-breaking space with a regular space
  }
}

export default useCurrency
