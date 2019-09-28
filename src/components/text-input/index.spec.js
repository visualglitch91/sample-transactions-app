import React from 'react'
import { renderWithFormik, immediate, fireEvent, act } from '../../test-utils'
import TextInput from './index'

function build(props) {
  return renderWithFormik(<TextInput name="some_field" label="Some Field" {...props} />, {
    some_field: 'some value'
  })
}

describe('TextInput', () => {
  it('renders the label with the right props', () => {
    const { querySelector } = build()
    const label = querySelector('label')
    expect(label.textContent).toBe('Some Field')
  })

  it('can render a date type input', () => {
    const { querySelector } = build({ type: 'date' })
    const input = querySelector('input')
    expect(input.getAttribute('type')).toBe('date')
  })

  it('is connected to formik', () => {
    const { querySelector, getFormikValues } = build()
    const input = querySelector('input')

    expect(input.value).toBe('some value')

    fireEvent.change(input, { target: { value: 'some other value' } })

    expect(input.value).toBe('some other value')
    expect(getFormikValues().some_field).toBe('some other value')
  })

  it('renders the validation error when needed', async () => {
    const { querySelector } = build({
      validate: value => (value.length < 3 ? 'error message' : undefined)
    })

    const input = querySelector('input')

    expect(querySelector('.MuiFormHelperText-root')).toBeNull()
    expect(input.value).toBe('some value')

    await act(
      () => fireEvent.change(input, { target: { value: 'so' } }),
      () => fireEvent.blur(input),
      () => immediate()
    )

    expect(querySelector('.MuiFormHelperText-root').textContent).toBe('error message')
    expect(input.value).toBe('so')
  })
})
