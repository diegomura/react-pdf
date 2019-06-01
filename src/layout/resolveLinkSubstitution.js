import * as R from 'ramda';

import { TEXT } from '../constants';
import isLink from '../node/isLink';
import isTextInstance from '../node/isTextInstance';

/**
 * Checks if node has render prop
 *
 * @param {Object} node
 * @returns {Boolean} has render prop?
 */
const hasRenderProp = R.hasPath(['props', 'render']);

/**
 * Checks if all children of node are text instances
 *
 * @param {Object} node
 * @returns {Boolean} are all children text instances?
 */
const hasTextInstanceChilds = R.compose(
  R.all(isTextInstance),
  R.propOr([], 'children'),
);

/**
 * If the Link has a strign child or render prop, substitute the instance by a Text,
 * that will ultimately render the inline Link via the textkit PDF renderer.
 *
 * @param {Object} node
 * @returns {Object} node with link substitution
 */
const resolveLinkSubstitution = node =>
  R.evolve({
    children: R.map(
      R.ifElse(
        R.both(isLink, R.either(hasRenderProp, hasTextInstanceChilds)),
        R.assoc('type', TEXT),
        resolveLinkSubstitution,
      ),
    ),
  })(node);

export default resolveLinkSubstitution;
