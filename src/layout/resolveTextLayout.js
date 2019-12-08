import * as R from 'ramda';

import isSvg from '../node/isSvg';
import isText from '../node/isText';
import layoutText from '../text/layoutText';

const isNotSvg = R.complement(isSvg);

const shouldLayoutText = node => isText(node) && R.isEmpty(node.lines);

/**
 * Performs text layout on text node if wasn't calculated before.
 * Text layout is usually performed on Yoga's layout process (via setMeasureFunc),
 * but we need to layout those nodes with fixed width and height.
 *
 * @param {Object} node
 * @returns {Object} layouted node
 */
const resolveTextLayout = node =>
  R.compose(
    R.evolve({
      children: R.map(R.when(isNotSvg, resolveTextLayout)),
    }),
    R.when(
      shouldLayoutText,
      R.compose(
        R.converge(R.assoc('lines'), [
          R.converge(layoutText, [
            R.identity,
            R.path(['box', 'width']),
            R.path(['box', 'height']),
          ]),
          R.identity,
        ]),
      ),
    ),
  )(node);

export default resolveTextLayout;
