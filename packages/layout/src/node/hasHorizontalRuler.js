import * as R from 'ramda';

/**
 * Checks if page should render horizontal ruler
 *
 * @param {Object} page
 * @returns {boolean} has horizontal ruler
 */
const hasHorizontalRuler = R.either(
  R.hasPath(['props', 'ruler']),
  R.hasPath(['props', 'horizontalRuler']),
);

export default hasHorizontalRuler;
