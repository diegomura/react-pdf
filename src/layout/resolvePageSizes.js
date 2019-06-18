import * as R from 'ramda';

import getPageSize from '../page/getSize';
import assocIfNil from '../utils/assocIfNil';

/**
 * Resolves page size
 *
 * @param {Object} page
 * @returns {Object} page with resolved size in style attribute
 */
const resolvePageSize = page => {
  const size = getPageSize(page);
  return R.evolve({ style: R.merge(size) })(page);
};

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
          assocIfNil('style', {}),
        ),
      ),
    }),
  ),
});

export default resolvePageSizes;
