import React from 'react'

export const handleCurrentUserQuery = ({ data, loading }) => {
  const { viewer } = data

  // Display a loading indicator if our query is pending
  if (loading || !viewer) {
    return <div>Loading...</div>
  }

  return (
    <div>{viewer.name} {viewer.login}</div> 
  )
}
