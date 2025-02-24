import setYogaValue from './setYogaValue';

/**
 * Set width to node's Yoga instance
 *
 * @param width - Width
 * @param node - Node instance
 * @returns Node instance
 */
export const setWidth = setYogaValue('width');

/**
 * Set min width to node's Yoga instance
 *
 * @param min - Width
 * @param node - Node instance
 * @returns Node instance
 */
export const setMinWidth = setYogaValue('minWidth');

/**
 * Set max width to node's Yoga instance
 *
 * @param max - Width
 * @param node - Node instance
 * @returns Node instance
 */
export const setMaxWidth = setYogaValue('maxWidth');

/**
 * Set height to node's Yoga instance
 *
 * @param height - Height
 * @param node - Node instance
 * @returns Node instance
 */
export const setHeight = setYogaValue('height');

/**
 * Set min height to node's Yoga instance
 *
 * @param min - Height
 * @param node - Node instance
 * @returns Node instance
 */
export const setMinHeight = setYogaValue('minHeight');

/**
 * Set max height to node's Yoga instance
 *
 * @param max - Height
 * @param node - Node instance
 * @returns Node instance
 */
export const setMaxHeight = setYogaValue('maxHeight');
