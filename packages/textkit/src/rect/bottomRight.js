import maxX from './maxX';
import maxY from './maxY';

/**
 * Returns rect bottom right point
 *
 * @param {Object} rect rect
 * @returns {{ x:number, y:number }} bottom right point
 */
const bottomRight = rect => ({ x: maxX(rect), y: maxY(rect) });

export default bottomRight;
