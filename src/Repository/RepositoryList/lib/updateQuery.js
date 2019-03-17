export const updateQuery = (previousResult, { fetchMoreResult }) => {
  // Return the previous result if there are no new results to work with
  if (!fetchMoreResult) { return previousResult }

  // Use the spread operator to merge previous results along with incoming data
  return {
    ...previousResult,
    viewer: {
      ...previousResult.viewer,
      repositories: {
        ...previousResult.viewer.repositories,
        ...fetchMoreResult.viewer.repositories,
        edges: [
          ...previousResult.viewer.repositories.edges,
          ...fetchMoreResult.viewer.repositories.edges,
        ]
      }
    }
  }
}