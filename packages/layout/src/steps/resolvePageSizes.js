import * as R from 'ramda';

import getPageSize from '../page/getSize';

/**
 * Resolves page size
 *
 * @param {Object} page
 * @returns {Object} page with resolved size in style attribute
 */
export const resolvePageSize = page => {
  const size = getPageSize(page);
  const style = page.style || {};
  return { ...page, style: { ...style, ...size } };
};

/**
 * Resolves page sizes
 *
 * @param {Object} document root
 * @returns {Object} document root with resolved page sizes
 */
const resolvePageSizes = R.evolve({
  children: R.map(resolvePageSize),
});

export default resolvePageSizes;
