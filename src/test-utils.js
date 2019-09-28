import React from 'react'
import { Formik } from 'formik'
import { StoreProvider, useStore, useDispatch } from './store'
import { render as _render, act as _act, fireEvent } from '@testing-library/react'

export function render(...args) {
  const utils = _render(...args)

  return {
    ...utils,
    findById(id) {
      return utils.container.querySelector(`#${id}`)
    },
    findByName(id) {
      return utils.container.querySelector(`[name="${id}"]`)
    },
    querySelector(selector) {
      return utils.container.querySelector(selector)
    },
    querySelectorAll(selector) {
      return utils.container.querySelectorAll(selector)
    }
  }
}

export function immediate() {
  return new Promise(resolve => setImmediate(resolve))
}

export async function act(...args) {
  for (let fn of args) {
    let hasAsync

    const actResult = _act(() => {
      const result = fn()

      hasAsync = result && typeof result.then === 'function'

      return hasAsync ? result : undefined
    })

    if (hasAsync) {
      await actResult
    }
  }
}

export function renderWithStore(element, initialState) {
  let _store
  let _dispatch

  if (initialState) {
    window.localStorage.setItem('store', JSON.stringify(initialState))
  }

  function TestComponent() {
    _store = useStore()
    _dispatch = useDispatch()
    return element
  }

  const utils = render(
    <StoreProvider>
      <TestComponent />
    </StoreProvider>
  )

  return {
    ...utils,
    dispatch(...args) {
      act(() => _dispatch(...args))
    },
    getStore() {
      return _store
    }
  }
}

export function renderWithFormik(element, initialValues) {
  let _values

  const utils = renderWithStore(
    <Formik
      initialValues={initialValues}
      render={({ values }) => {
        _values = values
        return <form>{element}</form>
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

export { fireEvent }
