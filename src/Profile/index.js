import React from 'react'

// GraphQL
import { Query } from 'react-apollo'
import { GET_REPOSITORIES_OF_CURRENT_USER} from '../graphql/queries/getRepositoriesOfCurrentUser'
import { handleCurrentUserQuery } from './lib/handleCurrentUserQuery'

// REMEMBER: The query will get executed as soon as this component renders
const Profile = () => (
  <Query query={GET_REPOSITORIES_OF_CURRENT_USER} notifyOnNetworkStatusChange={true} >
    {handleCurrentUserQuery}
  </Query>
)

export default Profile