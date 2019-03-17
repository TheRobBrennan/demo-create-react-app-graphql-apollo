import React from 'react'
import { Mutation } from 'react-apollo'

import { STAR_REPOSITORY } from '../../graphql/mutations/starRepository'
import { handleStarRepositoryMutation } from './lib/handleStarRepositoryMutation'
import { updateAddStar } from './lib/updateAddStar'

import { UNSTAR_REPOSITORY } from '../../graphql/mutations/unstarRepository'
import { handleUnstarRepositoryMutation } from './lib/handleUnstarRepositoryMutation'
import { updateRemoveStar } from './lib/updateRemoveStar'

import { WATCH_REPOSITORY } from '../../graphql/mutations/watchRepository'
import { VIEWER_SUBSCRIPTIONS } from './lib/viewerSubscriptions'
import { isWatch } from './lib/isWatch'
import { updateWatch } from './lib/updateWatch'

import Link from '../../Link'
import '../style.css'
import Button from '../../Button';

const RepositoryItem = ({
  id,
  name,
  url,
  descriptionHTML,
  primaryLanguage,
  owner,
  stargazers,
  watchers,
  viewerSubscription,
  viewerHasStarred,
}) => (
  <div>
    <div className="RepositoryItem-title">
      <h2>
        <Link href={url}>{name}</Link>
      </h2>
      <div>
        {!viewerHasStarred ? (
          <Mutation
            mutation={STAR_REPOSITORY}
            variables={{ id }}
            update={updateAddStar}
          >
            {handleStarRepositoryMutation(stargazers)}
          </Mutation>
        ) : (
          <Mutation
            mutation={UNSTAR_REPOSITORY}
            variables={{ id }}
            update={updateRemoveStar}
          >
            {handleUnstarRepositoryMutation(stargazers)}
          </Mutation>
        )}

        <Mutation
          mutation={WATCH_REPOSITORY}
          variables={{
            id,
            viewerSubscription: isWatch(viewerSubscription)
              ? VIEWER_SUBSCRIPTIONS.UNSUBSCRIBED
              : VIEWER_SUBSCRIPTIONS.SUBSCRIBED,
          }}
          optimisticResponse={{
            updateSubscription: {
              __typename: 'Mutation',
              subscribable: {
                __typename: 'Repository',
                id,
                viewerSubscription: isWatch(viewerSubscription)
                  ? VIEWER_SUBSCRIPTIONS.UNSUBSCRIBED
                  : VIEWER_SUBSCRIPTIONS.SUBSCRIBED
              }
            }
          }}
          update={updateWatch}
        >
          {(updateSubscription, { data, loading, error }) => (
            <Button className="RepositoryItem-title-action"
            onClick={updateSubscription}>
              {watchers.totalCount}{' '}
              {isWatch(viewerSubscription) ? 'Unwatch' : 'Watch'}
            </Button>
          )}
        </Mutation>
      </div>
    </div>

    <div className="RepositoryItem-description">
      <div
        className="RepositoryItem-description-info"
        dangerouslySetInnerHTML={{ __html: descriptionHTML }}
      />
      <div className="RepositoryItem-description-details">
        <div>
          {primaryLanguage && <span>Language: {primaryLanguage.name}</span>}
        </div>
        <div>
          {owner && (
            <span>
              Owner:{' '}
              <a href={owner.url} target="__blank">
                {owner.login}
              </a>
            </span>
          )}
        </div>
      </div>
    </div>
  </div>
)

export default RepositoryItem
