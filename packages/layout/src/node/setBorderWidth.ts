import * as Yoga from 'yoga-layout/load';

import setYogaValue from './setYogaValue';
import { SafeNode } from '../types';

/**
 * Set border top attribute to node's Yoga instance
 *
 * @param border - Border top width
 * @param node - Node instance
 * @returns Node instance
 */
export const setBorderTop = setYogaValue('border', Yoga.Edge.Top);

/**
 * Set border right attribute to node's Yoga instance
 *
 * @param border - Border right width
 * @param node - Node instance
 * @returns Node instance
 */
export const setBorderRight = setYogaValue('border', Yoga.Edge.Right);

/**
 * Set border bottom attribute to node's Yoga instance
 *
 * @param border - Border bottom width
 * @param node - Node instance
 * @returns Node instance
 */
export const setBorderBottom = setYogaValue('border', Yoga.Edge.Bottom);

/**
 * Set border left attribute to node's Yoga instance
 *
 * @param border - Border left width
 * @param node - Node instance
 * @returns Node instance
 */
export const setBorderLeft = setYogaValue('border', Yoga.Edge.Left);

/**
 * Set all border widths at once
 *
 * @param width - Border width
 * @returns Node instance wrapper
 */
export const setBorder = (width?: number | null) => (node: SafeNode) => {
  setBorderTop(width)(node);
  setBorderRight(width)(node);
  setBorderBottom(width)(node);
  setBorderLeft(width)(node);

  return node;
};

export default setBorder;
