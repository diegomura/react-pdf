import * as R from 'ramda';

import matchPercent from '../utils/matchPercent';

const getTransformStyle = s => R.pathOr('50%', ['style', s]);

/**
 * Get node origin
 *
 * @param {Object} node
 * @returns {Object} node origin
 */
const getOrigin = node => {
  if (!node.box) return {};

  const { left, top, width, height } = node.box;
  const transformOriginX = getTransformStyle('transformOriginX')(node);
  const transformOriginY = getTransformStyle('transformOriginY')(node);

  const percentX = matchPercent(transformOriginX);
  const percentY = matchPercent(transformOriginY);

  const offsetX = percentX ? width * percentX.percent : transformOriginX;
  const offsetY = percentY ? height * percentY.percent : transformOriginY;

  return { left: left + offsetX, top: top + offsetY };
};

export default getOrigin;
