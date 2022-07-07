import { flatten } from '@react-pdf/stylesheet';
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

  return { ...page, style: { ...style, ...size } };
};

/**
 * Resolves page sizes
 *
 * @param {Object} document root
 * @returns {Object} document root with resolved page sizes
 */
const resolvePageSizes = root => {
  if (!root.children) return root;

  const children = root.children.map(resolvePageSize);

  return Object.assign({}, root, { children });
};

export default resolvePageSizes;
