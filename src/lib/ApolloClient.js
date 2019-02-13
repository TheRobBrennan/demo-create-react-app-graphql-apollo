// Import our ApolloClient dependencies
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { onError } from 'apollo-link-error'

// Create a configured HttpLink instance that our Apollo client will need
const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GITHUB_GRAPHQL_ENDPOINT,
  headers: {
    authorization: `Bearer ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`
  },
})

// Create an error link to handle application errors with Apollo client
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    // Do something with a graphQL error
  }
  if (networkError) {
    // Do something with a network error
  }
})

// Compose our errorLink and httpLink into a single Apollo link.
// This is how two or more links can be composed for creating an
// Apollo client instance.
//
// Note that order matters here. 
//
// apollo-link-http is a "terminating link" because it turns an 
// operation into a result that usually occurs from a network request.
//
// A terminating link has to be the last entity in the control flow chain.
//
// apollo-link-error is a "non-terminating link" because it enhances
// the terminating link with features. 
const link = ApolloLink.from([errorLink, httpLink])

// Create the cache that our Apollo client will need
//
// BONUS: This cache will handle normalizing our data, cacheing requests to avoid
// duplicates, and enable read and write functionality for us.
const cache = new InMemoryCache()

// Create our Apollo client using the link and cache configurations
export const client = new ApolloClient({
  link,
  cache,
})
