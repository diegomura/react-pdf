import { compose, castArray } from '@react-pdf/fns';
import { Style } from '../types';

/**
 * Remove nil values from array
 *
 * @param array - Styles array
 * @returns Styles array without nil values
 */
const compact = (array: Style[]) => array.filter(Boolean);

/**
 * Merges style objects array
 *
 * @param styles - Style objects array
 * @returns Merged style object
 */
const mergeStyles = (styles: Style[]) =>
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
 * @param styles - Style objects or array
 * @returns - Flattened style object
 */
const flatten = compose(
  mergeStyles,
  compact,
  castArray<Style | undefined | null>,
);

export default flatten;
