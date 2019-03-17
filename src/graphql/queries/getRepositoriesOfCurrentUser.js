import gql from 'graphql-tag'
import { REPOSITORY_FRAGMENT } from '../fragments/repository'

/*
  NOTES: When working with GraphQL pagination, there are a few key concepts to be aware of:
    + A connection is a paginated field on an object (e.g. repositories in the below query)
    + An edge has metadata about one object in the paginated list and includes a cursor to
      allow pagination starting from that object
    + A node represents the actual object you were looking for
    + pageInfo lets the client know if there are more pages of data to fetch. In the
      Relay Cursor Connections spec, pageInfo does not tell you the total number of items
      because the client cache does not need that info. It is up to the developer to expose
      that information through another field.

  SOURCE: Understanding pagination: REST, GraphQL, and Relay
  https://blog.apollographql.com/understanding-pagination-rest-graphql-and-relay-b10f835549e7
*/
export const GET_REPOSITORIES_OF_CURRENT_USER = gql`
  query ($cursor: String) {
    viewer {
      repositories(
        first:5
        orderBy: { direction: DESC, field: STARGAZERS }
        after: $cursor
      ) {
        edges {
          node {
            ...repository
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }

  ${REPOSITORY_FRAGMENT}
`
