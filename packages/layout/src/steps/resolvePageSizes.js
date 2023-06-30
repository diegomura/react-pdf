import { flatten } from '@nutshelllabs/stylesheet';
import getPageSize from '../page/getSize';

/**
 * Resolves page size
 *
 * @param {Object} page
 * @returns {Object} page with resolved size in style attribute
 */
export const resolvePageSize = page => {
  const size = getPageSize(page);
  const style = flatten(page.style || {});
  page.style = { ...style, ...size };
  return page;
};

/**
 * Resolves page sizes
 *
 * @param {Object} document root
 * @returns {Object} document root with resolved page sizes
 */
const resolvePageSizes = root => {
  if (root.children) {
    root.children.forEach(resolvePageSize);
  }
  return root;
};

export default resolvePageSizes;
