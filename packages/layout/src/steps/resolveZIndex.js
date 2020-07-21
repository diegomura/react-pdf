import * as R from 'ramda';
import { Document, Svg } from '@react-pdf/primitives';

const getZIndex = R.path(['style', 'zIndex']);

const isType = R.propEq('type');

const shouldNotSort = R.anyPass([isType(Document), isType(Svg)]);

const sortZIndex = (a, b) => {
  const za = getZIndex(a);
  const zb = getZIndex(b);

  if (!za && !zb) return 0;
  if (!za) return 1;
  if (!zb) return -1;

  return zb - za;
};

/**
 * Sort children by zIndex value
 *
 * @param {Object} node
 * @returns {Object} node
 */
const resolveZIndex = node =>
  R.compose(
    R.evolve({ children: R.map(resolveZIndex) }),
    R.unless(shouldNotSort, R.evolve({ children: R.sort(sortZIndex) })),
  )(node);

export default resolveZIndex;
