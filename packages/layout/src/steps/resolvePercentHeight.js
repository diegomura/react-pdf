import * as R from 'ramda';

import matchPercent from '../utils/matchPercent';

/**
 * Transform percent height into fixed
 *
 * @param {String | number} height
 * @return {number} height
 */
const transformHeight = pageArea => height => {
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
  const pageHeight = R.path(['style', 'height'], page);
  const pagePaddingTop = R.pathOr(0, ['style', 'paddingTop'], page);
  const pagePaddingBottom = R.pathOr(0, ['style', 'paddingBottom'], page);
  return pageHeight - pagePaddingTop - pagePaddingBottom;
};

/**
 * Checks if page has height
 *
 * @param {Object} page
 * @return {boolean} page has height
 */
const hasHeight = R.hasPath(['style', 'height']);

/**
 * Transform node percent height to fixed
 *
 * @param {Object} page
 * @param {Object} node
 * @return {Object} transformed node
 */
const resolveNodePercentHeight = page => node => {
  if (hasHeight(page)) {
    const pageArea = getPageArea(page);
    return R.evolve({ style: { height: transformHeight(pageArea) } })(node);
  }

  return node;
};

/**
 * Transform page immediate children with percent height to fixed
 *
 * @param {Object} page
 * @return {Object} transformed page
 */
const resolvePagePercentHeight = page =>
  R.evolve({
    children: R.map(resolveNodePercentHeight(page)),
  })(page);

/**
 * Transform all page immediate children with percent height to fixed
 *
 * @param {Object} document root
 * @return {Object} transformed document root
 */
const resolvePercentHeight = R.evolve({
  children: R.map(resolvePagePercentHeight),
});

export default resolvePercentHeight;
