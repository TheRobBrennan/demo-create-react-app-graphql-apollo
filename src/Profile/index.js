import React from 'react'

// GraphQL
import { Query } from 'react-apollo'
import { GET_CURRENT_USER } from '../graphql/queries/getCurrentUser'
import { handleCurrentUserQuery } from './lib/handleCurrentUserQuery'

const Profile = () => (
  <Query query={GET_CURRENT_USER}>
    {handleCurrentUserQuery}
  </Query>
)

export default Profile