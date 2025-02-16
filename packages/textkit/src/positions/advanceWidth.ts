import { Position } from '../types';

/**
 * Return positions advance width
 *
 * @param positions - Positions
 * @returns {number} advance width
 */
const advanceWidth = (positions: Position[]) => {
  return positions.reduce((acc, pos) => acc + (pos.xAdvance || 0), 0);
};

export default advanceWidth;
