import Yoga from 'yoga-layout';

import setYogaValue from './setYogaValue';

/**
 * Set border top attribute to node's Yoga instance
 *
 * @param {Number} border top width
 * @param {Object} node instance
 * @return {Object} node instance
 */
export const setBorderTop = setYogaValue('border', Yoga.EDGE_TOP);

/**
 * Set border right attribute to node's Yoga instance
 *
 * @param {Number} border right width
 * @param {Object} node instance
 * @return {Object} node instance
 */
export const setBorderRight = setYogaValue('border', Yoga.EDGE_RIGHT);

/**
 * Set border bottom attribute to node's Yoga instance
 *
 * @param {Number} border bottom width
 * @param {Object} node instance
 * @return {Object} node instance
 */
export const setBorderBottom = setYogaValue('border', Yoga.EDGE_BOTTOM);

/**
 * Set border left attribute to node's Yoga instance
 *
 * @param {Number} border left width
 * @param {Object} node instance
 * @return {Object} node instance
 */
export const setBorderLeft = setYogaValue('border', Yoga.EDGE_LEFT);
