import setYogaValue from './setYogaValue';

/**
 * Set width to node's Yoga instance
 *
 * @param {number} width
 * @param {Object} node instance
 * @returns {Object} node instance
 */
export const setWidth = setYogaValue('width');

/**
 * Set min width to node's Yoga instance
 *
 * @param {number} min width
 * @param {Object} node instance
 * @returns {Object} node instance
 */
export const setMinWidth = setYogaValue('minWidth');

/**
 * Set max width to node's Yoga instance
 *
 * @param {number} max width
 * @param {Object} node instance
 * @returns {Object} node instance
 */
export const setMaxWidth = setYogaValue('maxWidth');

/**
 * Set height to node's Yoga instance
 *
 * @param {number} height
 * @param {Object} node instance
 * @returns {Object} node instance
 */
export const setHeight = setYogaValue('height');

/**
 * Set min height to node's Yoga instance
 *
 * @param {number} min height
 * @param {Object} node instance
 * @returns {Object} node instance
 */
export const setMinHeight = setYogaValue('minHeight');

/**
 * Set max height to node's Yoga instance
 *
 * @param {number} max height
 * @param {Object} node instance
 * @returns {Object} node instance
 */
export const setMaxHeight = setYogaValue('maxHeight');
