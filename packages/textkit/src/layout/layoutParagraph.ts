import omit from '../run/omit';
import stringHeight from '../attributedString/height';
import generateLineRects from './generateLineRects';
import {
  AttributedString,
  Container,
  Rect,
  LayoutOptions,
  Paragraph,
} from '../types';
import { Engines } from '../engines';

const ATTACHMENT_CODE = '\ufffc'; // 65532

/**
 * Remove attachment attribute if no char present
 *
 * @param line - Line
 * @returns Line
 */
const purgeAttachments = (line: AttributedString) => {
  const shouldPurge = !line.string.includes(ATTACHMENT_CODE);

  if (!shouldPurge) return line;

  const runs = line.runs.map((run) => omit('attachment', run));

  return Object.assign({}, line, { runs });
};

/**
 * Layout paragraphs inside rectangle
 *
 * @param rects - Rects
 * @param lines - Attributed strings
 * @param indent
 * @returns layout blocks
 */
const layoutLines = (
  rects: Rect[],
  lines: AttributedString[],
  indent: number,
) => {
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

    const newLine: AttributedString = {
      string: line.string,
      runs: line.runs,
      box: {
        x: rect.x + lineIndent,
        y: currentY,
        width: rect.width - lineIndent,
        height,
      },
    };

    currentY += height;

    return purgeAttachments(newLine);
  });
};

/**
 * Performs line breaking and layout
 *
 * @param engines - Engines
 * @param options - Layout options
 */
const layoutParagraph = (engines: Engines, options: LayoutOptions = {}) => {
  /**
   * @param container - Container
   * @param paragraph - Attributed string
   * @returns Layout block
   */
  return (container: Container, paragraph: AttributedString): Paragraph => {
    const height = stringHeight(paragraph);
    const indent = paragraph.runs?.[0]?.attributes?.indent || 0;
    const rects = generateLineRects(container, height);

    const availableWidths = rects.map((r) => r.width);
    availableWidths.unshift(availableWidths[0] - indent);

    const lines = engines.linebreaker(options)(paragraph, availableWidths);

    return layoutLines(rects, lines, indent);
  };
};

export default layoutParagraph;
