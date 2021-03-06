import useCurrency from './use-currency'
import { useStore } from '../store'

jest.mock('../store')

describe('useCurrency', () => {
  it('returns a function that formats an integer with two implicit decimals into currency', () => {
    useStore.mockReturnValue({ currency: 'BRL' })

    const currency = useCurrency()
    const assertions = [
      [10000, 'R$ 100,00'],
      [-10000, 'R$ -100,00'],
      [10, 'R$ 0,10'],
      [1000000, 'R$ 10.000,00']
    ]

    assertions.forEach(([amount, expected]) => {
      expect(currency(amount)).toBe(expected)
    })
  })
})
