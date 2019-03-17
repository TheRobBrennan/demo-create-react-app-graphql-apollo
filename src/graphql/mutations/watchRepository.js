import gql from 'graphql-tag'

export const WATCH_REPOSITORY = gql`
  mutation ($id: ID!, $viewerSubscription: SubscriptionState!) {
    updateSubscription (input: { state: $viewerSubscription, subscribableId: $id }) {
      subscribable {
        id
        viewerSubscription
      }
    }
  }
`