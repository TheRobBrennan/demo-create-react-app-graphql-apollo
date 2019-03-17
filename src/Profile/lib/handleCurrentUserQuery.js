import React from 'react'

import Loading from '../../Loading'
import RepositoryList from '../../Repository'
import ErrorMessage from '../../Error'

export const handleCurrentUserQuery = ({ data, loading, error, fetchMore }) => {
  if (error) return <ErrorMessage error={error} />

  // Display a loading indicator if our query is pending
  const { viewer } = data
  if (loading && !viewer) {
    return <Loading />
  }

  return (
    <RepositoryList loading={loading} repositories={viewer.repositories} fetchMore={fetchMore} />
  )
}
