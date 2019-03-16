import { REPOSITORY_FRAGMENT } from '../../../graphql/fragments/repository'

export const updateRemoveStar = (client, { data: { removeStar: { starrable: { id }}}}) => {
  // Apollo client's cache normalizes and stores queried data automatically.
  // In REPOSITORY_FRAGMENT, we defined a repository fragment on the Repository entity.
  // In this update function, our mutation result is giving us the ID of the repostitory,
  // which means we can use the Apollo client readFragment method to read data from
  // ANY NODE WE HAVE QUERIED PREVIOUSLY.
  //
  // See https://www.apollographql.com/docs/react/advanced/caching.html#readfragment for details.
  const repository = client.readFragment({
    id: `Repository:${id}`,
    fragment: REPOSITORY_FRAGMENT,
  })

  // Update count of stargazers of repository decrementing the value
  // contained within the shape of our repository fragment
  const totalCount = repository.stargazers.totalCount - 1

  // Write repository data back to cache
  client.writeFragment({
    id: `Repository:${id}`,
    fragment: REPOSITORY_FRAGMENT,
    data: {
      ...repository,
      stargazers: {
        ...repository.stargazers,
        totalCount,
      }
    }
  })

}
