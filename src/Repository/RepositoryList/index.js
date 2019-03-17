import React, { Fragment } from 'react'

import RepositoryItem from '../RepositoryItem'
import { updateQuery } from './lib/updateQuery'

import '../style.css'

const RepositoryList = ({ repositories, fetchMore }) => (
  <Fragment>
    {repositories.edges.map(({ node }) => (
      <div key={node.id} className="RepositoryItem">
        <RepositoryItem {...node} />
      </div>
    ))}

    {repositories.pageInfo.hasNextPage && (
      <button type='button' onClick={() => fetchMore({
        variables: {
          cursor: repositories.pageInfo.endCursor,
        },
        updateQuery,
      })}>
        More Repositories
      </button>
    )}
  </Fragment>
)

export default RepositoryList
