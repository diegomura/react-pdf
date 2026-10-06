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

  // applyDefaultStyles materializes `attachment: null` on every run, so only
  // pay for the omit copy when an attachment is actually set.
  const runs = line.runs.map((run) =>
    run.attributes?.attachment ? omit('attachment', run) : run,
  );

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

type layoutParagraphEngines = Pick<Engines, 'linebreaker'>;

/**
 * Performs line breaking and layout
 *
 * @param engines - Engines
 * @param options - Layout options
 */
const layoutParagraph = (
  engines: layoutParagraphEngines,
  options: LayoutOptions = {},
) => {
  /**
   * @param container - Container
   * @param paragraph - Attributed string
   * @returns Layout block
   */
  return (container: Container, paragraph: AttributedString): Paragraph => {
    const height = stringHeight(paragraph);
    const indent = paragraph.runs?.[0]?.attributes?.indent || 0;
    const rects = generateLineRects(container, height);

    /* A single rect is a uniform measure: prepend the indented first-line
       width and the linebreaker repeats the last entry for the rest. With
       exclusions each rect already maps to one line, so widths must stay
       1:1 with rects — only the first one shrinks by the indent. */
    const availableWidths = rects.map((r) => r.width);

    if (rects.length === 1) {
      availableWidths.unshift(availableWidths[0] - indent);
    } else {
      availableWidths[0] -= indent;
    }

    const lines = engines.linebreaker(options)(paragraph, availableWidths);

    return layoutLines(rects, lines, indent);
  };
};

export default layoutParagraph;
