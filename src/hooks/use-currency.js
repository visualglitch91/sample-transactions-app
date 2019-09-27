import currencyFormatter from 'currency-formatter'
import { useStore } from '../store'

function useCurrency() {
  const { currency } = useStore()

  return function format(amount) {
    return currencyFormatter
      .format(amount / 100, {
        code: currency,
        format: '%s %v'
      })
      .replace(/\u00a0/g, ' ') // Replace non-breaking space with a regular space
  }
}

export default useCurrency
