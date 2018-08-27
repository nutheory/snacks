import React from 'react'
import { render } from 'react-dom'
import { applyMiddleware, compose, createStore } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import Reducers from '../reducers/index'
import App from '../components/index'
import '../styles/default.css'

const storeEnhancers = compose(
  applyMiddleware(thunk),
  window.devToolsExtension && window.devToolsExtension()
)

const store = createStore(
  Reducers, 
  {},
  storeEnhancers 
)

render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root')
)
