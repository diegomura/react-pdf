import * as R from 'ramda';

import scale from '../run/scale';
import resolveGlyphIndices from '../indices/resolve';

const getCharacterSpacing = R.pathOr(0, ['attributes', 'characterSpacing']);

/**
 * Scale run positions
 *
 * @param  {Object}  run
 * @param  {Array}  positions
 * @return {Array} scaled positions
 */
const scalePositions = (run, positions) => {
  const multScale = R.multiply(scale(run));
  const characterSpacing = getCharacterSpacing(run);

  const scalePosition = R.evolve({
    xAdvance: R.o(R.add(characterSpacing), multScale),
    yAdvance: multScale,
    xOffset: multScale,
    yOffset: multScale,
  });

  const subCharacterSpacing = R.evolve({
    xAdvance: R.subtract(R.__, characterSpacing),
  });

  return R.compose(
    R.adjust(-1, subCharacterSpacing),
    R.map(scalePosition),
  )(positions);
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
 * Generate glyphs for single attributed string
 *
 * @param  {Object}  layout engines
 * @param  {Object}  layout options
 * @param  {Array}  attributed strings
 * @return {Array} attributed string with glyphs
 */
const generateGlyphs = () => attributedString =>
  R.evolve({
    runs: R.map(layoutRun(attributedString.string)),
  })(attributedString);

export default generateGlyphs;
