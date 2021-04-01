import Yoga from '@react-pdf/yoga';

import setYogaValue from './setYogaValue';

/**
 * Set margin top attribute to node's Yoga instance
 *
 * @param {Number} margin top
 * @param {Object} node instance
 * @return {Object} node instance
 */
export const setMarginTop = setYogaValue('margin', Yoga.EDGE_TOP);

/**
 * Set margin right attribute to node's Yoga instance
 *
 * @param {Number} margin right
 * @param {Object} node instance
 * @return {Object} node instance
 */
export const setMarginRight = setYogaValue('margin', Yoga.EDGE_RIGHT);

/**
 * Set margin bottom attribute to node's Yoga instance
 *
 * @param {Number} margin bottom
 * @param {Object} node instance
 * @return {Object} node instance
 */
export const setMarginBottom = setYogaValue('margin', Yoga.EDGE_BOTTOM);

/**
 * Set margin left attribute to node's Yoga instance
 *
 * @param {Number} margin left
 * @param {Object} node instance
 * @return {Object} node instance
 */
export const setMarginLeft = setYogaValue('margin', Yoga.EDGE_LEFT);

/**
 * Set all margins at once
 *
 * @param {Number} margin
 * @param {Object} node instance
 * @return {Object} node instance
 */
export const setMargin = margin => node => {
  setMarginTop(margin)(node);
  setMarginRight(margin)(node);
  setMarginBottom(margin)(node);
  setMarginLeft(margin)(node);

  return node;
};

export default setMargin;
