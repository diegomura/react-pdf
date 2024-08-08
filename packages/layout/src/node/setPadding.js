import * as Yoga from 'yoga-layout';

import setYogaValue from './setYogaValue';

/**
 * @typedef {Function} NodeInstanceWrapper
 * @param {Object} node node instance
 * @returns {Object} node instance
 */

/**
 * Set padding top attribute to node's Yoga instance
 *
 * @param {number} padding padding top
 * @param {Object} node node instance
 * @returns {Object} node instance
 */
export const setPaddingTop = setYogaValue('padding', Yoga.Edge.Top);

/**
 * Set padding right attribute to node's Yoga instance
 *
 * @param {number} padding padding right
 * @param {Object} node node instance
 * @returns {Object} node instance
 */
export const setPaddingRight = setYogaValue('padding', Yoga.Edge.Right);

/**
 * Set padding bottom attribute to node's Yoga instance
 *
 * @param {number} padding padding bottom
 * @param {Object} node node instance
 * @returns {Object} node instance
 */
export const setPaddingBottom = setYogaValue('padding', Yoga.Edge.Bottom);

/**
 * Set padding left attribute to node's Yoga instance
 *
 * @param {number} padding padding left
 * @param {Object} node node instance
 * @returns {Object} node instance
 */
export const setPaddingLeft = setYogaValue('padding', Yoga.Edge.Left);

/**
 * Set all paddings at once
 *
 * @param {number | string} padding padding
 * @returns {NodeInstanceWrapper} node instance wrapper
 */
export const setPadding = (padding) => (node) => {
  setPaddingTop(padding)(node);
  setPaddingRight(padding)(node);
  setPaddingBottom(padding)(node);
  setPaddingLeft(padding)(node);

  return node;
};

export default setPadding;
