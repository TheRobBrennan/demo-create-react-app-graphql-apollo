import React from 'react'

export const handleCurrentUserQuery = ({ data }) => {
  const { viewer } = data

  if (!viewer) return null

  return (
    <div>{viewer.name} {viewer.login}</div> 
  )
}
