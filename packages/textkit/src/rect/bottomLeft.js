import maxY from './maxY';

/**
 * @typedef {import('../types.js').Rect} Rect
 */

const ZERO = { x: 0, y: 0 };

/**
 * Returns rect bottom left point
 *
 * @param {Rect} [rect] rect
 * @returns {{ x: number, y: number }} bottom left point
 */
export default function bottomLeft(rect) {
  return rect ? { x: rect.x || 0, y: maxY(rect) } : ZERO;
}
