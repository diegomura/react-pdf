import scale from '../run/scale';
import resolveGlyphIndices from '../indices/resolve';

const getCharacterSpacing = run => run.attributes?.characterSpacing || 0;

/**
 * Scale run positions
 *
 * @param  {Object}  run
 * @param  {Array}  positions
 * @return {Array} scaled positions
 */
const scalePositions = (run, positions) => {
  const runScale = scale(run);
  const characterSpacing = getCharacterSpacing(run);

  positions.forEach((position, i) => {
    const isLast = i === positions.length;
    const xSpacing = isLast ? 0 : characterSpacing;

    position.xAdvance = position.xAdvance * runScale + xSpacing;
    position.yAdvance *= runScale;
    position.xOffset *= runScale;
    position.yOffset *= runScale;
  });
};

/**
 * Create glyph run
 *
 * @param  {String}  string
 * @param  {Object}  run
 * @return {Object}  glyph run
 */
const layoutRun = string => run => {
  const { start, end, attributes = {} } = run;
  const { font } = attributes;

  if (!font) {
    run.positions = [];
    run.glyphIndices = [];
    run.glyphs = [];
    return;
  }

  const runString = string.slice(start, end);
  const glyphRun = font.layout(runString);
  scalePositions(run, glyphRun.positions);
  const glyphIndices = resolveGlyphIndices(glyphRun.glyphs);

  run.positions = glyphRun.positions;
  run.glyphIndices = glyphIndices;
  run.glyphs = glyphRun.glyphs;
};

/**
 * Generate glyphs for single attributed string
 *
 * @param  {Object}  layout engines
 * @param  {Object}  layout options
 * @param  {Array}  attributed strings
 * @return {Array} attributed string with glyphs
 */
const generateGlyphs = () => attributedString => {
  attributedString.runs.forEach(layoutRun(attributedString.string));
  return attributedString;
};

export default generateGlyphs;
