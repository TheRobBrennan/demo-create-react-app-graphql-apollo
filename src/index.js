import React from 'react'
import ReactDOM from 'react-dom'
import './style.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

// Apollo setup and configuration
import { ApolloProvider } from 'react-apollo'
import { client } from './lib/ApolloClient'

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
