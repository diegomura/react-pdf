import * as Yoga from 'yoga-layout/load';

import setYogaValue from './setYogaValue';
import { SafeNode } from '../types';

/**
 * Set padding top attribute to node's Yoga instance
 *
 * @param padding - Padding top
 * @param node - Node instance
 * @returns Node instance
 */
export const setPaddingTop = setYogaValue('padding', Yoga.Edge.Top);

/**
 * Set padding right attribute to node's Yoga instance
 *
 * @param padding - Padding right
 * @param node - Node instance
 * @returns Node instance
 */
export const setPaddingRight = setYogaValue('padding', Yoga.Edge.Right);

/**
 * Set padding bottom attribute to node's Yoga instance
 *
 * @param padding - Padding bottom
 * @param node Node instance
 * @returns Node instance
 */
export const setPaddingBottom = setYogaValue('padding', Yoga.Edge.Bottom);

/**
 * Set padding left attribute to node's Yoga instance
 *
 * @param padding - Padding left
 * @param node - Node instance
 * @returns Node instance
 */
export const setPaddingLeft = setYogaValue('padding', Yoga.Edge.Left);

/**
 * Set all paddings at once
 *
 * @param padding padding
 * @returns Node instance
 */
export const setPadding =
  (padding?: number | string | null) => (node: SafeNode) => {
    setPaddingTop(padding)(node);
    setPaddingRight(padding)(node);
    setPaddingBottom(padding)(node);
    setPaddingLeft(padding)(node);

    return node;
  };

export default setPadding;
