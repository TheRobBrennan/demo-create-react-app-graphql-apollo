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
export const client = new ApolloClient({
  link: httpLink,
  cache,
})
