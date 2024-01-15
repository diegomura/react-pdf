import yogaModule from 'yoga-layout/sync';

import setYogaValue from './setYogaValue';

// yoga-layout sets default export using non-standard __esModule property, so we need to
// make an additional check in case it's used in a bundler that does not support it.
const Yoga = 'default' in yogaModule ? yogaModule.default : yogaModule;

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

/**
 * Set all border widths at once
 *
 * @param {Number} border width
 * @param {Object} node instance
 * @return {Object} node instance
 */
export const setBorder = width => node => {
  setBorderTop(width)(node);
  setBorderRight(width)(node);
  setBorderBottom(width)(node);
  setBorderLeft(width)(node);

  return node;
};

export default setBorder;
