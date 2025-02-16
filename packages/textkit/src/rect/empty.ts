import { Rect } from '../types';

/**
 * Returns empty rect
 *
 * @returns Empty rect
 */
const empty = (): Rect => {
  return {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };
};

export default empty;
