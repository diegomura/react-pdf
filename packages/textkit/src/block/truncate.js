import { last } from '@react-pdf/fns';

import trim from '../attributedString/trim';
import append from '../attributedString/append';

const ELLIPSIS_UNICODE = 8230;
const ELLIPSIS_STRING = String.fromCharCode(ELLIPSIS_UNICODE);

/**
 * Get ellipsis codepoint. This may be different in standard and embedded fonts
 *
 * @param {Object} font
 * @returns {Object} ellipsis codepoint
 */
const getEllipsisCodePoint = (font) => {
  if (!font.encode) return ELLIPSIS_UNICODE;

  const [codePoints] = font.encode(ELLIPSIS_STRING);

  return parseInt(codePoints[0], 16);
};

/**
 * Trucante block with ellipsis
 *
 * @param {Object} block paragraph block
 * @returns {Object} sliced paragraph block
 */
const truncate = (block) => {
  const runs = last(block)?.runs || [];
  const font = last(runs)?.attributes?.font;

  if (font) {
    const index = block.length - 1;
    const codePoint = getEllipsisCodePoint(font);
    const glyph = font.glyphForCodePoint(codePoint);
    const lastBlock = append(glyph, trim(block[index]));

    return Object.assign([], block, { [index]: lastBlock });
  }

  return block;
};

export default truncate;
