import layoutEngine, {
  bidi,
  linebreaker,
  justification,
  scriptItemizer,
  wordHyphenation,
  textDecoration,
  fontSubstitution,
} from '@react-pdf/textkit';
import FontStore from '@react-pdf/font';

import getAttributedString from './getAttributedString';
import { SafeTextNode } from '../types';

const engines = {
  bidi,
  linebreaker,
  justification,
  textDecoration,
  scriptItemizer,
  wordHyphenation,
  fontSubstitution,
};

const engine = layoutEngine(engines);

const getMaxLines = (node) => node.style?.maxLines;

const getTextOverflow = (node) => node.style?.textOverflow;

const getWritingMode = (node) =>
  node.style?.writingMode || 'horizontal-tb';

const isVerticalWritingMode = (node) => {
  const wm = getWritingMode(node);
  return wm === 'vertical-rl' || wm === 'vertical-lr';
};

/**
 * Get layout container for specific text node
 *
 * @param {number} width
 * @param {number} height
 * @param {Object} node
 * @returns {Object} layout container
 */
const getContainer = (width, height, node) => {
  const maxLines = getMaxLines(node);
  const textOverflow = getTextOverflow(node);

  // For vertical writing modes, swap width and height so the linebreaker
  // treats the available height as the "line length" (characters flow top-to-bottom)
  // and the width as the available space for columns.
  // Use large finite numbers instead of Infinity to avoid NaN from IEEE 754
  // arithmetic (Infinity * 0 = NaN) inside textkit's justifyLine.
  if (isVerticalWritingMode(node)) {
    return {
      x: 0,
      y: 0,
      width: height > 0 ? height : 999999,
      maxLines,
      height: width > 0 ? width : 999999,
      truncateMode: textOverflow,
    };
  }

  return {
    x: 0,
    y: 0,
    width,
    maxLines,
    height: height || Infinity,
    truncateMode: textOverflow,
  };
};

/**
 * Get text layout options for specific text node
 *
 * @param {Object} node instance
 * @returns {Object} layout options
 */
const getLayoutOptions = (fontStore, node) => ({
  hyphenationPenalty: node.props.hyphenationPenalty,
  shrinkWhitespaceFactor: { before: -0.5, after: -0.5 },
  hyphenationCallback:
    node.props.hyphenationCallback ||
    fontStore?.getHyphenationCallback() ||
    null,
});

/**
 * Transform lines from horizontal layout space back to vertical layout space.
 * In vertical mode, textkit lays out as if horizontal, so we need to reinterpret:
 * - Each "line" becomes a vertical column
 * - line.box.y becomes the x position (columns laid out horizontally)
 * - line.box.x becomes the y position (characters within a column)
 * - line.box.width/height are swapped
 *
 * @param lines - Lines from textkit (in horizontal coordinate space)
 * @param containerWidth - Original container width (before swap)
 * @param writingMode - Writing mode
 * @returns Lines with boxes transformed back to vertical coordinate space
 */
/**
 * Compute the actual vertical column height for a line.
 * In vertical CJK text each glyph occupies one em-height (fontSize).
 * We take the larger of the horizontal advance and fontSize per glyph
 * to ensure the column height matches what the renderer will produce.
 */
const verticalColumnHeight = (line) => {
  if (!line.runs) return line.xAdvance || 0;

  let height = 0;
  for (const run of line.runs) {
    const fontSize = run.attributes?.fontSize || 12;
    const numGlyphs = run.glyphs?.length || 0;

    if (run.positions) {
      for (const pos of run.positions) {
        height += Math.max(pos.xAdvance || 0, fontSize);
      }
    } else {
      height += numGlyphs * fontSize;
    }
  }

  return height;
};

const transformVerticalLines = (lines, containerWidth, writingMode) => {
  if (!lines || lines.length === 0) return lines;

  let columnX = 0;

  return lines.map((line, i) => {
    if (!line.box) return line;

    const columnWidth = line.box.height; // each column's own width

    // In vertical-rl, columns go from right to left
    // In vertical-lr, columns go from left to right
    let x;
    if (writingMode === 'vertical-rl') {
      x = containerWidth - columnX - columnWidth;
    } else {
      x = columnX;
    }

    const newBox = {
      x,
      y: line.box.x, // horizontal x position becomes vertical y position
      width: columnWidth, // line height becomes column width
      height: verticalColumnHeight(line), // fontSize-based height to match rendering
    };

    columnX += columnWidth;

    return Object.assign({}, line, { box: newBox });
  });
};

/**
 * Get text lines for given node
 *
 * @param node - Node
 * @param width - Container width
 * @param height - Container height
 * @param fontStore - Font store
 * @returns Layout lines
 */
const layoutText = (
  node: SafeTextNode,
  width: number,
  height: number,
  fontStore: FontStore,
) => {
  const attributedString = getAttributedString(fontStore, node);
  const container = getContainer(width, height, node);
  const options = getLayoutOptions(fontStore, node);
  const lines = engine(attributedString, container, options);

  const flatLines = lines.reduce((acc, line) => [...acc, ...line], []);

  if (isVerticalWritingMode(node)) {
    const writingMode = getWritingMode(node);
    return transformVerticalLines(flatLines, width, writingMode);
  }

  return flatLines;
};

export default layoutText;
