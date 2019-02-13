import React from 'react'

// GraphQL
import { Query } from 'react-apollo'
import { GET_CURRENT_USER } from '../graphql/queries/getCurrentUser'
import { handleCurrentUserQuery } from './lib/handleCurrentUserQuery'

// REMEMBER: The query will get executed as soon as this component renders
const Profile = () => (
  <Query query={GET_CURRENT_USER}>
    {handleCurrentUserQuery}
  </Query>
)

export default Profile