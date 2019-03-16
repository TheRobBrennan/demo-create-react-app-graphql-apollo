import React from 'react'
import { Mutation } from 'react-apollo'
import { REPOSITORY_FRAGMENT} from '../../graphql/fragments/repository'
import { STAR_REPOSITORY } from '../../graphql/mutations/starRepository'
import { handleStarRepositoryMutation } from './lib/handleStarRepositoryMutation'
import { UNSTAR_REPOSITORY } from '../../graphql/mutations/unstarRepository'
import { handleUnstarRepositoryMutation } from './lib/handleUnstarRepositoryMutation'

import Link from '../../Link'
import '../style.css'

const updateAddStar = (client, { data: { addStar: { starrable: { id }}}}) => {
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

  // Update count of stargazers of repository

  // Write repository back to cache

}

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
          <Mutation mutation={STAR_REPOSITORY} variables={{ id }} update={updateAddStar}>
            {handleStarRepositoryMutation(stargazers)}
          </Mutation>
        ) : (
          <Mutation mutation={UNSTAR_REPOSITORY} variables={{ id }}>
            {handleUnstarRepositoryMutation(stargazers)}
          </Mutation>
        )}
        {/* Here comes your updateSubscription mutation */}
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
