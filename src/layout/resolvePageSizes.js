import * as R from 'ramda';

import getPageSize from '../page/getSize';
import assocIfNil from '../utils/assocIfNil';

/**
 * Resolves page size
 *
 * @param {Object} page
 * @returns {Object} page with resolved size in style attribute
 */
export const resolvePageSize = key => page => {
  const size = getPageSize(page);
  return R.evolve({ [key]: R.merge(R.__, size) })(page);
};

/**
 * Resolves page sizes
 *
 * @param {Object} document root
 * @returns {Object} document root with resolved page sizes
 */
const resolvePageSizes = key => R.evolve({
  children: R.map(
    R.evolve({
      children: R.map(
        R.compose(
          resolvePageSize(key),
          assocIfNil(key, {}),
        ),
      ),
    }),
  ),
});

export default resolvePageSizes;
