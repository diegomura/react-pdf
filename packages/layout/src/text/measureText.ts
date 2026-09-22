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

// A box that ends up a hair narrower than the text it holds (flex shrink
// resolving in f32) keeps its lines rather than re-breaking a line that
// visually fits; this much overflow is invisible.
const OVERFLOW_TOLERANCE = 1;

/**
 * Whether the lines laid out so far can be reused for a container of
 * `width`: they were broken against this very width, or against a wider
 * container and still fit. Re-breaking text at exactly its own width is not
 * stable (Knuth-Plass), so fitting lines are preferred over a fresh layout.
 * Lines broken against a narrower container are always re-broken: Taffy
 * measures flex items at intermediate (even zero) sizes before their final
 * one. Lines of unknown origin are trusted.
 */
const fits = (node: SafeTextNode, width: number) => {
  if (!node.lines) return false;

  // A page-split fragment owns a slice of the lines but still all of the
  // text children; laying it out again would resurrect the whole text.
  if (node.wasSplit) return true;

  // An intermediate measure at a tiny size can truncate every line away
  if (!node.lines.length) return false;

  const laidOutAt = getLinesLayoutWidth(node.lines);

  if (laidOutAt === undefined) return true;
  if (Math.abs(laidOutAt - width) <= EPSILON) return true;

  return laidOutAt >= width && linesWidth(node) <= width + OVERFLOW_TOLERANCE;
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

    // Taffy sizes flex-basis: 0 items at a zero main size before their final
    // one; breaking the text word by word there is expensive and never shown.
    if (width <= 0) return { width: 0, height: 0 };

    if (!fits(node, width)) {
      // Sizes arrive f32-rounded from Taffy; the tolerance keeps a line that
      // measured as fitting from being broken again, or truncated away, for
      // a rounding error.
      node.lines = layoutText(
        node,
        width + EPSILON,
        height + EPSILON,
        fontStore,
      );
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
