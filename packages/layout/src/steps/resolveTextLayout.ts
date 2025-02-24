import * as P from '@react-pdf/primitives';
import FontStore from '@react-pdf/font';

import layoutText from '../text/layoutText';
import { SafeNode, SafeSvgNode, SafeTextNode } from '../types';

const isSvg = (node: SafeNode): node is SafeSvgNode => node.type === P.Svg;

const isText = (node: SafeNode): node is SafeTextNode => node.type === P.Text;

const shouldIterate = (node: SafeNode) => !isSvg(node) && !isText(node);

const shouldLayoutText = (node: SafeNode): node is SafeTextNode =>
  isText(node) && !node.lines;

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
    const width =
      node.box.width - (node.box.paddingRight + node.box.paddingLeft);
    const height =
      node.box.height - (node.box.paddingTop + node.box.paddingBottom);

    node.lines = layoutText(node, width, height, fontStore);
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
