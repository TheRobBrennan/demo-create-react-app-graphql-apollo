import { REPOSITORY_FRAGMENT } from '../../../graphql/fragments/repository'
import { VIEWER_SUBSCRIPTIONS } from './viewerSubscriptions'

export const updateWatch = (
  client,
  {
    data: {
      updateSubscription: {
        subscribable: { id, viewerSubscription },
      },
    },
  }
) => {
  const repository = client.readFragment({
    id: `Repository:${id}`,
    fragment: REPOSITORY_FRAGMENT,
  })

  // Note how we are obtaining this from the shape of the fragment
  let { totalCount } = repository.watchers
  totalCount =
    viewerSubscription === VIEWER_SUBSCRIPTIONS.SUBSCRIBED
      ? totalCount + 1
      : totalCount - 1

  // Write the fragment
  client.writeFragment({
    id: `Repository:${id}`,
    fragment: REPOSITORY_FRAGMENT,
    data: {
      ...repository,
      watchers: {
        ...repository.watchers,
        totalCount,
      }
    }
  })
}
