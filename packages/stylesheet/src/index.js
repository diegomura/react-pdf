import * as R from 'ramda';

import expandStyles from './expand';
import flattenStyles from './flatten';
import transformStyles from './transform';
import resolveMediaQueries from './mediaQueries';

/**
 * Resolves styles
 *
 * @param {Object} container
 * @param {Object} style object
 * @returns {Object} resolved style object
 */
const resolveStyles = (container, style) =>
  R.compose(
    transformStyles(container),
    expandStyles,
    resolveMediaQueries(container),
    flattenStyles,
  )(style);

// Utils exported for SVG processing
export { default as transformColor } from './transform/colors';

export { default as processTransform } from './transform/transform';

export default R.curryN(2, resolveStyles);
