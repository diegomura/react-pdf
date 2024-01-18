import { compose, castArray } from '@react-pdf/fns';

/**
 * Remove nil values from array
 *
 * @template T
 * @param {(T | null | undefined)[]} array
 * @returns {T[]} array without nils
 */
const compact = (array) => array.filter(Boolean);

/**
 * Merges style objects array
 *
 * @param {Object[]} styles style objects array
 * @returns {Object} merged style object
 */
const mergeStyles = (styles) =>
  styles.reduce((acc, style) => {
    const s = Array.isArray(style) ? flatten(style) : style;

    Object.keys(s).forEach((key) => {
      if (s[key] !== null && s[key] !== undefined) {
        acc[key] = s[key];
      }
    });

    return acc;
  }, {});

/**
 * Flattens an array of style objects, into one aggregated style object.
 *
 * @param {Object[]} styles style objects array
 * @returns {Object} flattened style object
 */
const flatten = compose(mergeStyles, compact, castArray);

export default flatten;
