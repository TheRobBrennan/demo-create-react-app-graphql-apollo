import React from 'react'

import Loading from '../../Loading'
import RepositoryList from '../../Repository'

export const handleCurrentUserQuery = ({ data, loading }) => {
  const { viewer } = data

  // Display a loading indicator if our query is pending
  if (loading || !viewer) {
    return <Loading />
  }

  return (
    <RepositoryList repositories={viewer.repositories} />
  )
}
