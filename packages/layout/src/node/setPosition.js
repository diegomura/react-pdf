import Yoga from '../../yoga';

import setYogaValue from './setYogaValue';

/**
 * @typedef {Function} NodeInstanceWrapper
 * @param {Object} node node instance
 * @returns {Object} node instance
 */

/**
 * Set position top attribute to node's Yoga instance
 *
 * @param {number} position position top
 * @param {Object} node node instance
 * @returns {Object} node instance
 */
export const setPositionTop = setYogaValue('position', Yoga.EDGE_TOP);

/**
 * Set position right attribute to node's Yoga instance
 *
 * @param {number} position position right
 * @param {Object} node node instance
 * @returns {Object} node instance
 */
export const setPositionRight = setYogaValue('position', Yoga.EDGE_RIGHT);

/**
 * Set position bottom attribute to node's Yoga instance
 *
 * @param {number} position position bottom
 * @param {Object} node node instance
 * @returns {Object} node instance
 */
export const setPositionBottom = setYogaValue('position', Yoga.EDGE_BOTTOM);

/**
 * Set position left attribute to node's Yoga instance
 *
 * @param {number} position position left
 * @param {Object} node node instance
 * @returns {Object} node instance
 */
export const setPositionLeft = setYogaValue('position', Yoga.EDGE_LEFT);

/**
 * Set all positions at once
 *
 * @param {number | string} position position
 * @returns {NodeInstanceWrapper} node instance wrapper
 */
export const setPosition = position => node => {
  setPositionTop(position)(node);
  setPositionRight(position)(node);
  setPositionBottom(position)(node);
  setPositionLeft(position)(node);

  return node;
};

export default setPosition;
