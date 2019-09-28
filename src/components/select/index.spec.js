import React from 'react'
import { renderWithFormik, immediate, fireEvent, act } from '../../test-utils'
import Select from './index'

function build(props) {
  return renderWithFormik(
    <Select name="some_field" label="Some Field" {...props}>
      <option value="opt_1">Option 1</option>
      <option value="opt_2">Option 2</option>
    </Select>,
    { some_field: 'opt_1' }
  )
}

describe('Field', () => {
  it('renders the label with the right props', () => {
    const { querySelector } = build()
    const label = querySelector('label')
    expect(label.textContent).toBe('Some Field')
  })

  it('is connected to formik', () => {
    const { querySelector, getFormikValues } = build()
    const select = querySelector('select')

    expect(select.value).toBe('opt_1')

    fireEvent.change(select, { target: { value: 'opt_2' } })

    expect(select.value).toBe('opt_2')
    expect(getFormikValues().some_field).toBe('opt_2')
  })

  it('renders the validation error when needed', async () => {
    const { querySelector } = build({
      validate: value => (value === 'opt_2' ? 'error message' : undefined)
    })

    const select = querySelector('select')

    expect(querySelector('.MuiFormHelperText-root')).toBeNull()
    expect(select.value).toBe('opt_1')

    await act(
      () => fireEvent.change(select, { target: { value: 'opt_2' } }),
      () => fireEvent.blur(select),
      () => immediate()
    )

    expect(querySelector('.MuiFormHelperText-root').textContent).toBe('error message')
    expect(select.value).toBe('opt_2')
  })
})
