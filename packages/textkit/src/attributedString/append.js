import { last } from '@react-pdf/fns';

import emptyRun from '../run/empty';
import appendToRun from '../run/append';
import stringFromCodePoints from '../utils/stringFromCodePoints';

/**
 * @typedef {import('../types.js').AttributedString} AttributedString
 * @typedef {import('../types.js').Glyph} Glyph
 */

/**
 * Append glyph into last run of attributed string
 *
 * @param {Glyph} glyph glyph
 * @param {AttributedString} attributedString attributed string
 * @returns {AttributedString} attributed string with new glyph
 */
const append = (glyph, attributedString) => {
  const codePoints = glyph?.codePoints || [];
  const codePointsString = stringFromCodePoints(codePoints);
  const string = attributedString.string + codePointsString;

  const firstRuns = attributedString.runs.slice(0, -1);
  const lastRun = last(attributedString.runs) || emptyRun();
  const runs = firstRuns.concat(appendToRun(glyph, lastRun));

  return Object.assign({}, attributedString, { string, runs });
};

export default append;
