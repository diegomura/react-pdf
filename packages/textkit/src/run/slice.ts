import scale from './scale';
import offset from './offset';
import getFont from './getFont';
import sliceGlyph from '../glyph/slice';
import glyphIndexAt from './glyphIndexAt';
import normalize from '../utils/normalize';
import { Glyph, Position, Run } from '../types';

/**
 * Slice run between string indices range
 *
 * @param start - String index
 * @param end - String index
 * @param run - Run
 * @returns Sliced run
 */
const slice = (start: number, end: number, run: Run): Run => {
  const runScale = scale(run);
  const font = getFont(run);

  // Get glyph start and end indices
  const startIndex = glyphIndexAt(start, run);
  const endIndex = glyphIndexAt(end - 1, run);

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
  const startGlyphCovers =
    (run.glyphIndices?.[startIndex] ?? startIndex) >= start;
  const sliceStart =
    startIndex + (startOffset > 0 || !startGlyphCovers ? 1 : 0);
  const sliceEnd = endIndex + 1 - Math.min(1, endOffset);
  const glyphs = (run.glyphs || []).slice(sliceStart, sliceEnd);

  // Compute new positions
  const glyphPosition = (g: Glyph): Position => ({
    xAdvance: g.advanceWidth * runScale,
    yAdvance: 0,
    xOffset: 0,
    yOffset: 0,
  });
  const startPositions = startGlyphs.map(glyphPosition);
  const positions = (run.positions || []).slice(sliceStart, sliceEnd);
  const endPositions = endGlyphs.map(glyphPosition);

  // Compute new string indices
  const stringIndices = normalize((run.stringIndices || []).slice(start, end));

  // Compute new glyph indices
  const startGlyphIndices = startGlyphs.map(
    (_, i) => (run.glyphIndices?.[startIndex] ?? 0) - start + startOffset + i,
  );
  const slicedGlyphIndices = (run.glyphIndices || [])
    .slice(sliceStart, sliceEnd)
    .map((v) => v - start);
  const endGlyphIndices = endGlyphs.map(
    (_, i) => (run.glyphIndices?.[endIndex] ?? 0) - start + i,
  );
  const glyphIndices = [
    startGlyphIndices,
    slicedGlyphIndices,
    endGlyphIndices,
  ].flat();

  return Object.assign({}, run, {
    start: Math.max(run.start + start, 0),
    end: Math.max(Math.min(run.end, run.start + end), 0),
    stringIndices,
    glyphIndices,
    glyphs: [startGlyphs, glyphs, endGlyphs].flat(),
    positions: [startPositions, positions, endPositions].flat(),
  });
};

export default slice;
