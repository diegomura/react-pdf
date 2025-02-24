import * as Yoga from 'yoga-layout/load';

import setYogaValue from './setYogaValue';
import { SafeNode } from '../types';

/**
 * Set position top attribute to node's Yoga instance
 *
 * @param position - Position top
 * @param node - Node instance
 * @returns Node instance
 */
export const setPositionTop = setYogaValue('position', Yoga.Edge.Top);

/**
 * Set position right attribute to node's Yoga instance
 *
 * @param position - Position right
 * @param node - Node instance
 * @returns Node instance
 */
export const setPositionRight = setYogaValue('position', Yoga.Edge.Right);

/**
 * Set position bottom attribute to node's Yoga instance
 *
 * @param position - Position bottom
 * @param node - Node instance
 * @returns Node instance
 */
export const setPositionBottom = setYogaValue('position', Yoga.Edge.Bottom);

/**
 * Set position left attribute to node's Yoga instance
 *
 * @param position - Position left
 * @param node - Node instance
 * @returns Node instance
 */
export const setPositionLeft = setYogaValue('position', Yoga.Edge.Left);

/**
 * Set all positions at once
 *
 * @param position - Position
 * @returns Node instance wrapper
 */
export const setPosition =
  (position?: number | string | null) => (node: SafeNode) => {
    setPositionTop(position)(node);
    setPositionRight(position)(node);
    setPositionBottom(position)(node);
    setPositionLeft(position)(node);

    return node;
  };

export default setPosition;
