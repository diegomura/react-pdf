import * as R from 'ramda';

/**
 * Checks if value is not an array
 *
 * @param {any} value
 * @returns {Boolean} isn't value an array
 */
const isNotArray = R.complement(R.is(Array));

/**
 * Casts value to array
 *
 * @param {any} value
 * @returns {Array} casted value
 */
const castArray = R.when(isNotArray, v => [v]);

export default castArray;
