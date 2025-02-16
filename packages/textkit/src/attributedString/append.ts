import { last } from '@react-pdf/fns';

import emptyRun from '../run/empty';
import appendToRun from '../run/append';
import stringFromCodePoints from '../utils/stringFromCodePoints';
import { AttributedString, Glyph } from '../types';

/**
 * Append glyph into last run of attributed string
 *
 * @param glyph - Glyph or code point
 * @param attributedString - Attributed string
 * @returns Attributed string with new glyph
 */
const append = (
  glyph: Glyph | number | null,
  attributedString: AttributedString,
): AttributedString => {
  const codePoints = typeof glyph === 'number' ? [glyph] : glyph?.codePoints;
  const codePointsString = stringFromCodePoints(codePoints || []);
  const string = attributedString.string + codePointsString;

  const firstRuns = attributedString.runs.slice(0, -1);
  const lastRun = last(attributedString.runs) || emptyRun();
  const runs = firstRuns.concat(appendToRun(glyph, lastRun));

  return Object.assign({}, attributedString, { string, runs });
};

export default append;
