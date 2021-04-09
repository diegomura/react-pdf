import * as R from 'ramda';

/**
 * Slice glyph between codePoints range
 * Util for breaking ligatures
 *
 * @param  {number}  start code point index
 * @param  {number}  end code point index
 * @param  {Object}  font to generate new glyph
 * @param  {Object} glyph to be sliced
 * @return {Array} sliced glyph parts
 */
const slice = (start, end, font, glyph) => {
  if (!glyph) return [];
  if (start === end) return [];
  if (start === 0 && end === glyph.codePoints.length) return [glyph];

  const codePoints = R.slice(start, end, glyph.codePoints);
  const string = String.fromCodePoint(...codePoints);
  return font ? font.layout(string).glyphs : [glyph];
};

export default R.curryN(4, slice);
