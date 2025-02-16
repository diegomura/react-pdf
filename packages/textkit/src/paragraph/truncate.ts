import { last } from '@react-pdf/fns';

import trim from '../attributedString/trim';
import append from '../attributedString/append';
import { Font, Paragraph } from '../types';

const ELLIPSIS_UNICODE = 8230;
const ELLIPSIS_STRING = String.fromCharCode(ELLIPSIS_UNICODE);

/**
 * Get ellipsis codepoint. This may be different in standard and embedded fonts
 *
 * @param font
 * @returns Ellipsis codepoint
 */
const getEllipsisCodePoint = (font: Font) => {
  if (!font.encode) return ELLIPSIS_UNICODE;

  const [codePoints] = font.encode(ELLIPSIS_STRING);

  return parseInt(codePoints[0], 16);
};

/**
 * Trucante block with ellipsis
 *
 * @param paragraph - Paragraph
 * @returns Sliced paragraph
 */
const truncate = (paragraph: Paragraph) => {
  const runs = last(paragraph)?.runs || [];
  const font = last(runs)?.attributes?.font;

  if (font) {
    const index = paragraph.length - 1;
    const codePoint = getEllipsisCodePoint(font);
    const glyph = font.glyphForCodePoint(codePoint);
    const lastBlock = append(glyph, trim(paragraph[index]));

    return Object.assign([], paragraph, { [index]: lastBlock });
  }

  return paragraph;
};

export default truncate;
