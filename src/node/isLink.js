import * as R from 'ramda';

import { LINK, TEXT } from '../constants';

/**
 * Checks if node has valid source prop
 *
 * @param {Object} node
 * @returns {Boolean} does node have source prop?
 */
const hasSource = R.either(
  R.hasPath(['props', 'src']),
  R.hasPath(['props', 'href']),
);

/**
 * Checks if node is link
 *
 * @param {Object} node
 * @returns {Boolean} is node link?
 */
const isLink = R.either(
  R.propEq('type', LINK),
  R.both(R.propEq('type', TEXT), hasSource),
);

export default isLink;
