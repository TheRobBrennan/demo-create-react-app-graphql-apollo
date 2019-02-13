import React from 'react'
import Button from '../../../Button'

// Note that the first argument - addStar - is the mutation itself and
// it IS NOT THE MUTATION RESULT (like we saw in the Query component).
//
// We will use this function to trigger the mutation; later we will see
// how to retrieve the mutation result.
export const handleStarRepositoryMutation = (stargazers) => (addStar, { data, loading, error }) => (
  <Button className={'RepositoryItem-title-action'} onClick={addStar}>
    {stargazers.totalCount} Stars
  </Button>
)