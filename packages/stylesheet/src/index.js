import * as R from 'ramda';

import expandStyles from './expand';
import transformUnits from './units';
import flattenStyles from './flatten';
import transformColors from './colors';
import resolveMediaQueries from './mediaQueries';

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
 * @param {Object} style object
 * @returns {Object} resolved style object
 */
const resolveStyles = container =>
  R.compose(
    transformUnits(container),
    transformColors,
    expandStyles,
    resolveMediaQueries(container),
    filterNoneValues,
    flattenStyles,
  );

export default resolveStyles;
