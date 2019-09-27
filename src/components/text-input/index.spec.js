import React from 'react'
import { Formik } from 'formik'
import { render, fireEvent, act } from '@testing-library/react'
import TextInput from './index'

function build(props) {
  let _values

  const utils = render(
    <Formik
      initialValues={{ some_field: 'some value' }}
      render={({ values }) => {
        _values = values
        return (
          <form>
            <TextInput name="some_field" label="Some Field" {...props} />
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

describe('TextInput', () => {
  it('renders the label with the right props', () => {
    const { container } = build()
    const label = container.querySelector('label')
    expect(label.textContent).toBe('Some Field')
  })

  it('can render a date type input', () => {
    const { container } = build({ type: 'date' })
    const input = container.querySelector('input')
    expect(input.getAttribute('type')).toBe('date')
  })

  it('is connected to formik', () => {
    const { container, getFormikValues } = build()
    const input = container.querySelector('input')

    expect(input.value).toBe('some value')

    fireEvent.change(input, { target: { value: 'some other value' } })

    expect(input.value).toBe('some other value')
    expect(getFormikValues().some_field).toBe('some other value')
  })

  it('renders the validation error when needed', done => {
    const { container } = build({
      validate: value => (value.length < 3 ? 'error message' : undefined)
    })

    const input = container.querySelector('input')

    expect(container.querySelector('.MuiFormHelperText-root')).toBeNull()
    expect(input.value).toBe('some value')

    act(() => {
      fireEvent.change(input, { target: { value: 'so' } })
    })

    act(() => {
      fireEvent.blur(input)
    })

    setImmediate(() => {
      expect(container.querySelector('.MuiFormHelperText-root').textContent).toBe('error message')
      expect(input.value).toBe('so')
      done()
    })
  })
})
