import useCurrency from './use-currency'

describe('useCurrency', () => {
  it('returns a function that formats an integer with two implicit decimals into currency', () => {
    const currency = useCurrency()
    expect(currency(10050)).toBe('100.50')
  })
})
