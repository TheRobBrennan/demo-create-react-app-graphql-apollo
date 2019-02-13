// Import our ApolloClient dependencies
import { ApolloClient } from 'apollo-client'
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

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    // Do something with a graphQL error
  }
  if (networkError) {
    // Do something with a network error
  }
})

// Create the cache that our Apollo client will need
//
// BONUS: This cache will handle normalizing our data, cacheing requests to avoid
// duplicates, and enable read and write functionality for us.
const cache = new InMemoryCache()

// Create our Apollo client using the link and cache configurations
export const client = new ApolloClient({
  link: httpLink,
  cache,
})
