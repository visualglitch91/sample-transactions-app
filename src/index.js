import React from 'react'
import { render } from 'react-dom'
import App from './components/app'
import { StoreProvider } from './store'
import * as serviceWorker from './service-worker'
import './index.css'

render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  document.getElementById('root')
)

serviceWorker.unregister()
