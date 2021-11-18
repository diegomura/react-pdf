import * as R from 'ramda';

import matchPercent from '../utils/matchPercent';

/**
 *
 * @param {Object} container width and height
 * @param {String | Number} value border radius value
 * @returns {Number} fixed border radius value
 */
const resolveRadius = container => value => {
  const match = matchPercent(value);
  return match
    ? match.percent * Math.min(container.width, container.height)
    : Math.max(
        container.borderTopWidth,
        container.borderBottomWidth,
        container.borderLeftWidth,
        container.borderRightWidth,
        value,
      );
};

/**
 * Transforms percent border radius into fixed values
 *
 * @param {Object} node
 * @returns {Object} node
 */
const resolvePercentRadius = node =>
  R.evolve({
    children: R.map(resolvePercentRadius),
    style: R.evolve({
      borderTopLeftRadius: resolveRadius(node.box),
      borderTopRightRadius: resolveRadius(node.box),
      borderBottomRightRadius: resolveRadius(node.box),
      borderBottomLeftRadius: resolveRadius(node.box),
    }),
  })(node);

export default resolvePercentRadius;
