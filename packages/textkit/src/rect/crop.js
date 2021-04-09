import * as R from 'ramda';

/**
 * Crop upper section of rect
 *
 * @param  {Object}  rect
 * @return {Object} cropped rect
 */
const crop = (height, rect) =>
  R.evolve({
    y: R.add(height),
    height: R.subtract(R.__, height),
  })(rect);

export default R.curryN(2, crop);
