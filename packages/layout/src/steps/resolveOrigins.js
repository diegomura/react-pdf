import * as R from 'ramda';

import getOrigin from '../node/getOrigin';

/**
 * Resolve node origin
 *
 * @param {Object} node
 * @returns {Object} node with origin attribute
 */
const resolveNodeOrigin = node =>
  R.compose(
    R.evolve({ children: R.map(resolveNodeOrigin) }),
    R.converge(R.assoc('origin'), [getOrigin, R.identity]),
  )(node);

/**
 * Resolve document origins
 *
 * @param {Object} document root
 * @returns {Object} documrnt root
 */
const resolveOrigin = R.evolve({
  children: R.map(resolveNodeOrigin),
});

export default resolveOrigin;
