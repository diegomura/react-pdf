import * as R from 'ramda';

import flattenStyles from '../stylesheet/flatten';
import expandStyles from '../stylesheet/expandStyles';
import transformUnits from '../stylesheet/transformUnits';
import transformStyles from '../stylesheet/transformStyles';
import resolveMediaQueries from '../stylesheet/resolveMediaQueries';

/**
 * Resolves styles
 *
 * @param {Object} container
 * @param {Object} style object
 * @returns {Object} resolved style object
 */
const resolveStyles = container =>
  R.compose(
    transformUnits(container),
    transformStyles,
    expandStyles,
    resolveMediaQueries(container),
    flattenStyles,
  );

/**
 * Resolves node styles
 *
 * @param {Object} container
 * @param {Object} document node
 * @returns {Object} node (and subnodes) with resolved styles
 */
const resolveNodeStyles = page => node => {
  const container = R.propOr({}, 'box', page);

  return R.evolve({
    style: resolveStyles(container),
    children: R.map(resolveNodeStyles(page)),
  })(node);
};

/**
 * Resolves page styles
 *
 * @param {Object} document page
 * @returns {Object} document page with resolved styles
 */
const resolvePageStyles = page => {
  const pageBox = R.propOr({}, 'box', page);

  return R.evolve({
    children: R.map(resolveNodeStyles(page)),
    style: R.compose(
      transformUnits(pageBox),
      transformStyles,
      expandStyles,
      flattenStyles,
    ),
  })(page);
};

/**
 * Resolves root styles
 *
 * @param {Object} document root
 * @returns {Object} document root with resolved styles
 */
export default R.evolve({
  children: R.map(resolvePageStyles),
});
