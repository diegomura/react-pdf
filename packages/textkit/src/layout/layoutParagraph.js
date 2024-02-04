import omit from '../run/omit';
import stringHeight from '../attributedString/height';
import generateLineRects from './generateLineRects';

const ATTACHMENT_CODE = '\ufffc'; // 65532

/**
 * @typedef {import('../types.js').AttributedString} AttributedString
 * @typedef {import('../types.js').Rect} Rect
 */

/**
 * Remove attachment attribute if no char present
 *
 * @param {AttributedString} attributedString attributed string
 * @returns {AttributedString} attributed string
 */
const purgeAttachments = (attributedString) => {
  const shouldPurge = !attributedString.string.includes(ATTACHMENT_CODE);

  if (!shouldPurge) return attributedString;

  const runs = attributedString.runs.map((run) => omit('attachment', run));

  return Object.assign({}, attributedString, { runs });
};

/**
 * Layout paragraphs inside rectangle
 *
 * @param {Object} rects rect
 * @param {Object[]} lines attributed strings
 * @param {number} indent
 * @returns {Object} layout blocks
 */
const layoutLines = (rects, lines, indent) => {
  let rect = rects.shift();
  let currentY = rect.y;

  return lines.map((line, i) => {
    const lineIndent = i === 0 ? indent : 0;
    const style = line.runs?.[0]?.attributes || {};
    const height = Math.max(stringHeight(line), style.lineHeight);

    if (currentY + height > rect.y + rect.height && rects.length > 0) {
      rect = rects.shift();
      currentY = rect.y;
    }

    const newLine = Object.assign({}, line);

    delete newLine.syllables;

    newLine.box = {
      x: rect.x + lineIndent,
      y: currentY,
      width: rect.width - lineIndent,
      height,
    };

    currentY += height;

    return purgeAttachments(newLine);
  });
};

/**
 * Performs line breaking and layout
 *
 * @param {Object} engines engines
 * @param {Object} options layout options
 */
const layoutParagraph = (engines, options) => {
  /**
   * @param {Rect} container rect
   * @param {Object} paragraph attributed string
   * @returns {Object} layout block
   */
  return (container, paragraph) => {
    const height = stringHeight(paragraph);
    const indent = paragraph.runs?.[0]?.attributes?.indent || 0;
    const rects = generateLineRects(container, height);

    const availableWidths = rects.map((r) => r.width);
    availableWidths[0] -= indent;

    const lines = engines.linebreaker(options)(paragraph, availableWidths);

    return layoutLines(rects, lines, indent);
  };
};

export default layoutParagraph;
