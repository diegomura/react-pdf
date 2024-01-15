import yogaModule from 'yoga-layout/sync';

import setYogaValue from './setYogaValue';

// yoga-layout sets default export using non-standard __esModule property, so we need to
// make an additional check in case it's used in a bundler that does not support it.
const Yoga = 'default' in yogaModule ? yogaModule.default : yogaModule;

/**
 * Set padding top attribute to node's Yoga instance
 *
 * @param {Number} padding top
 * @param {Object} node instance
 * @return {Object} node instance
 */
export const setPaddingTop = setYogaValue('padding', Yoga.EDGE_TOP);

/**
 * Set padding right attribute to node's Yoga instance
 *
 * @param {Number} padding right
 * @param {Object} node instance
 * @return {Object} node instance
 */
export const setPaddingRight = setYogaValue('padding', Yoga.EDGE_RIGHT);

/**
 * Set padding bottom attribute to node's Yoga instance
 *
 * @param {Number} padding bottom
 * @param {Object} node instance
 * @return {Object} node instance
 */
export const setPaddingBottom = setYogaValue('padding', Yoga.EDGE_BOTTOM);

/**
 * Set padding left attribute to node's Yoga instance
 *
 * @param {Number} padding left
 * @param {Object} node instance
 * @return {Object} node instance
 */
export const setPaddingLeft = setYogaValue('padding', Yoga.EDGE_LEFT);

/**
 * Set all paddings at once
 *
 * @param {Number} margin
 * @param {Object} node instance
 * @return {Object} node instance
 */
export const setPadding = padding => node => {
  setPaddingTop(padding)(node);
  setPaddingRight(padding)(node);
  setPaddingBottom(padding)(node);
  setPaddingLeft(padding)(node);

  return node;
};

export default setPadding;
