import * as P from '@react-pdf/primitives';
import FontStore from '@react-pdf/font';
import { Rect } from '@react-pdf/textkit';

import layoutText from '../text/layoutText';
import { FloatSibling, SafeNode, SafeSvgNode, SafeTextNode } from '../types';

const isSvg = (node: SafeNode): node is SafeSvgNode => node.type === P.Svg;

const isText = (node: SafeNode): node is SafeTextNode => node.type === P.Text;

const shouldIterate = (node: SafeNode) => !isSvg(node) && !isText(node);

/**
 * Check if text node needs layout.
 * Re-layout is needed if no lines calculated yet or has float siblings.
 */
const shouldLayoutText = (node: SafeNode): node is SafeTextNode =>
  isText(node) && (!node.lines || (node.floatSiblings?.length ?? 0) > 0);

/**
 * Generate exclude rects from float elements for textkit.
 * The rects are in coordinates relative to the text container.
 */
export const generateExcludeRects = (
  floats: FloatSibling[],
  textOffsetY: number = 0,
): Rect[] =>
  floats.map((float) => ({
    x: float.x,
    y: float.y - textOffsetY,
    width: float.width,
    height: float.height,
  }));

/**
 * Performs text layout on text node if wasn't calculated before.
 * Text layout is usually performed on Yoga's layout process (via setMeasureFunc),
 * but we need to layout those nodes with fixed width and height.
 *
 * @param node
 * @returns Layout node
 */
const resolveTextLayout = (node: SafeNode, fontStore: FontStore): SafeNode => {
  if (shouldLayoutText(node)) {
    const width = node.box.width - node.box.paddingRight - node.box.paddingLeft;
    const originalHeight =
      node.box.height - node.box.paddingTop - node.box.paddingBottom;
    const floatSiblings = node.floatSiblings || [];

    let excludeRects: Rect[];
    let height = originalHeight;

    if (floatSiblings.length > 0) {
      // Allow text to expand vertically when wrapping around floats
      height = Infinity;

      const textOffsetY = node.box.top + node.box.paddingTop;
      excludeRects = generateExcludeRects(floatSiblings, textOffsetY);
    }

    node.lines = layoutText(node, width, height, fontStore, excludeRects);
  }

  if (shouldIterate(node)) {
    if (!node.children) return node;

    const mapChild = (child: SafeNode) => resolveTextLayout(child, fontStore);

    const children = node.children.map(mapChild);

    return Object.assign({}, node, { children });
  }

  return node;
};

export default resolveTextLayout;
