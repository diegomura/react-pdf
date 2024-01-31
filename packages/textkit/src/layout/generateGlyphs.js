import scale from '../run/scale';
import resolveGlyphIndices from '../indices/resolve';

/**
 * @typedef {import('../types.js').AttributedString} AttributedString
 * @typedef {import('../types.js').Position} Position
 * @typedef {import('../types.js').Run} Run
 */

/**
 * @param {Run} run
 * @returns {number}
 */
function getCharacterSpacing(run) {
  return run.attributes?.characterSpacing || 0;
}

/**
 * Scale run positions
 *
 * @param {Run} run
 * @param {Position[]} positions
 * @returns {Position[]} scaled positions
 */
const scalePositions = (run, positions) => {
  const runScale = scale(run);
  const characterSpacing = getCharacterSpacing(run);

  return positions.map((position, i) => {
    const isLast = i === positions.length;
    const xSpacing = isLast ? 0 : characterSpacing;

    return Object.assign({}, position, {
      xAdvance: position.xAdvance * runScale + xSpacing,
      yAdvance: position.yAdvance * runScale,
      xOffset: position.xOffset * runScale,
      yOffset: position.yOffset * runScale,
    });
  });
};

/**
 * Create glyph run
 *
 * @param {string} string string
 */
function layoutRun(string) {
  /**
   * @param {Run} run run
   * @returns {Run} glyph run
   */
  return (run) => {
    const { start, end, attributes = {} } = run;
    const { font } = attributes;

    if (!font) return { ...run, glyphs: [], glyphIndices: [], positions: [] };

    const runString = string.slice(start, end);
    const glyphRun = font.layout(runString);
    const positions = scalePositions(run, glyphRun.positions);
    const glyphIndices = resolveGlyphIndices(glyphRun.glyphs);

    return {
      ...run,
      positions,
      glyphIndices,
      glyphs: glyphRun.glyphs,
    };
  };
}

/**
 * Generate glyphs for single attributed string
 */
export default function generateGlyphs() {
  /**
   * @param {AttributedString} attributedString attributed string
   * @returns {AttributedString} attributed string with glyphs
   */
  return (attributedString) => {
    const runs = attributedString.runs.map(layoutRun(attributedString.string));
    return Object.assign({}, attributedString, { runs });
  };
}
