import * as Yoga from 'yoga-layout';

import setYogaValue from './setYogaValue';

/**
 * @typedef {Function} NodeInstanceWrapper
 * @param {Object} node node instance
 * @returns {Object} node instance
 */

/**
 * Set margin top attribute to node's Yoga instance
 *
 * @param {number} margin margin top
 * @param {Object} node node instance
 * @returns {Object} node instance
 */
export const setMarginTop = setYogaValue('margin', Yoga.Edge.Top);

/**
 * Set margin right attribute to node's Yoga instance
 *
 * @param {number} margin margin right
 * @param {Object} node node instance
 * @returns {Object} node instance
 */
export const setMarginRight = setYogaValue('margin', Yoga.Edge.Right);

/**
 * Set margin bottom attribute to node's Yoga instance
 *
 * @param {number} margin margin bottom
 * @param {Object} node node instance
 * @returns {Object} node instance
 */
export const setMarginBottom = setYogaValue('margin', Yoga.Edge.Bottom);

/**
 * Set margin left attribute to node's Yoga instance
 *
 * @param {number} margin margin left
 * @param {Object} node node instance
 * @returns {Object} node instance
 */
export const setMarginLeft = setYogaValue('margin', Yoga.Edge.Left);

/**
 * Set all margins at once
 *
 * @param {number | string} margin margin
 * @returns {NodeInstanceWrapper} node instance wrapper
 */
export const setMargin = margin => node => {
  setMarginTop(margin)(node);
  setMarginRight(margin)(node);
  setMarginBottom(margin)(node);
  setMarginLeft(margin)(node);

  return node;
};

export default setMargin;
