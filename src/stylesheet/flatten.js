import * as R from 'ramda';

/**
 * Remove nil values from array
 *
 * @param {Array} array
 * @returns {Array} array without nils
 */
const compact = R.filter(Boolean);

/**
 * Checks if value is array
 *
 * @param {any} value
 * @returns {Boolean} is value an array
 */
const isArray = R.is(Array);

/**
 * Checks if value is not an array
 *
 * @param {any} value
 * @returns {Boolean} isn't value an array
 */
const isNotArray = R.complement(isArray);

/**
 * Casts value to array
 *
 * @param {any} value
 * @returns {Array} casted value
 */
const castArray = R.when(isNotArray, v => [v]);

/**
 * Merges style objects array
 *
 * @param {Array} style objects array
 * @returns {Object} merged style object
 */
const mergeStyles = styles =>
  styles.reduce((acc, style) => {
    const s = isArray(style) ? flatten(style) : style;

    Object.keys(s).forEach(key => {
      if (s[key] !== null && s[key] !== undefined) {
        acc[key] = s[key];
      }
    });

    return acc;
  }, {});

/**
 * Flattens an array of style objects, into one aggregated style object.
 *
 * @param {Array} style objects array
 * @returns {Object} flatted style object
 */
const flatten = R.compose(
  mergeStyles,
  compact,
  castArray,
);

export default flatten;
