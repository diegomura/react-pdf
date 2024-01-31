import maxX from './maxX';
import maxY from './maxY';

/**
 * @typedef {import('../types.js').Rect} Rect
 */

/**
 * Returns rect bottom right point
 *
 * @param {Rect} rect rect
 * @returns {{ x:number, y:number }} bottom right point
 */
const bottomRight = (rect) => ({ x: maxX(rect), y: maxY(rect) });

export default bottomRight;
