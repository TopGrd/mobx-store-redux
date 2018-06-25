import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App'
import { configure } from 'mobx'
import { BookStore } from './stores/bookStore'
import { Provider } from 'react-redux'
import { asReduxStore, connectReduxDevtools } from 'mst-middlewares'
import registerServiceWorker from './registerServiceWorker'

configure({ enforceActions: 'strict' })

const initialStete = {
  list: [],
  cart: [],
}

const books = BookStore.create(initialStete)


const bookStore = asReduxStore(books)
connectReduxDevtools(require("remotedev"), books)

ReactDOM.render(
  <Provider store={bookStore}>
    <App />
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
