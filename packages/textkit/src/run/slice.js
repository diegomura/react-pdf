import * as R from 'ramda';

import scale from './scale';
import offset from './offset';
import getFont from './getFont';
import sliceGlyph from '../glyph/slice';
import glyphIndexAt from './glyphIndexAt';
import normalizeIndices from '../indices/normalize';

/**
 * Slice run between glyph indices range
 *
 * @param  {number}  start glyph index
 * @param  {number}  end glyph index
 * @param  {Object}  run
 * @return {Object} sliced run
 */
const slice = (start, end, run) => {
  const runScale = scale(run);
  const font = getFont(run);

  // Get glyph start and end indices
  const glyphStartIndex = glyphIndexAt(start, run);
  const glyphEndIndex = glyphIndexAt(end, run);

  // Get start and end glyph
  const startGlyph = R.path(['glyphs', glyphStartIndex], run);
  const endGlyph = R.path(['glyphs', glyphEndIndex], run);

  // Get start ligature chunks (if any)
  const startOffset = offset(start, run);
  const startGlyphs =
    startOffset > 0 ? sliceGlyph(startOffset, Infinity, font, startGlyph) : [];

  // Get end ligature chunks (if any)
  const endOffset = offset(end, run);
  const endGlyphs = sliceGlyph(0, endOffset, font, endGlyph);

  const sliceOffset = Math.min(1, startOffset);

  return R.evolve({
    start: R.add(start),
    end: R.compose(
      R.apply(R.min),
      R.juxt([
        R.identity, // string.end
        R.o(R.add(end), R.always(run.start)), // end + string.start
      ]),
    ),
    glyphs: glyphs =>
      R.flatten([
        startGlyphs,
        glyphs.slice(glyphStartIndex + sliceOffset, glyphEndIndex),
        endGlyphs,
      ]),
    positions: positions =>
      R.flatten([
        startGlyphs.map(g => ({ xAdvance: g.advanceWidth * runScale })),
        positions.slice(glyphStartIndex + sliceOffset, glyphEndIndex),
        endGlyphs.map(g => ({ xAdvance: g.advanceWidth * runScale })),
      ]),
    glyphIndices: R.o(normalizeIndices, R.slice(start, end)),
    attributes: R.identity,
  })(run);
};

export default R.curryN(3, slice);
