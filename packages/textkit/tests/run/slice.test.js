import { describe, expect, test } from 'vitest';

import font from '../internal/font';
import pluck from '../internal/pluck';
import slice from '../../src/run/slice';

describe('run slice operator', () => {
  describe('slice start and end', () => {
    test('should slice containing range', () => {
      const attributes = { something: 'blah' };
      const run = { start: 0, end: 10, attributes };
      const sliced = slice(2, 5, run);

      expect(sliced).toHaveProperty('start', 2);
      expect(sliced).toHaveProperty('end', 5);
      expect(sliced).toHaveProperty('attributes', attributes);
    });

    test('should slice exact range', () => {
      const attributes = { something: 'blah' };
      const run = { start: 0, end: 10, attributes };
      const sliced = slice(0, 10, run);

      expect(sliced).toHaveProperty('start', 0);
      expect(sliced).toHaveProperty('end', 10);
      expect(sliced).toHaveProperty('attributes', attributes);
    });

    test('should slice exceeding range', () => {
      const attributes = { something: 'blah' };
      const run = { start: 0, end: 10, attributes };
      const sliced = slice(2, 20, run);

      expect(sliced).toHaveProperty('start', 2);
      expect(sliced).toHaveProperty('end', 10);
      expect(sliced).toHaveProperty('attributes', attributes);
    });

    test('should slice containing range when start not zero', () => {
      const attributes = { something: 'blah' };
      const run = { start: 5, end: 15, attributes };
      const sliced = slice(2, 5, run);

      expect(sliced).toHaveProperty('start', 7);
      expect(sliced).toHaveProperty('end', 10);
      expect(sliced).toHaveProperty('attributes', attributes);
    });

    test('should slice exact range when start not zero', () => {
      const attributes = { something: 'blah' };
      const run = { start: 5, end: 15, attributes };
      const sliced = slice(0, 10, run);

      expect(sliced).toHaveProperty('start', 5);
      expect(sliced).toHaveProperty('end', 15);
      expect(sliced).toHaveProperty('attributes', attributes);
    });

    test('should slice exceeding range when start not zero', () => {
      const attributes = { something: 'blah' };
      const run = { start: 5, end: 15, attributes };
      const sliced = slice(8, 13, run);

      expect(sliced).toHaveProperty('start', 13);
      expect(sliced).toHaveProperty('end', 15);
      expect(sliced).toHaveProperty('attributes', attributes);
    });
  });

  describe('slice glyphs', () => {
    test('should exact slice return same glyphs', () => {
      const run = {
        start: 0,
        end: 5,
        glyphs: [
          { id: 76, codePoints: [76] }, // l
          { id: 111, codePoints: [111] }, // o
          { id: 114, codePoints: [114] }, // r
          { id: 101, codePoints: [101] }, // e
          { id: 109, codePoints: [109] }, // m
        ],
      };
      const sliced = slice(0, 5, run);

      expect(sliced).toHaveProperty('start', 0);
      expect(sliced).toHaveProperty('end', 5);
      expect(pluck('id', sliced.glyphs)).toEqual([76, 111, 114, 101, 109]);
    });

    test('should exact slice with ligature return same glyphs', () => {
      const run = {
        start: 0,
        end: 5,
        glyphs: [
          { id: 76, codePoints: [76] }, // l
          { id: 111, codePoints: [111] }, // o
          { id: 64257, codePoints: [102, 105] }, // fi
          { id: 109, codePoints: [109] }, // m
        ],
      };
      const sliced = slice(0, 5, run);

      expect(sliced).toHaveProperty('start', 0);
      expect(sliced).toHaveProperty('end', 5);
      expect(sliced.glyphs).toHaveLength(4);
      expect(pluck('id', sliced.glyphs)).toEqual([76, 111, 64257, 109]);
    });

    test('should correctly slice glyphs', () => {
      const run = {
        start: 0,
        end: 5,
        glyphs: [
          { id: 76, codePoints: [76] }, // l
          { id: 111, codePoints: [111] }, // o
          { id: 114, codePoints: [114] }, // r
          { id: 101, codePoints: [101] }, // e
          { id: 109, codePoints: [109] }, // m
        ],
      };
      const sliced = slice(2, 4, run);

      expect(pluck('id', sliced.glyphs)).toEqual([114, 101]);
    });

    test('should correctly slice glyphs containing ligature', () => {
      const run = {
        start: 0,
        end: 5,
        glyphs: [
          { id: 76, codePoints: [76] }, // l
          { id: 111, codePoints: [111] }, // o
          { id: 64257, codePoints: [102, 105] }, // fi
          { id: 109, codePoints: [109] }, // m
        ],
        glyphIndices: [0, 1, 2, 2, 3],
      };
      const sliced = slice(1, 5, run);

      expect(sliced).toHaveProperty('start', 1);
      expect(sliced).toHaveProperty('end', 5);
      expect(sliced.glyphs).toHaveLength(3);
      expect(pluck('id', sliced.glyphs)).toEqual([111, 64257, 109]);
    });

    test('should correctly slice glyphs containing ligature at start', () => {
      const run = {
        start: 0,
        end: 5,
        glyphs: [
          { id: 64257, codePoints: [102, 105] }, // fi
          { id: 76, codePoints: [76] }, // l
          { id: 111, codePoints: [111] }, // o
          { id: 109, codePoints: [109] }, // m
        ],
        glyphIndices: [0, 0, 1, 2, 3],
        attributes: { font },
      };
      const sliced = slice(1, 5, run);

      expect(sliced).toHaveProperty('start', 1);
      expect(sliced).toHaveProperty('end', 5);
      expect(sliced.glyphs).toHaveLength(4);
      expect(pluck('id', sliced.glyphs)).toEqual([105, 76, 111, 109]);
    });

    test('should correctly slice glyphs starting in ligature', () => {
      const run = {
        start: 0,
        end: 5,
        glyphs: [
          { id: 76, codePoints: [76] }, // l
          { id: 111, codePoints: [111] }, // o
          { id: 64257, codePoints: [102, 105] }, // fi
          { id: 109, codePoints: [109] }, // m
        ],
        glyphIndices: [0, 1, 2, 2, 3],
      };
      const sliced = slice(2, 5, run);

      expect(sliced).toHaveProperty('start', 2);
      expect(sliced).toHaveProperty('end', 5);
      expect(sliced.glyphs).toHaveLength(2);
      expect(pluck('id', sliced.glyphs)).toEqual([64257, 109]);
    });

    test('should correctly slice glyphs ending in ligature', () => {
      const run = {
        start: 0,
        end: 5,
        glyphs: [
          { id: 76, codePoints: [76] }, // l
          { id: 111, codePoints: [111] }, // o
          { id: 64257, codePoints: [102, 105] }, // fi
          { id: 109, codePoints: [109] }, // m
        ],
        glyphIndices: [0, 1, 2, 2, 3],
      };
      const sliced = slice(1, 4, run);

      expect(sliced).toHaveProperty('start', 1);
      expect(sliced).toHaveProperty('end', 4);
      expect(sliced.glyphs).toHaveLength(2);
      expect(pluck('id', sliced.glyphs)).toEqual([111, 64257]);
    });

    test('should correctly slice glyphs breaking ligature at start', () => {
      const run = {
        start: 0,
        end: 5,
        glyphs: [
          { id: 76, codePoints: [76] }, // l
          { id: 111, codePoints: [111] }, // o
          { id: 64257, codePoints: [102, 105] }, // fi
          { id: 109, codePoints: [109] }, // m
        ],
        glyphIndices: [0, 1, 2, 2, 3],
        attributes: { font },
      };
      const sliced = slice(3, 5, run);

      expect(sliced).toHaveProperty('start', 3);
      expect(sliced).toHaveProperty('end', 5);
      expect(sliced.glyphs).toHaveLength(2);
      expect(pluck('id', sliced.glyphs)).toEqual([105, 109]);
    });

    test('should correctly slice glyphs breaking ligature at end', () => {
      const run = {
        start: 0,
        end: 5,
        glyphs: [
          { id: 76, codePoints: [76] }, // l
          { id: 111, codePoints: [111] }, // o
          { id: 64257, codePoints: [102, 105] }, // fi
          { id: 109, codePoints: [109] }, // m
        ],
        glyphIndices: [0, 1, 2, 2, 3],
        attributes: { font },
      };
      const sliced = slice(1, 3, run);

      expect(sliced).toHaveProperty('start', 1);
      expect(sliced).toHaveProperty('end', 3);
      expect(sliced.glyphs).toHaveLength(2);
      expect(pluck('id', sliced.glyphs)).toEqual([111, 102]);
    });

    test('should correctly slice glyphs starting in long ligature', () => {
      const run = {
        start: 0,
        end: 5,
        glyphs: [
          { id: 76, codePoints: [76] }, // l
          { id: 64259, codePoints: [102, 102, 105] }, // ffi
          { id: 109, codePoints: [109] }, // m
        ],
        glyphIndices: [0, 1, 1, 1, 2],
        attributes: { font },
      };
      const sliced = slice(1, 5, run);

      expect(sliced).toHaveProperty('start', 1);
      expect(sliced).toHaveProperty('end', 5);
      expect(sliced.glyphs).toHaveLength(2);
      expect(pluck('id', sliced.glyphs)).toEqual([64259, 109]);
    });

    test('should correctly slice glyphs ending in long ligature', () => {
      const run = {
        start: 0,
        end: 5,
        glyphs: [
          { id: 76, codePoints: [76] }, // l
          { id: 64259, codePoints: [102, 102, 105] }, // ffi
          { id: 109, codePoints: [109] }, // m
        ],
        glyphIndices: [0, 1, 1, 1, 2],
        attributes: { font },
      };
      const sliced = slice(0, 4, run);

      expect(sliced).toHaveProperty('start', 0);
      expect(sliced).toHaveProperty('end', 4);
      expect(sliced.glyphs).toHaveLength(2);
      expect(pluck('id', sliced.glyphs)).toEqual([76, 64259]);
    });

    test('should correctly slice glyphs breaking long ligature at 1st char at start', () => {
      const run = {
        start: 0,
        end: 5,
        glyphs: [
          { id: 76, codePoints: [76] }, // l
          { id: 64259, codePoints: [102, 102, 105] }, // ffi
          { id: 109, codePoints: [109] }, // m
        ],
        glyphIndices: [0, 1, 1, 1, 2],
        attributes: { font },
      };
      const sliced = slice(2, 5, run);

      expect(sliced).toHaveProperty('start', 2);
      expect(sliced).toHaveProperty('end', 5);
      expect(sliced.glyphs).toHaveLength(2);
      expect(pluck('id', sliced.glyphs)).toEqual([64257, 109]);
    });

    test('should correctly slice glyphs breaking long ligature at 2nd char at start', () => {
      const run = {
        start: 0,
        end: 5,
        glyphs: [
          { id: 76, codePoints: [76] }, // l
          { id: 64259, codePoints: [102, 102, 105] }, // ffi
          { id: 109, codePoints: [109] }, // m
        ],
        glyphIndices: [0, 1, 1, 1, 2],
        attributes: { font },
      };
      const sliced = slice(3, 5, run);

      expect(sliced).toHaveProperty('start', 3);
      expect(sliced).toHaveProperty('end', 5);
      expect(sliced.glyphs).toHaveLength(2);
      expect(pluck('id', sliced.glyphs)).toEqual([105, 109]);
    });

    test('should correctly slice glyphs breaking long ligature at 1st char at end', () => {
      const run = {
        start: 0,
        end: 5,
        glyphs: [
          { id: 76, codePoints: [76] }, // l
          { id: 64259, codePoints: [102, 102, 105] }, // ffi
          { id: 109, codePoints: [109] }, // m
        ],
        glyphIndices: [0, 1, 1, 1, 2],
        attributes: { font },
      };
      const sliced = slice(0, 2, run);

      expect(sliced).toHaveProperty('start', 0);
      expect(sliced).toHaveProperty('end', 2);
      expect(sliced.glyphs).toHaveLength(2);
      expect(pluck('id', sliced.glyphs)).toEqual([76, 102]);
    });

    test('should correctly slice glyphs breaking long ligature at 2nd char at end', () => {
      const run = {
        start: 0,
        end: 5,
        glyphs: [
          { id: 76, codePoints: [76] }, // l
          { id: 64259, codePoints: [102, 102, 105] }, // ffi
          { id: 109, codePoints: [109] }, // m
        ],
        glyphIndices: [0, 1, 1, 1, 2],
        attributes: { font },
      };
      const sliced = slice(0, 3, run);

      expect(sliced).toHaveProperty('start', 0);
      expect(sliced).toHaveProperty('end', 3);
      expect(sliced.glyphs).toHaveLength(3);
      expect(pluck('id', sliced.glyphs)).toEqual([76, 102, 102]);
    });
  });

  describe('slice positions', () => {
    test('should exact slice return same positions', () => {
      const run = {
        start: 0,
        end: 5,
        positions: [
          { xAdvance: 8 }, // l
          { xAdvance: 7 }, // o
          { xAdvance: 6 }, // r
          { xAdvance: 5 }, // e
          { xAdvance: 4 }, // m
        ],
      };
      const sliced = slice(0, 5, run);

      expect(sliced).toHaveProperty('start', 0);
      expect(sliced).toHaveProperty('end', 5);
      expect(pluck('xAdvance', sliced.positions)).toEqual([8, 7, 6, 5, 4]);
    });

    test('should exact slice with ligature return same positions', () => {
      const run = {
        start: 0,
        end: 5,
        positions: [
          { xAdvance: 8 }, // l
          { xAdvance: 7 }, // o
          { xAdvance: 10 }, // fi
          { xAdvance: 4 }, // m
        ],
      };
      const sliced = slice(0, 5, run);

      expect(sliced).toHaveProperty('start', 0);
      expect(sliced).toHaveProperty('end', 5);
      expect(pluck('xAdvance', sliced.positions)).toEqual([8, 7, 10, 4]);
    });

    test('should correctly slice positions', () => {
      const run = {
        start: 0,
        end: 5,
        positions: [
          { xAdvance: 8 }, // l
          { xAdvance: 7 }, // o
          { xAdvance: 6 }, // r
          { xAdvance: 5 }, // e
          { xAdvance: 4 }, // m
        ],
      };
      const sliced = slice(2, 4, run);

      expect(pluck('xAdvance', sliced.positions)).toEqual([6, 5]);
    });

    test('should correctly slice positions containing ligature', () => {
      const run = {
        start: 0,
        end: 5,
        positions: [
          { xAdvance: 8 }, // l
          { xAdvance: 7 }, // o
          { xAdvance: 10 }, // fi
          { xAdvance: 4 }, // m
        ],
      };
      const sliced = slice(1, 5, run);

      expect(sliced).toHaveProperty('start', 1);
      expect(sliced).toHaveProperty('end', 5);
      expect(pluck('xAdvance', sliced.positions)).toEqual([7, 10, 4]);
    });

    test('should correctly slice positions starting in ligature', () => {
      const run = {
        start: 0,
        end: 5,
        positions: [
          { xAdvance: 8 }, // l
          { xAdvance: 7 }, // o
          { xAdvance: 10 }, // fi
          { xAdvance: 4 }, // m
        ],
        glyphIndices: [0, 1, 2, 2, 3],
      };
      const sliced = slice(2, 5, run);

      expect(sliced).toHaveProperty('start', 2);
      expect(sliced).toHaveProperty('end', 5);
      expect(pluck('xAdvance', sliced.positions)).toEqual([10, 4]);
    });

    test('should correctly slice positions ending in ligature', () => {
      const run = {
        start: 0,
        end: 5,
        positions: [
          { xAdvance: 8 }, // l
          { xAdvance: 7 }, // o
          { xAdvance: 10 }, // fi
          { xAdvance: 4 }, // m
        ],
        glyphIndices: [0, 1, 2, 2, 3],
      };
      const sliced = slice(1, 4, run);

      expect(sliced).toHaveProperty('start', 1);
      expect(sliced).toHaveProperty('end', 4);
      expect(pluck('xAdvance', sliced.positions)).toEqual([7, 10]);
    });

    test('should correctly slice positions breaking ligature at start', () => {
      const run = {
        start: 0,
        end: 5,
        glyphs: [
          { id: 76, codePoints: [76] }, // l
          { id: 111, codePoints: [111] }, // o
          { id: 64257, codePoints: [102, 105] }, // fi
          { id: 109, codePoints: [109] }, // m
        ],
        positions: [
          { xAdvance: 8 }, // l
          { xAdvance: 7 }, // o
          { xAdvance: 10 }, // fi
          { xAdvance: 4 }, // m
        ],
        glyphIndices: [0, 1, 2, 2, 3],
        attributes: { font, fontSize: 2 },
      };
      const sliced = slice(3, 5, run);

      expect(sliced).toHaveProperty('start', 3);
      expect(sliced).toHaveProperty('end', 5);
      expect(pluck('xAdvance', sliced.positions)).toEqual([8, 4]);
    });

    test('should correctly slice positions breaking ligature at end', () => {
      const run = {
        start: 0,
        end: 5,
        glyphs: [
          { id: 76, codePoints: [76] }, // l
          { id: 111, codePoints: [111] }, // o
          { id: 64257, codePoints: [102, 105] }, // fi
          { id: 109, codePoints: [109] }, // m
        ],
        positions: [
          { xAdvance: 8 }, // l
          { xAdvance: 7 }, // o
          { xAdvance: 10 }, // fi
          { xAdvance: 4 }, // m
        ],
        glyphIndices: [0, 1, 2, 2, 3],
        attributes: { font, fontSize: 2 },
      };
      const sliced = slice(1, 3, run);

      expect(sliced).toHaveProperty('start', 1);
      expect(sliced).toHaveProperty('end', 3);
      expect(pluck('xAdvance', sliced.positions)).toEqual([7, 8]);
    });
  });

  describe('slice glyph indices', () => {
    test('should exact slice return same glyph indices', () => {
      const run = {
        start: 0,
        end: 5,
        glyphIndices: [0, 1, 2, 3, 4],
      };
      const sliced = slice(0, 5, run);

      expect(sliced.glyphIndices).toEqual([0, 1, 2, 3, 4]);
    });

    test('should correctly slice glyph indices', () => {
      const run = {
        start: 0,
        end: 5,
        glyphIndices: [0, 1, 2, 3, 4],
      };
      const sliced = slice(2, 4, run);

      expect(sliced.glyphIndices).toEqual([0, 1]);
    });

    test('should exact slice return same glyph indices when ligature', () => {
      const run = {
        start: 0,
        end: 5,
        glyphIndices: [0, 1, 2, 2, 3],
      };
      const sliced = slice(0, 5, run);

      expect(sliced.glyphIndices).toEqual([0, 1, 2, 2, 3]);
    });

    test('should correctly slice glyph indices containing ligature', () => {
      const run = {
        start: 0,
        end: 5,
        glyphIndices: [0, 1, 2, 2, 3],
      };
      const sliced = slice(1, 5, run);

      expect(sliced.glyphIndices).toEqual([0, 1, 1, 2]);
    });

    test('should correctly slice glyph indices starting in ligature', () => {
      const run = {
        start: 0,
        end: 5,
        glyphIndices: [0, 1, 2, 2, 3],
      };
      const sliced = slice(2, 5, run);

      expect(sliced.glyphIndices).toEqual([0, 0, 1]);
    });

    test('should correctly slice glyph indices ending in ligature', () => {
      const run = {
        start: 0,
        end: 5,
        glyphIndices: [0, 1, 2, 2, 3],
      };
      const sliced = slice(1, 4, run);

      expect(sliced.glyphIndices).toEqual([0, 1, 1]);
    });

    test('should correctly slice glyph indices breaking ligature at start', () => {
      const run = {
        start: 0,
        end: 5,
        glyphIndices: [0, 1, 2, 2, 3],
      };
      const sliced = slice(3, 5, run);

      expect(sliced.glyphIndices).toEqual([0, 1]);
    });

    test('should correctly slice glyph indices breaking ligature at end', () => {
      const run = {
        start: 0,
        end: 5,
        glyphIndices: [0, 1, 2, 2, 3],
      };
      const sliced = slice(1, 3, run);

      expect(sliced.glyphIndices).toEqual([0, 1]);
    });
  });
});
