import { evolve, matchPercent } from '@react-pdf/fns';

/**
 * @typedef {Function} ResolvePageHorizontalPadding
 * @param {string} value padding value
 * @returns {Object} translated padding value
 */

/**
 * Translates page percentage horizontal paddings in fixed ones
 *
 * @param {Object} container page container
 * @returns {ResolvePageHorizontalPadding} resolve page horizontal padding
 */
const resolvePageHorizontalPadding = (container) => (value) => {
  const match = matchPercent(value);
  return match ? match.percent * container.width : value;
};

/**
 * @typedef {Function} ResolvePageVerticalPadding
 * @param {string} padding value
 * @returns {Object} translated padding value
 */

/**
 * Translates page percentage vertical paddings in fixed ones
 *
 * @param {Object} container page container
 * @returns {ResolvePageVerticalPadding} resolve page vertical padding
 */
const resolvePageVerticalPadding = (container) => (value) => {
  const match = matchPercent(value);
  return match ? match.percent * container.height : value;
};

/**
 * Translates page percentage paddings in fixed ones
 *
 * @param {Object} page
 * @returns {Object} page with fixed paddings
 */
const resolvePagePaddings = (page) => {
  const container = page.style;

  const style = evolve(
    {
      paddingTop: resolvePageVerticalPadding(container),
      paddingLeft: resolvePageHorizontalPadding(container),
      paddingRight: resolvePageHorizontalPadding(container),
      paddingBottom: resolvePageVerticalPadding(container),
    },
    page.style,
  );

  return Object.assign({}, page, { style });
};

/**
 * Translates all pages percentage paddings in fixed ones
 * This has to be computed from pages calculated size and not by Yoga
 * because at this point we didn't performed pagination yet.
 *
 * @param {Object} root document root
 * @returns {Object} document root with translated page paddings
 */
const resolvePagesPaddings = (root) => {
  if (!root.children) return root;

  const children = root.children.map(resolvePagePaddings);

  return Object.assign({}, root, { children });
};

export default resolvePagesPaddings;
