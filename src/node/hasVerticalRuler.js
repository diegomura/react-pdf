import * as R from 'ramda';

/**
 * Checks if page should render vertical ruler
 *
 * @param {Object} page
 * @returns {boolean} has vertical ruler
 */
const hasVerticalRuler = R.either(
  R.hasPath(['props', 'ruler']),
  R.hasPath(['props', 'verticalRuler']),
);

export default hasVerticalRuler;
