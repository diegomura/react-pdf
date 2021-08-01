import * as R from 'ramda';

import append from '../attributedString/append';
import trim from '../attributedString/trim';

const ELLIPSIS_UNICODE = 8230;
const ELLIPSIS_STRING = String.fromCharCode(ELLIPSIS_UNICODE);

/**
 * Get ellipsis codepoint. This may be different in standard and embedded fonts
 *
 * @param  {number}  font
 * @return {Object} ellipsis codepoint
 */
const getEllipsisCodePoint = font => {
  if (!font.encode) return ELLIPSIS_UNICODE;

  const [codePoints] = font.encode(ELLIPSIS_STRING);

  return parseInt(codePoints[0], 16);
};

/**
 * Trucante block with ellipsis
 *
 * @param  {number}  lines quantity
 * @param  {Object}  paragraph block
 * @return {Object} sliced paragraph block
 */
const truncate = block => {
  const runs = R.propOr([], 'runs', R.last(block));
  const font = R.path(['attributes', 'font'], R.last(runs));

  if (font) {
    const codePoint = getEllipsisCodePoint(font);
    const glyph = font.glyphForCodePoint(codePoint);

    return R.adjust(-1, R.compose(append(glyph), trim))(block);
  }

  return block;
};

export default truncate;
