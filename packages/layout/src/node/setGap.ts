import * as Yoga from 'yoga-layout/load';

import setYogaValue from './setYogaValue';

/**
 * Set rowGap value to node's Yoga instance
 *
 * @param value - Gap value
 * @returns Node instance wrapper
 */
export const setRowGap = setYogaValue('gap', Yoga.Gutter.Row);

/**
 * Set columnGap value to node's Yoga instance
 *
 * @param value - Gap value
 * @returns Node instance wrapper
 */
export const setColumnGap = setYogaValue('gap', Yoga.Gutter.Column);
