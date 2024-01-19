import * as Yoga from 'yoga-layout';

import setYogaValue from './setYogaValue';

/**
 * @typedef {Function} NodeInstanceWrapper
 * @param {Object} node node instance
 * @returns {Object} node instance
 */

/**
 * Set border top attribute to node's Yoga instance
 *
 * @param {number} border border top width
 * @param {Object} node node instance
 * @returns {Object} node instance
 */
export const setBorderTop = setYogaValue('border', Yoga.Edge.Top);

/**
 * Set border right attribute to node's Yoga instance
 *
 * @param {number} border border right width
 * @param {Object} node node instance
 * @returns {Object} node instance
 */
export const setBorderRight = setYogaValue('border', Yoga.Edge.Right);

/**
 * Set border bottom attribute to node's Yoga instance
 *
 * @param {number} border border bottom width
 * @param {Object} node node instance
 * @returns {Object} node instance
 */
export const setBorderBottom = setYogaValue('border', Yoga.Edge.Bottom);

/**
 * Set border left attribute to node's Yoga instance
 *
 * @param {number} border border left width
 * @param {Object} node node instance
 * @returns {Object} node instance
 */
export const setBorderLeft = setYogaValue('border', Yoga.Edge.Left);

/**
 * Set all border widths at once
 *
 * @param {number | string} width border width
 * @returns {NodeInstanceWrapper} node instance wrapper
 */
export const setBorder = width => node => {
  setBorderTop(width)(node);
  setBorderRight(width)(node);
  setBorderBottom(width)(node);
  setBorderLeft(width)(node);

  return node;
};

export default setBorder;
