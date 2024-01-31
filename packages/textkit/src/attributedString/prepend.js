import add from '../run/add';
import emptyRun from '../run/empty';
import prependToRun from '../run/prepend';
import stringFromCodePoints from '../utils/stringFromCodePoints';

/**
 * @typedef {import('../types.js').AttributedString} AttributedString
 * @typedef {import('../types.js').Glyph} Glyph
 */

/**
 * prepend glyph into last run of attributed string
 *
 * @param {Glyph} glyph
 * @param {AttributedString} attributedString attributed string
 * @returns {AttributedString} attributed string with new glyph
 */
export default function prepend(glyph, attributedString) {
  const codePoints = glyph?.codePoints || [];
  const string = stringFromCodePoints(codePoints) + attributedString.string;

  const offset = codePoints.length;
  const firstRun = attributedString.runs[0] || emptyRun();
  const lastRuns = attributedString.runs
    .slice(1)
    .map((run) => add(offset, run));
  const runs = [prependToRun(glyph, firstRun)].concat(lastRuns);

  return Object.assign({}, attributedString, { runs, string });
}
