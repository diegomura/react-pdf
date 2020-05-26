import * as R from 'ramda';

/**
 * Sort children by zIndex value
 *
 * @param {Object} node
 * @returns {Object} node
 */
const resolveZIndex = node =>
  R.evolve({
    children: R.compose(
      R.map(resolveZIndex),
      R.sortBy(R.path(['style', 'zIndex'])),
    ),
  })(node);

export default resolveZIndex;
