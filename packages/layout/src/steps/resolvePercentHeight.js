import { isNil, matchPercent } from '@react-pdf/fns';

/**
 * Transform percent height into fixed
 *
 * @param {String | number} height
 * @return {number} height
 */
const transformHeight = (pageArea, height) => {
  const match = matchPercent(height);
  return match ? match.percent * pageArea : height;
};

/**
 * Get page area (height minus paddings)
 *
 * @param {Object} page
 * @return {number} page area
 */
const getPageArea = page => {
  const pageHeight = page.style.height;
  const pagePaddingTop = page.style?.paddingTop || 0;
  const pagePaddingBottom = page.style?.paddingBottom || 0;

  return pageHeight - pagePaddingTop - pagePaddingBottom;
};

/**
 * Transform node percent height to fixed
 *
 * @param {Object} page
 * @param {Object} node
 * @return {Object} transformed node
 */
const resolveNodePercentHeight = (page, node) => {
  if (isNil(page.style?.height)) return node;
  if (isNil(node.style?.height)) return node;

  const pageArea = getPageArea(page);
  const height = transformHeight(pageArea, node.style.height);
  const style = Object.assign({}, node.style, { height });

  return Object.assign({}, node, { style });
};

/**
 * Transform page immediate children with percent height to fixed
 *
 * @param {Object} page
 * @return {Object} transformed page
 */
const resolvePagePercentHeight = page => {
  if (!page.children) return page;

  const resolveChild = child => resolveNodePercentHeight(page, child);
  const children = page.children.map(resolveChild);

  return Object.assign({}, page, { children });
};

/**
 * Transform all page immediate children with percent height to fixed.
 * This is needed for computing correct dimensions on pre-pagination layout.
 *
 * @param {Object} document root
 * @return {Object} transformed document root
 */
const resolvePercentHeight = root => {
  if (!root.children) return root;

  const children = root.children.map(resolvePagePercentHeight);

  return Object.assign({}, root, { children });
};

export default resolvePercentHeight;
