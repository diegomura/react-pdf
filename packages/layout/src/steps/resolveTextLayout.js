/* eslint-disable no-param-reassign */
import * as R from 'ramda';
import * as P from '@react-pdf/primitives';

import layoutText from '../text/layoutText';

const isType = R.propEq('type');

const isSvg = isType(P.Svg);

const isText = isType(P.Text);

const isNotSvg = R.complement(isSvg);

const isNotText = R.complement(isText);

const shouldIterate = node => isNotSvg(node) && isNotText(node);

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

  if (shouldIterate(node)) {
    const mapChild = child => resolveTextLayout(child, fontStore);
    return R.evolve({
      children: R.map(mapChild),
    })(node);
  }

  return node;
};

export default resolveTextLayout;
