import setYogaValue from './setYogaValue';

/**
 * Set width to node's Yoga instance
 *
 * @param {Number} width
 * @param {Object} node instance
 * @return {Object} node instance
 */
export const setWidth = setYogaValue('width');

/**
 * Set min width to node's Yoga instance
 *
 * @param {Number} min width
 * @param {Object} node instance
 * @return {Object} node instance
 */
export const setMinWidth = setYogaValue('minWidth');

/**
 * Set max width to node's Yoga instance
 *
 * @param {Number} max width
 * @param {Object} node instance
 * @return {Object} node instance
 */
export const setMaxWidth = setYogaValue('maxWidth');

/**
 * Set height to node's Yoga instance
 *
 * @param {Number} height
 * @param {Object} node instance
 * @return {Object} node instance
 */
export const setHeight = setYogaValue('height');

/**
 * Set min height to node's Yoga instance
 *
 * @param {Number} min height
 * @param {Object} node instance
 * @return {Object} node instance
 */
export const setMinHeight = setYogaValue('minHeight');

/**
 * Set max height to node's Yoga instance
 *
 * @param {Number} max height
 * @param {Object} node instance
 * @return {Object} node instance
 */
export const setMaxHeight = setYogaValue('maxHeight');
