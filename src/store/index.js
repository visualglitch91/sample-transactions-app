import React, { createContext, useEffect, useReducer, useContext, useCallback } from 'react'
import { reducer, initialState } from './reducer'

const storeContext = createContext()
const dispatchContext = createContext()

function getInitialState() {
  try {
    const state = JSON.parse(window.localStorage.getItem('store'))

    if (state) {
      return state
    }
  } catch (err) {}

  return initialState
}

export function StoreProvider({ children, onChange = () => {} }) {
  const [store, _dispatch] = useReducer(reducer, getInitialState())
  const dispatch = useCallback((type, payload) => _dispatch([type, payload]), [])

  useEffect(() => {
    onChange(store)
    window.localStorage.setItem('store', JSON.stringify(store))
  }, [store, onChange])

  return (
    <dispatchContext.Provider value={dispatch}>
      <storeContext.Provider value={store}>{children}</storeContext.Provider>
    </dispatchContext.Provider>
  )
}

export function useStore() {
  return useContext(storeContext)
}

export function useDispatch() {
  return useContext(dispatchContext)
}
