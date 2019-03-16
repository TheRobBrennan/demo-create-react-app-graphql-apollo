import gql from 'graphql-tag'
import { REPOSITORY_FRAGMENT } from '../fragments/repository'

export const GET_REPOSITORIES_OF_CURRENT_USER = gql`
{
  viewer {
    repositories(
      first:5
      orderBy: { direction: DESC, field: STARGAZERS }
    ) {
      edges {
        node {
          ...repository
        }
      }
    }
  }
}

${REPOSITORY_FRAGMENT}
`
