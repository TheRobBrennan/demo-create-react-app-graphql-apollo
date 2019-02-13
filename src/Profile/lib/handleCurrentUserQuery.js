import React from 'react'

import Loading from '../../Loading'

export const handleCurrentUserQuery = ({ data, loading }) => {
  const { viewer } = data

  // Display a loading indicator if our query is pending
  if (loading || !viewer) {
    return <Loading />
  }

  return (
    <div>{viewer.name} {viewer.login}</div> 
  )
}
