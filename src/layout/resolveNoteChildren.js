import * as R from 'ramda';

import isNote from '../node/isNote';
import isTextInstance from '../node/isTextInstance';

/**
 * Get node underlying text value
 *
 * @param {Object} node
 * @returns {String} node text content
 */
const getNodeText = node =>
  R.cond([
    [R.is(String), R.identity],
    [isTextInstance, R.prop('value')],
    [
      R.T,
      R.compose(
        getNodesText,
        R.propOr([], 'children'),
      ),
    ],
  ])(node);

/**
 * Get underlying text value of several nodes
 *
 * @param {Array} nodes
 * @returns {String} nodes text content
 */
const getNodesText = R.compose(
  R.join(''),
  R.map(getNodeText),
);

/**
 * Transforms string to text instance
 *
 * @param {String} value
 * @returns {Array} text intance
 */
const wrapTextInstance = value => [{ type: 'TEXT_INSTANCE', value }];

/**
 * Cast Note children as a text instance
 *
 * @param {Object} node
 * @returns {Object} node with resolved note children
 */
const resolveNoteChildren = node =>
  R.ifElse(
    isNote,
    R.evolve({
      children: R.compose(
        wrapTextInstance,
        getNodesText,
      ),
    }),
    R.evolve({ children: R.map(resolveNoteChildren) }),
  )(node);

export default resolveNoteChildren;
