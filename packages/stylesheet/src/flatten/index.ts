import { compose, castArray } from '@react-pdf/fns';
import { Style } from '../types';

type StyleInput = Style | StyleInput[] | null | undefined;

/**
 * Remove nil values from array
 *
 * @param array - Style array
 * @returns Style array without nils
 */
const compact = <T>(array: (T | null | undefined)[]): T[] =>
  array.filter((item): item is T => item != null);

/**
 * Merges style objects array
 *
 * @param styles - Style array
 * @returns Merged style object
 */
const mergeStyles = (styles: StyleInput[]): Style =>
  styles.reduce<Style>((acc, style) => {
    const s = Array.isArray(style) ? flatten(style) : style;

    if (!s) return acc;

    for (const key of Object.keys(s)) {
      if (s[key] != null) {
        acc[key] = s[key];
      }
    }

    return acc;
  }, {});

/**
 * Flattens an array of style objects, into one aggregated style object.
 * Supports nested arrays of styles.
 *
 * @param styles - Style or style array (can be nested)
 * @returns Flattened style object
 */
const flatten = compose(mergeStyles, compact, castArray<StyleInput>);

export default flatten;
