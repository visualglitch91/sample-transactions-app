import React from 'react'
import { render } from 'react-dom'
import App from './app'
import * as serviceWorker from './service-worker'

render(<App />, document.getElementById('root'))

serviceWorker.unregister()
