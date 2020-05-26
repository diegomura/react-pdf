import * as R from 'ramda';

/**
 * Checks if page has auto height
 *
 * @param {Object} page
 * @returns {Boolean} is page height auto
 */
const isHeightAuto = R.pathSatisfies(R.isNil, ['box', 'height']);

export default isHeightAuto;
