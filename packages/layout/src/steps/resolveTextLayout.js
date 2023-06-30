import * as P from '@nutshelllabs/primitives';

import layoutText from '../text/layoutText';

const isType = type => node => node.type === type;

const isSvg = isType(P.Svg);

const isText = isType(P.Text);

const shouldIterate = node => !isSvg(node) && !isText(node);

const shouldLayoutText = node => isText(node) && !node.lines;

/**
 * Performs text layout on text node if wasn't calculated before.
 * Text layout is usually performed on Yoga's layout process (via setMeasureFunc),
 * but we need to layout those nodes with fixed width and height.
 *
 * @param {Object} node
 * @returns {Object} layout node
 */
const resolveTextLayout = (node, fontStore) => {
  if (shouldLayoutText(node)) {
    const width =
      node.box.width - (node.box.paddingRight + node.box.paddingLeft);
    const height =
      node.box.height - (node.box.paddingTop + node.box.paddingBottom);

    node.lines = layoutText(node, width, height, fontStore);
  }

  if (shouldIterate(node) && node.children) {
    node.children.forEach(child => resolveTextLayout(child, fontStore));
  }

  return node;
};

export default resolveTextLayout;
