import * as Yoga from 'yoga-layout/load';

import setYogaValue from './setYogaValue';
import { SafeNode } from '../types';

/**
 * Set margin top attribute to node's Yoga instance
 *
 * @param margin - Margin top
 * @param node - Node instance
 * @returns Node instance
 */
export const setMarginTop = setYogaValue('margin', Yoga.Edge.Top);

/**
 * Set margin right attribute to node's Yoga instance
 *
 * @param margin - Margin right
 * @param node - Node instance
 * @returns Node instance
 */
export const setMarginRight = setYogaValue('margin', Yoga.Edge.Right);

/**
 * Set margin bottom attribute to node's Yoga instance
 *
 * @param margin - Margin bottom
 * @param node - Node instance
 * @returns Node instance
 */
export const setMarginBottom = setYogaValue('margin', Yoga.Edge.Bottom);

/**
 * Set margin left attribute to node's Yoga instance
 *
 * @param margin - Margin left
 * @param node - Node instance
 * @returns Node instance
 */
export const setMarginLeft = setYogaValue('margin', Yoga.Edge.Left);

/**
 * Set all margins at once
 *
 * @param margin - Margin
 * @returns Node instance wrapper
 */
export const setMargin =
  (margin?: number | string | null) => (node: SafeNode) => {
    setMarginTop(margin)(node);
    setMarginRight(margin)(node);
    setMarginBottom(margin)(node);
    setMarginLeft(margin)(node);

    return node;
  };

export default setMargin;
