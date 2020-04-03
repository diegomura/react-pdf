import * as R from 'ramda';

import isLink from '../node/isLink';
import flattenStyles from '../stylesheet/flatten';
import expandStyles from '../stylesheet/expandStyles';
import transformUnits from '../stylesheet/transformUnits';
import transformStyles from '../stylesheet/transformStyles';
import transformColors from '../stylesheet/transformColors';
import resolveMediaQueries from '../stylesheet/resolveMediaQueries';

const LINK_STYLES = {
  color: 'blue',
};

/**
 * Filter styles with `none` value
 *
 * @param {Object} style object
 * @returns {Object} style without none values
 */
const filterNoneValues = R.reject(R.equals('none'));

/**
 * Resolves styles
 *
 * @param {Object} container
 * @param {Object} node
 * @param {Object} style object
 * @returns {Object} resolved style object
 */
const resolveStyles = container =>
  R.compose(
    transformUnits(container),
    transformColors,
    transformStyles,
    expandStyles,
    resolveMediaQueries(container),
    filterNoneValues,
    flattenStyles,
  );

/**
 * Resolves node styles
 *
 * @param {Object} container
 * @param {Object} document node
 * @returns {Object} node (and subnodes) with resolved styles
 */
const resolveNodeStyles = container => node =>
  R.o(
    R.when(isLink, R.evolve({ style: R.merge(LINK_STYLES) })),
    R.evolve({
      style: resolveStyles(container),
      children: R.map(resolveNodeStyles(container)),
    }),
  )(node);

/**
 * Resolves page styles
 *
 * @param {Object} document page
 * @returns {Object} document page with resolved styles
 */
const resolvePageStyles = page => {
  const box = R.prop('box', page);
  const style = R.prop('style', page);
  const container = R.isEmpty(box) ? style : box;

  return R.evolve({
    style: resolveStyles(container),
    children: R.map(resolveNodeStyles(container)),
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
