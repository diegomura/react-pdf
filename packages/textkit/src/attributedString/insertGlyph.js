import append from './append';
import add from '../run/add';
import insert from '../run/insert';
import runIndexAt from './runIndexAt';
import stringFromCodePoints from '../utils/stringFromCodePoints';

/**
 * @typedef {import('../types.js').AttributedString} AttributedString
 * @typedef {import('../types.js').Glyph} Glyph
 */

/**
 * Insert glyph into attributed string
 *
 * @param {number} index index
 * @param {Glyph} glyph glyph
 * @param {AttributedString} attributedString attributed string
 * @returns {AttributedString} attributed string with new glyph
 */
function insertGlyph(index, glyph, attributedString) {
  const runIndex = runIndexAt(index, attributedString);

  // Add glyph to the end if run index invalid
  if (runIndex === -1) return append(glyph, attributedString);

  const codePoints = glyph?.codePoints || [];

  const string =
    attributedString.string.slice(0, index) +
    stringFromCodePoints(codePoints) +
    attributedString.string.slice(index);

  const runs = attributedString.runs.map((run, i) => {
    if (i === runIndex) return insert(index - run.start, glyph, run);

    if (i > runIndex) return add(codePoints.length, run);

    return run;
  });

  return Object.assign({}, attributedString, { string, runs });
}

export default insertGlyph;
