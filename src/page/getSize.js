import * as R from 'ramda';

import isPortrait from './isPortrait';
import { PAGE_SIZES } from '../constants';

/**
 * Transforms array into size object
 *
 * @param {Array} array
 * @returns {Object} size object with width and height
 */
const toSizeObject = R.applySpec({
  width: R.prop(0),
  height: R.prop(1),
});

/**
 * Flip size object
 *
 * @param {Object} size object
 * @returns {Object} flipped size object
 */
const flipSizeObject = R.applySpec({
  width: R.prop('height'),
  height: R.prop('width'),
});

/**
 * Returns size object from a given string
 *
 * @param {String} page size string
 * @returns {Object} size object with width and height
 */
const getStringSize = R.compose(
  toSizeObject,
  R.prop(R.__, PAGE_SIZES),
  R.toUpper,
);

/**
 * Returns size object from a single number
 *
 * @param {Number} page size number
 * @returns {Object} size object with width and height
 */
const getNumberSize = R.compose(
  toSizeObject,
  v => [v],
);

/**
 * Throws invalid size error
 *
 * @param {String} invalid page size input
 */
const throwInvalidError = size => {
  throw new Error(`Invalid Page size: ${JSON.stringify(size)}`);
};

/**
 * Return page size in an object { width, height }
 *
 * @param {Object} page instance
 * @returns {Object} size object with width and height
 */
const getSize = page => {
  const size = R.compose(
    R.cond([
      [R.is(String), getStringSize],
      [R.is(Array), toSizeObject],
      [R.is(Number), getNumberSize],
      [R.is(Object), R.identity],
      [R.T, throwInvalidError],
    ]),
    R.pathOr('A4', ['props', 'size']),
  )(page);

  return isPortrait(page) ? flipSizeObject(size) : size;
};

export default getSize;
