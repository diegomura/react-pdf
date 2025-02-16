import { Glyph } from '../types';

const DUMMY_CODEPOINT = 123;

/**
 * Resolve string indices based on glyphs code points
 *
 * @param glyphs
 * @returns Glyph indices
 */
const resolve = (glyphs: (Glyph | undefined)[] = []) => {
  return glyphs.reduce((acc, glyph) => {
    const codePoints = glyph?.codePoints || [DUMMY_CODEPOINT];

    if (acc.length === 0) return codePoints.map(() => 0);

    const last = acc[acc.length - 1];
    const next = codePoints.map(() => last + 1);

    return [...acc, ...next];
  }, []);
};

export default resolve;
