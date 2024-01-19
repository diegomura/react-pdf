import scale from '../run/scale';
import resolveGlyphIndices from '../indices/resolve';

const getCharacterSpacing = (run) => run.attributes?.characterSpacing || 0;

/**
 * Scale run positions
 *
 * @param {Object} run
 * @param {Object[]} positions
 * @returns {Object[]} scaled positions
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
 * @typedef {Function} LayoutRun
 * @param {Object} run run
 * @returns {Object} glyph run
 */

/**
 * Create glyph run
 *
 * @param {string} string string
 * @returns {LayoutRun} layout run
 */
const layoutRun = (string) => (run) => {
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

/**
 * @typedef {Function} GenerateGlyphs
 * @param {Object} attributedString attributed string
 * @returns {Object} attributed string with glyphs
 */

/**
 * Generate glyphs for single attributed string
 *
 * @returns {GenerateGlyphs} generate glyphs
 */
const generateGlyphs = () => (attributedString) => {
  const runs = attributedString.runs.map(layoutRun(attributedString.string));
  return Object.assign({}, attributedString, { runs });
};

export default generateGlyphs;
