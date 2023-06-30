import stringHeight from '../attributedString/height';
import generateLineRects from './generateLineRects';

/**
 * Layout paragraphs inside rectangle
 *
 * @param  {Object} rect
 * @param  {Array} attributed strings
 * @return {Object} layout blocks
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

    delete line.syllables;
    line.box = {
      x: rect.x + lineIndent,
      y: currentY,
      width: rect.width - lineIndent,
      height,
    };

    currentY += height;
    return line;
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
const layoutParagraph = (engines, options) => (container, paragraph) => {
  const height = stringHeight(paragraph);
  const indent = paragraph.runs?.[0]?.attributes?.indent || 0;
  const rects = generateLineRects(container, height);

  const availableWidths = rects.map(r => r.width);
  availableWidths[0] -= indent;

  const lines = engines.linebreaker(options)(paragraph, availableWidths);

  return layoutLines(rects, lines, indent);
};

export default layoutParagraph;
