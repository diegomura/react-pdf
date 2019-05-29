import * as R from 'ramda';

import getPageSize from '../page/getSize';

/**
 * Resolves page size
 *
 * @param {Object} page
 * @returns {Object} page with resolved size in box attribute
 */
const resolvePageSize = page => {
  const size = getPageSize(page);
  return R.evolve({ box: R.merge(size) })(page);
};

/**
 * Add empt box prop if not present in node
 *
 * @param {Object} node
 * @returns {Object} node with box prop
 */
const addBoxIfNotPresent = R.when(
  R.complement(R.has)('box'),
  R.assoc('box', {}),
);

/**
 * Resolves page sizes
 *
 * @param {Object} document root
 * @returns {Object} document root with resolved page sizes
 */
const resolvePageSizes = R.evolve({
  children: R.map(
    R.evolve({
      children: R.map(
        R.compose(
          resolvePageSize,
          addBoxIfNotPresent,
        ),
      ),
    }),
  ),
});

export default resolvePageSizes;
