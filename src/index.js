import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Import our ApolloClient dependencies
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

// Create a configured HttpLink instance that our Apollo client will need
const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GITHUB_GRAPHQL_ENDPOINT,
  headers: {
    authorization: `Bearer ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`
  },
})

// Create the cache that our Apollo client will need
//
// BONUS: This cache will handle normalizing our data, cacheing requests to avoid
// duplicates, and enable read and write functionality for us.
const cache = new InMemoryCache()

// Create our Apollo client using the link and cache configurations
const client = new ApolloClient({
  link: httpLink,
  cache,
})

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
