import React from 'react'
import { Formik } from 'formik'
import { render, fireEvent, act } from '@testing-library/react'
import Select from './index'

function build(props) {
  let _values

  const utils = render(
    <Formik
      initialValues={{ some_field: 'opt_1' }}
      render={({ values }) => {
        _values = values
        return (
          <form>
            <Select name="some_field" label="Some Field" {...props}>
              <option value="opt_1">Option 1</option>
              <option value="opt_2">Option 2</option>
            </Select>
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
    const select = container.querySelector('select')

    expect(select.value).toBe('opt_1')

    fireEvent.change(select, { target: { value: 'opt_2' } })

    expect(select.value).toBe('opt_2')
    expect(getFormikValues().some_field).toBe('opt_2')
  })

  it('renders the validation error when needed', done => {
    const { container } = build({
      validate: value => (value === 'opt_2' ? 'error message' : undefined)
    })

    const select = container.querySelector('select')

    expect(container.querySelector('.MuiFormHelperText-root')).toBeNull()
    expect(select.value).toBe('opt_1')

    act(() => {
      fireEvent.change(select, { target: { value: 'opt_2' } })
    })

    act(() => {
      fireEvent.blur(select)
    })

    setImmediate(() => {
      expect(container.querySelector('.MuiFormHelperText-root').textContent).toBe('error message')
      expect(select.value).toBe('opt_2')
      done()
    })
  })
})
