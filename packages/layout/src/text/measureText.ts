import FontStore from '@react-pdf/font';

import layoutText, { getLinesLayoutWidth } from './layoutText';
import linesWidth from './linesWidth';
import linesHeight from './linesHeight';
import { MeasureFunction, MeasureMode } from '../taffy/measure';
import { SafePageNode, SafeTextNode } from '../types';

// Wide enough that any text lays out on a single line, finite so textkit's
// alignment arithmetic stays finite.
const MAX_CONTENT_WIDTH = 1e6;

// Taffy computes in f32, so sizes come back a few ulps off the f64 values
// textkit produced; a hundredth of a point is far below anything visible.
const EPSILON = 0.01;

/**
 * Whether the lines laid out so far can be reused for a container of
 * `width`. Lines broken against a definite width are always kept, even if
 * the box has since become narrower (flex shrink) or wider (a split stripped
 * padding): re-breaking text is not stable (Knuth-Plass) and pagination
 * relies on lines surviving relayouts, which is also how the Yoga-based
 * layout behaved. Only lines broken against an unconstrained width are
 * re-broken, when they overflow. Lines of unknown origin are trusted.
 */
const fits = (node: SafeTextNode, width: number) => {
  if (!node.lines) return false;

  const laidOutAt = getLinesLayoutWidth(node.lines);

  if (laidOutAt !== MAX_CONTENT_WIDTH) return true;

  return linesWidth(node) <= width + EPSILON;
};

/**
 * Lines laid out against an unconstrained width can only be kept for
 * left-aligned text: any other alignment positions glyphs relative to the
 * (huge) container width.
 */
const isLeftAligned = (node: SafeTextNode) => {
  const align =
    node.style?.textAlign ||
    (node.style?.direction === 'rtl' ? 'right' : 'left');
  return align === 'left';
};

/**
 * Text measure function. Lays out lines against the given constraint and
 * caches them on the node, so text is broken as few times as possible.
 * Whatever lines the node ends up with are what gets rendered; the box may
 * be narrower than the container the lines were broken against, which
 * `resolveDimensions` compensates through `alignOffset`.
 *
 * @param page
 * @param node
 * @param fontStore
 * @returns measure text function
 */
const measureText =
  (
    page: SafePageNode,
    node: SafeTextNode,
    fontStore: FontStore,
  ): MeasureFunction =>
  (width, widthMode, height) => {
    if (widthMode === MeasureMode.Undefined) {
      // max-content (width Infinity) or min-content (width 0)
      if (node.lines) {
        return { width: linesWidth(node), height: linesHeight(node) };
      }

      const containerWidth = width === Infinity ? MAX_CONTENT_WIDTH : 0;
      const lines = layoutText(node, containerWidth, height, fontStore);
      const measured = { lines } as SafeTextNode;

      if (containerWidth === MAX_CONTENT_WIDTH && isLeftAligned(node)) {
        node.lines = lines;
      }

      return { width: linesWidth(measured), height: linesHeight(measured) };
    }

    if (!fits(node, width)) {
      // Widths arrive f32-rounded from Taffy; the tolerance keeps a line that
      // measured as fitting from being broken again for a rounding error.
      node.lines = layoutText(node, width + EPSILON, height, fontStore);
    }

    return {
      height: linesHeight(node),
      width:
        widthMode === MeasureMode.Exactly
          ? width
          : Math.min(width, linesWidth(node)),
    };
  };

export default measureText;
