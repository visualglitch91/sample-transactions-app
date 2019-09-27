import React from 'react'
import { Formik } from 'formik'
import { render, fireEvent, act } from '@testing-library/react'
import MoneyInput from './index'

function build(props) {
  let _values

  const utils = render(
    <Formik
      initialValues={{ some_field: 0 }}
      render={({ values }) => {
        _values = values
        return (
          <form>
            <MoneyInput name="some_field" label="Some Field" type="text" {...props} />
          </form>
        )
      }}
    />
  )

  return {
    ...utils,
    getFormikValues() {
      return _values
    }
  }
}

describe('Field', () => {
  it('renders the label with the right props', () => {
    const { container } = build()
    const label = container.querySelector('label')
    expect(label.textContent).toBe('Some Field')
  })

  it('is connected to formik', () => {
    const { container, getFormikValues } = build()
    const input = container.querySelector('input')

    expect(input.value).toBe('0.00')

    fireEvent.change(input, { target: { value: '10.00' } })

    expect(input.value).toBe('10.00')
    expect(getFormikValues().some_field).toBe(1000)
  })

  it('renders the validation error when needed', done => {
    const { container } = build({
      validate: value => (value < 2000 ? 'error message' : undefined)
    })

    const input = container.querySelector('input')

    expect(container.querySelector('.MuiFormHelperText-root')).toBeNull()
    expect(input.value).toBe('0.00')

    act(() => {
      fireEvent.change(input, { target: { value: '10.00' } })
    })

    act(() => {
      fireEvent.blur(input)
    })

    setImmediate(() => {
      expect(container.querySelector('.MuiFormHelperText-root').textContent).toBe('error message')
      expect(input.value).toBe('10.00')
      done()
    })
  })
})
