import React from 'react'
import { renderWithFormik, act, immediate, fireEvent } from '../../test-utils'
import MoneyInput from './index'

function build(props) {
  return renderWithFormik(
    <MoneyInput name="some_field" label="Some Field" type="text" {...props} />,
    { some_field: 0 }
  )
}

describe('Field', () => {
  afterEach(() => {
    window.localStorage.removeItem('store')
  })

  it('renders the label with the right props', () => {
    const { querySelector } = build()
    const label = querySelector('label')
    expect(label.textContent).toBe('Some Field')
  })

  it('is connected to formik', () => {
    const { querySelector, getFormikValues } = build()
    const input = querySelector('input')

    expect(input.value).toBe('R$ 0,00')

    fireEvent.change(input, { target: { value: 'R$ 10,00' } })

    expect(input.value).toBe('R$ 10,00')
    expect(getFormikValues().some_field).toBe(1000)
  })

  it('renders the validation error when needed', async () => {
    const { querySelector } = build({
      validate: value => (value < 2000 ? 'error message' : undefined)
    })

    const input = querySelector('input')

    expect(querySelector('.MuiFormHelperText-root')).toBeNull()
    expect(input.value).toBe('R$ 0,00')

    await act(
      () => fireEvent.change(input, { target: { value: 'R$ 10,00' } }),
      () => fireEvent.blur(input),
      () => immediate()
    )

    expect(querySelector('.MuiFormHelperText-root').textContent).toBe('error message')
    expect(input.value).toBe('R$ 10,00')
  })
})
