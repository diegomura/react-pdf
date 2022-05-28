import omit from '../run/omit';
import stringHeight from '../attributedString/height';

const ATTACHMENT_CODE = '\ufffc'; // 65532

/**
 * Remove attachment attribute if no char present
 *
 * @param  {Object} attributed string
 * @return {Object} attributed string
 */
const purgeAttachments = attributedString => {
  const shouldPurge = !attributedString.string.includes(ATTACHMENT_CODE);

  if (!shouldPurge) return attributedString;

  const runs = attributedString.runs.map(run => omit('attachment', run));

  return Object.assign({}, attributedString, { runs });
};

/**
 * Layout paragraphs inside rectangle
 *
 * @param  {Object} rect
 * @param  {Array} attributed strings
 * @return {Object} layout blocks
 */
const layoutLines = (rect, lines, indent) => {
  let currentY = rect.y;

  return lines.map((line, i) => {
    const lineIndent = i === 0 ? indent : 0;
    const style = line.runs?.[0]?.attributes || {};
    const height = Math.max(stringHeight(line), style.lineHeight);

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
 * @param  {Object} engines
 * @param  {Object}  layout options
 * @param  {Object} rect
 * @param  {Object} attributed string
 * @return {Object} layout block
 */
const layoutParagraph = (engines, options) => (rect, paragraph) => {
  const indent = paragraph.runs?.[0]?.attributes?.indent || 0;
  const availableWidths = [rect.width - indent, rect.width];
  const lines = engines.linebreaker(options)(paragraph, availableWidths);

  return layoutLines(rect, lines, indent);
};

export default layoutParagraph;
