import * as R from 'ramda';

/**
 * Get image ratio
 *
 * @param {Object} image node
 * @returns {Number} image ratio
 */
const getRatio = R.ifElse(
  R.hasPath(['image', 'data']),
  node => node.image.width / node.image.height,
  R.always(1),
);

export default getRatio;
