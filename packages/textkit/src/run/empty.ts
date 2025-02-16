import { Run } from '../types';

/**
 * Returns empty run
 *
 * @returns Empty run
 */
const empty = (): Run => {
  return {
    start: 0,
    end: 0,
    glyphIndices: [],
    glyphs: [],
    positions: [],
    attributes: {},
  };
};

export default empty;
