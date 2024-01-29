import scale from './scale';
import offset from './offset';
import getFont from './getFont';
import sliceGlyph from '../glyph/slice';
import glyphIndexAt from './glyphIndexAt';
import normalizeIndices from '../indices/normalize';

/**
 * Slice run between glyph indices range
 *
 * @param {number} start glyph index
 * @param {number} end glyph index
 * @param {Object} run
 * @returns {Object} sliced run
 */
const slice = (start, end, run) => {
  const runScale = scale(run);
  const font = getFont(run);

  // Get glyph start and end indices
  const startIndex = glyphIndexAt(start, run);
  const endIndex = glyphIndexAt(end, run);

  // Get start and end glyph
  const startGlyph = run.glyphs?.[startIndex];
  const endGlyph = run.glyphs?.[endIndex];

  // Get start ligature chunks (if any)
  const startOffset = offset(start, run);
  const startGlyphs =
    startOffset > 0 ? sliceGlyph(startOffset, Infinity, font, startGlyph) : [];

  // Get end ligature chunks (if any)
  const endOffset = offset(end, run);
  const endGlyphs = sliceGlyph(0, endOffset, font, endGlyph);

  // Compute new glyphs
  const sliceStart = startIndex + Math.min(1, startOffset);
  const glyphs = (run.glyphs || []).slice(sliceStart, endIndex);

  // Compute new positions
  const glyphPosition = (g) => ({ xAdvance: g.advanceWidth * runScale });
  const startPositions = startGlyphs.map(glyphPosition);
  const positions = (run.positions || []).slice(sliceStart, endIndex);
  const endPositions = endGlyphs.map(glyphPosition);

  return Object.assign({}, run, {
    start: run.start + start,
    end: Math.min(run.end, run.start + end),
    glyphIndices: normalizeIndices((run.glyphIndices || []).slice(start, end)),
    glyphs: [startGlyphs, glyphs, endGlyphs].flat(),
    positions: [startPositions, positions, endPositions].flat(),
  });
};

export default slice;
