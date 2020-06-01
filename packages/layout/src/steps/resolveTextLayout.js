import * as R from 'ramda';
import * as P from '@react-pdf/primitives';

import layoutText from '../text/layoutText';

const isType = R.propEq('type');

const isSvg = isType(P.Svg);

const isText = isType(P.Text)

const isNotSvg = R.complement(isSvg);

const hasLines = node =>
  node.props.fixed ? !R.isEmpty(node.lines) : !!node.lines;

const shouldLayoutText = node => isText(node) && !hasLines(node);

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
