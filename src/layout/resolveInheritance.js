import * as R from 'ramda';

import isSvg from '../node/isSvg';
import { INHERITED_PROPERTIES } from '../constants';

/**
 * Get styles sub group of inherited properties
 *
 * @param {Object} style object
 * @returns {Object} style object only with inherited properties
 */
const getInheritStyles = R.compose(
  R.pick(INHERITED_PROPERTIES),
  R.propOr({}, 'style'),
);

/**
 * Merges styles with node
 *
 * @param {Object} style object
 * @param {Object} node
 * @returns {Object} node with styles merged
 */
const mergeStyles = styles =>
  R.evolve({
    style: R.merge(styles),
  });

/**
 * Inherit style values from the root to the leafs
 *
 * @param {Object} document root
 * @returns {Object} document root with inheritance
 *
 */
const resolveInheritance = node => {
  if (isSvg(node)) return node;

  const inheritStyles = getInheritStyles(node);

  return R.evolve({
    children: R.map(
      R.compose(
        resolveInheritance,
        mergeStyles(inheritStyles),
      ),
    ),
  })(node);
};

export default resolveInheritance;
