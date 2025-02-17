import { compose, castArray } from '@react-pdf/fns';
import { Style } from '../types';

/**
 * Remove nil values from array
 *
 * @param array - Style array
 * @returns Style array without nils
 */
const compact = (array: Style[]) => array.filter(Boolean);

/**
 * Merges style objects array
 *
 * @param styles - Style array
 * @returns Merged style object
 */
const mergeStyles = (styles: Style[]) =>
  styles.reduce((acc: Style, style) => {
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
 * @param styles - Style or style array
 * @returns Flattened style object
 */
const flatten = compose(
  mergeStyles,
  compact,
  castArray<Style | null | undefined>,
);

export default flatten;
