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

type layoutParagraphEngines = Pick<Engines, 'linebreaker'>;

// Mirror Firefox's `text-wrap: balance` cap. Above this, the spec lets us fall
// back to plain wrap to avoid pathological binary-search cost on body copy.
const BALANCE_LINE_LIMIT = 10;
// Width precision (pt) for the balance binary search.
const BALANCE_PRECISION = 1;

/**
 * Find the smallest container width that still yields the same number of
 * wrapped lines as the natural width. Equalizes line lengths for
 * `text-wrap: balance` (titles, short headings).
 */
const computeBalancedWidth = (
  linebreak: ReturnType<Engines['linebreaker']>,
  paragraph: AttributedString,
  width: number,
  naturalLineCount: number,
): number => {
  let lo = 0;
  let hi = width;

  while (hi - lo > BALANCE_PRECISION) {
    const mid = (lo + hi) / 2;
    const lines = linebreak(paragraph, [mid]);
    if (lines.length === naturalLineCount) {
      hi = mid;
    } else {
      lo = mid;
    }
  }

  return hi;
};

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
    const linebreak = engines.linebreaker(options);

    let availableWidths: number[];

    if (options.textWrap === 'nowrap') {
      availableWidths = [Infinity];
    } else if (options.textWrap === 'balance') {
      const naturalWidths = rects.map((r) => r.width);
      const naturalLines = linebreak(paragraph, naturalWidths);

      if (
        naturalLines.length > 1 &&
        naturalLines.length <= BALANCE_LINE_LIMIT
      ) {
        const balanced = computeBalancedWidth(
          linebreak,
          paragraph,
          naturalWidths[0],
          naturalLines.length,
        );
        availableWidths = [balanced];
      } else {
        availableWidths = naturalWidths;
        availableWidths.unshift(availableWidths[0] - indent);
      }
    } else {
      availableWidths = rects.map((r) => r.width);
      availableWidths.unshift(availableWidths[0] - indent);
    }

    const lines = linebreak(paragraph, availableWidths);

    return layoutLines(rects, lines, indent);
  };
};

export default layoutParagraph;
