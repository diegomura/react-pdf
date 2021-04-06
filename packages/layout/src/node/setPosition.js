import Yoga from '@react-pdf/yoga';

import setYogaValue from './setYogaValue';

/**
 * Set position top attribute to node's Yoga instance
 *
 * @param {Number} position top
 * @param {Object} node instance
 * @return {Object} node instance
 */
export const setPositionTop = setYogaValue('position', Yoga.EDGE_TOP);

/**
 * Set position right attribute to node's Yoga instance
 *
 * @param {Number} position right
 * @param {Object} node instance
 * @return {Object} node instance
 */
export const setPositionRight = setYogaValue('position', Yoga.EDGE_RIGHT);

/**
 * Set position bottom attribute to node's Yoga instance
 *
 * @param {Number} position bottom
 * @param {Object} node instance
 * @return {Object} node instance
 */
export const setPositionBottom = setYogaValue('position', Yoga.EDGE_BOTTOM);

/**
 * Set position left attribute to node's Yoga instance
 *
 * @param {Number} position left
 * @param {Object} node instance
 * @return {Object} node instance
 */
export const setPositionLeft = setYogaValue('position', Yoga.EDGE_LEFT);

/**
 * Set all positions at once
 *
 * @param {Number} position
 * @param {Object} node instance
 * @return {Object} node instance
 */
export const setPosition = position => node => {
  setPositionTop(position)(node);
  setPositionRight(position)(node);
  setPositionBottom(position)(node);
  setPositionLeft(position)(node);

  return node;
};

export default setPosition;
