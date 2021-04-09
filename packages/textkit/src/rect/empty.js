import * as R from 'ramda';

/**
 * Returns empty rect
 *
 * @return {Object} empty rect
 */
const empty = R.always({
  x: 0,
  y: 0,
  width: 0,
  height: 0,
});

export default empty;
