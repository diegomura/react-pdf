import { describe, expect, test } from 'vitest';

import font from '../internal/font';
import pluck from '../internal/pluck';
import slice from '../../src/run/slice';
import { Glyph } from '../../src/types';

describe('run slice operator', () => {
  describe('slice start and end', () => {
    test('should slice containing range', () => {
      const attributes = { font: [] };
      const run = { start: 0, end: 10, attributes };
      const sliced = slice(2, 5, run);

      expect(sliced).toHaveProperty('start', 2);
      expect(sliced).toHaveProperty('end', 5);
      expect(sliced).toHaveProperty('attributes', attributes);
    });

    test('should slice exact range', () => {
      const attributes = { font: [] };
      const run = { start: 0, end: 10, attributes };
      const sliced = slice(0, 10, run);

      expect(sliced).toHaveProperty('start', 0);
      expect(sliced).toHaveProperty('end', 10);
      expect(sliced).toHaveProperty('attributes', attributes);
    });

    test('should slice exceeding range', () => {
      const attributes = { font: [] };
      const run = { start: 0, end: 10, attributes };
      const sliced = slice(2, 20, run);

      expect(sliced).toHaveProperty('start', 2);
      expect(sliced).toHaveProperty('end', 10);
      expect(sliced).toHaveProperty('attributes', attributes);
    });

    test('should slice containing range when start not zero', () => {
      const attributes = { font: [] };
      const run = { start: 5, end: 15, attributes };
      const sliced = slice(2, 5, run);

      expect(sliced).toHaveProperty('start', 7);
      expect(sliced).toHaveProperty('end', 10);
      expect(sliced).toHaveProperty('attributes', attributes);
    });

    test('should slice exact range when start not zero', () => {
      const attributes = { font: [] };
      const run = { start: 5, end: 15, attributes };
      const sliced = slice(0, 10, run);

      expect(sliced).toHaveProperty('start', 5);
      expect(sliced).toHaveProperty('end', 15);
      expect(sliced).toHaveProperty('attributes', attributes);
    });

    test('should slice exceeding range when start not zero', () => {
      const attributes = { font: [] };
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
        attributes: {},
        glyphs: [
          { id: 76, advanceWidth: 10, codePoints: [76] }, // l
          { id: 111, advanceWidth: 10, codePoints: [111] }, // o
          { id: 114, advanceWidth: 10, codePoints: [114] }, // r
          { id: 101, advanceWidth: 10, codePoints: [101] }, // e
          { id: 109, advanceWidth: 10, codePoints: [109] }, // m
        ] as Glyph[],
      };
      const sliced = slice(0, 5, run);

      expect(sliced).toHaveProperty('start', 0);
      expect(sliced).toHaveProperty('end', 5);
      expect(pluck('id', sliced.glyphs!)).toEqual([76, 111, 114, 101, 109]);
    });

    test('should exact slice with ligature return same glyphs', () => {
      const run = {
        start: 0,
        end: 5,
        attributes: {},
        glyphs: [
          { id: 76, advanceWidth: 10, codePoints: [76] }, // l
          { id: 111, advanceWidth: 10, codePoints: [111] }, // o
          { id: 64257, advanceWidth: 10, codePoints: [102, 105] }, // fi
          { id: 109, advanceWidth: 10, codePoints: [109] }, // m
        ] as Glyph[],
      };
      const sliced = slice(0, 5, run);

      expect(sliced).toHaveProperty('start', 0);
      expect(sliced).toHaveProperty('end', 5);
      expect(sliced.glyphs).toHaveLength(4);
      expect(pluck('id', sliced.glyphs!)).toEqual([76, 111, 64257, 109]);
    });

    test('should correctly slice glyphs', () => {
      const run = {
        start: 0,
        end: 5,
        attributes: {},
        glyphs: [
          { id: 76, advanceWidth: 10, codePoints: [76] }, // l
          { id: 111, advanceWidth: 10, codePoints: [111] }, // o
          { id: 114, advanceWidth: 10, codePoints: [114] }, // r
          { id: 101, advanceWidth: 10, codePoints: [101] }, // e
          { id: 109, advanceWidth: 10, codePoints: [109] }, // m
        ] as Glyph[],
      };
      const sliced = slice(2, 4, run);

      expect(pluck('id', sliced.glyphs!)).toEqual([114, 101]);
    });

    test('should correctly slice glyphs containing ligature', () => {
      const run = {
        start: 0,
        end: 5,
        attributes: {},
        glyphs: [
          { id: 76, advanceWidth: 10, codePoints: [76] }, // l
          { id: 111, advanceWidth: 10, codePoints: [111] }, // o
          { id: 64257, advanceWidth: 10, codePoints: [102, 105] }, // fi
          { id: 109, advanceWidth: 10, codePoints: [109] }, // m
        ] as Glyph[],
        stringIndices: [0, 1, 2, 2, 3],
        glyphIndices: [0, 1, 2, 4],
      };
      const sliced = slice(1, 5, run);

      expect(sliced).toHaveProperty('start', 1);
      expect(sliced).toHaveProperty('end', 5);
      expect(sliced.glyphs).toHaveLength(3);
      expect(pluck('id', sliced.glyphs!)).toEqual([111, 64257, 109]);
    });

    test('should correctly slice glyphs containing ligature at start', () => {
      const run = {
        start: 0,
        end: 5,
        glyphs: [
          { id: 64257, advanceWidth: 10, codePoints: [102, 105] }, // fi
          { id: 76, advanceWidth: 10, codePoints: [76] }, // l
          { id: 111, advanceWidth: 10, codePoints: [111] }, // o
          { id: 109, advanceWidth: 10, codePoints: [109] }, // m
        ] as Glyph[],
        stringIndices: [0, 0, 1, 2, 3],
        glyphIndices: [0, 2, 3, 4],
        attributes: { font: [font] },
      };
      const sliced = slice(1, 5, run);

      expect(sliced).toHaveProperty('start', 1);
      expect(sliced).toHaveProperty('end', 5);
      expect(sliced.glyphs).toHaveLength(4);
      expect(pluck('id', sliced.glyphs!)).toEqual([105, 76, 111, 109]);
    });

    test('should correctly slice glyphs starting in ligature', () => {
      const run = {
        start: 0,
        end: 5,
        attributes: {},
        glyphs: [
          { id: 76, advanceWidth: 10, codePoints: [76] }, // l
          { id: 111, advanceWidth: 10, codePoints: [111] }, // o
          { id: 64257, advanceWidth: 10, codePoints: [102, 105] }, // fi
          { id: 109, advanceWidth: 10, codePoints: [109] }, // m
        ] as Glyph[],
        stringIndices: [0, 1, 2, 2, 3],
        glyphIndices: [0, 1, 2, 4],
      };
      const sliced = slice(2, 5, run);

      expect(sliced).toHaveProperty('start', 2);
      expect(sliced).toHaveProperty('end', 5);
      expect(sliced.glyphs).toHaveLength(2);
      expect(pluck('id', sliced.glyphs!)).toEqual([64257, 109]);
    });

    test('should correctly slice glyphs ending in ligature', () => {
      const run = {
        start: 0,
        end: 5,
        attributes: {},
        glyphs: [
          { id: 76, advanceWidth: 10, codePoints: [76] }, // l
          { id: 111, advanceWidth: 10, codePoints: [111] }, // o
          { id: 64257, advanceWidth: 10, codePoints: [102, 105] }, // fi
          { id: 109, advanceWidth: 10, codePoints: [109] }, // m
        ] as Glyph[],
        stringIndices: [0, 1, 2, 2, 3],
        glyphIndices: [0, 1, 2, 4],
      };
      const sliced = slice(1, 4, run);

      expect(sliced).toHaveProperty('start', 1);
      expect(sliced).toHaveProperty('end', 4);
      expect(sliced.glyphs).toHaveLength(2);
      expect(pluck('id', sliced.glyphs!)).toEqual([111, 64257]);
    });

    test('should correctly slice glyphs breaking ligature at start', () => {
      const run = {
        start: 0,
        end: 5,
        glyphs: [
          { id: 76, advanceWidth: 10, codePoints: [76] }, // l
          { id: 111, advanceWidth: 10, codePoints: [111] }, // o
          { id: 64257, advanceWidth: 10, codePoints: [102, 105] }, // fi
          { id: 109, advanceWidth: 10, codePoints: [109] }, // m
        ] as Glyph[],
        stringIndices: [0, 1, 2, 2, 3],
        glyphIndices: [0, 1, 2, 4],
        attributes: { font: [font] },
      };
      const sliced = slice(3, 5, run);

      expect(sliced).toHaveProperty('start', 3);
      expect(sliced).toHaveProperty('end', 5);
      expect(sliced.glyphs).toHaveLength(2);
      expect(pluck('id', sliced.glyphs!)).toEqual([105, 109]);
    });

    test('should correctly slice glyphs breaking ligature at end', () => {
      const run = {
        start: 0,
        end: 5,
        glyphs: [
          { id: 76, advanceWidth: 10, codePoints: [76] }, // l
          { id: 111, advanceWidth: 10, codePoints: [111] }, // o
          { id: 64257, advanceWidth: 10, codePoints: [102, 105] }, // fi
          { id: 109, advanceWidth: 10, codePoints: [109] }, // m
        ] as Glyph[],
        stringIndices: [0, 1, 2, 2, 3],
        glyphIndices: [0, 1, 2, 4],
        attributes: { font: [font] },
      };
      const sliced = slice(1, 3, run);

      expect(sliced).toHaveProperty('start', 1);
      expect(sliced).toHaveProperty('end', 3);
      expect(sliced.glyphs).toHaveLength(2);
      expect(pluck('id', sliced.glyphs!)).toEqual([111, 102]);
    });

    test('should correctly slice glyphs starting in long ligature', () => {
      const run = {
        start: 0,
        end: 5,
        glyphs: [
          { id: 76, advanceWidth: 10, codePoints: [76] }, // l
          { id: 64259, advanceWidth: 10, codePoints: [102, 102, 105] }, // ffi
          { id: 109, advanceWidth: 10, codePoints: [109] }, // m
        ] as Glyph[],
        stringIndices: [0, 1, 1, 1, 2],
        glyphIndices: [0, 1, 4],
        attributes: { font: [font] },
      };
      const sliced = slice(1, 5, run);

      expect(sliced).toHaveProperty('start', 1);
      expect(sliced).toHaveProperty('end', 5);
      expect(sliced.glyphs).toHaveLength(2);
      expect(pluck('id', sliced.glyphs!)).toEqual([64259, 109]);
    });

    test('should correctly slice glyphs ending in long ligature', () => {
      const run = {
        start: 0,
        end: 5,
        glyphs: [
          { id: 76, advanceWidth: 10, codePoints: [76] }, // l
          { id: 64259, advanceWidth: 10, codePoints: [102, 102, 105] }, // ffi
          { id: 109, advanceWidth: 10, codePoints: [109] }, // m
        ] as Glyph[],
        stringIndices: [0, 1, 1, 1, 2],
        glyphIndices: [0, 1, 4],
        attributes: { font: [font] },
      };
      const sliced = slice(0, 4, run);

      expect(sliced).toHaveProperty('start', 0);
      expect(sliced).toHaveProperty('end', 4);
      expect(sliced.glyphs).toHaveLength(2);
      expect(pluck('id', sliced.glyphs!)).toEqual([76, 64259]);
    });

    test('should correctly slice glyphs breaking long ligature at 1st char at start', () => {
      const run = {
        start: 0,
        end: 5,
        glyphs: [
          { id: 76, advanceWidth: 10, codePoints: [76] }, // l
          { id: 64259, advanceWidth: 10, codePoints: [102, 102, 105] }, // ffi
          { id: 109, advanceWidth: 10, codePoints: [109] }, // m
        ] as Glyph[],
        stringIndices: [0, 1, 1, 1, 2],
        glyphIndices: [0, 1, 4],
        attributes: { font: [font] },
      };
      const sliced = slice(2, 5, run);

      expect(sliced).toHaveProperty('start', 2);
      expect(sliced).toHaveProperty('end', 5);
      expect(sliced.glyphs).toHaveLength(2);
      expect(pluck('id', sliced.glyphs!)).toEqual([64257, 109]);
    });

    test('should correctly slice glyphs breaking long ligature at 2nd char at start', () => {
      const run = {
        start: 0,
        end: 5,
        glyphs: [
          { id: 76, advanceWidth: 10, codePoints: [76] }, // l
          { id: 64259, advanceWidth: 10, codePoints: [102, 102, 105] }, // ffi
          { id: 109, advanceWidth: 10, codePoints: [109] }, // m
        ] as Glyph[],
        stringIndices: [0, 1, 1, 1, 2],
        glyphIndices: [0, 1, 4],
        attributes: { font: [font] },
      };
      const sliced = slice(3, 5, run);

      expect(sliced).toHaveProperty('start', 3);
      expect(sliced).toHaveProperty('end', 5);
      expect(sliced.glyphs).toHaveLength(2);
      expect(pluck('id', sliced.glyphs!)).toEqual([105, 109]);
    });

    test('should correctly slice glyphs breaking long ligature at 1st char at end', () => {
      const run = {
        start: 0,
        end: 5,
        glyphs: [
          { id: 76, advanceWidth: 10, codePoints: [76] }, // l
          { id: 64259, advanceWidth: 10, codePoints: [102, 102, 105] }, // ffi
          { id: 109, advanceWidth: 10, codePoints: [109] }, // m
        ] as Glyph[],
        stringIndices: [0, 1, 1, 1, 2],
        glyphIndices: [0, 1, 4],
        attributes: { font: [font] },
      };
      const sliced = slice(0, 2, run);

      expect(sliced).toHaveProperty('start', 0);
      expect(sliced).toHaveProperty('end', 2);
      expect(sliced.glyphs).toHaveLength(2);
      expect(pluck('id', sliced.glyphs!)).toEqual([76, 102]);
    });

    test('should correctly slice glyphs breaking long ligature at 2nd char at end', () => {
      const run = {
        start: 0,
        end: 5,
        glyphs: [
          { id: 76, advanceWidth: 10, codePoints: [76] }, // l
          { id: 64259, advanceWidth: 10, codePoints: [102, 102, 105] }, // ffi
          { id: 109, advanceWidth: 10, codePoints: [109] }, // m
        ] as Glyph[],
        stringIndices: [0, 1, 1, 1, 2],
        glyphIndices: [0, 1, 4],
        attributes: { font: [font] },
      };
      const sliced = slice(0, 3, run);

      expect(sliced).toHaveProperty('start', 0);
      expect(sliced).toHaveProperty('end', 3);
      expect(sliced.glyphs).toHaveLength(3);
      expect(pluck('id', sliced.glyphs!)).toEqual([76, 102, 102]);
    });

    test('should exact slice return same glyphs containing composed characters', () => {
      // "loกำm" — 5 string chars, 6 glyphs (ำ produces an extra empty glyph)
      const composedRun = {
        start: 0,
        end: 5,
        attributes: {},
        glyphs: [
          { id: 76, advanceWidth: 10, codePoints: [76] }, // l
          { id: 111, advanceWidth: 10, codePoints: [111] }, // o
          { id: 3585, advanceWidth: 10, codePoints: [3585] }, // ก
          { id: 3635, advanceWidth: 10, codePoints: [3635] }, //  ำ
          { id: 0, advanceWidth: 10, codePoints: [] }, // <empty>
          { id: 109, advanceWidth: 10, codePoints: [109] }, // m
        ] as Glyph[],
        stringIndices: [0, 1, 2, 3, 5],
        glyphIndices: [0, 1, 2, 3, 3, 4],
      };
      const sliced = slice(0, 5, composedRun);

      expect(sliced.glyphs).toHaveLength(6);
      expect(pluck('id', sliced.glyphs!)).toEqual([
        76, 111, 3585, 3635, 0, 109,
      ]);
    });

    test('should correctly slice glyphs containing composed characters', () => {
      // "loกำm" — 5 string chars, 6 glyphs (ำ produces an extra empty glyph)
      const composedRun = {
        start: 0,
        end: 5,
        attributes: {},
        glyphs: [
          { id: 76, advanceWidth: 10, codePoints: [76] }, // l
          { id: 111, advanceWidth: 10, codePoints: [111] }, // o
          { id: 3585, advanceWidth: 10, codePoints: [3585] }, // ก
          { id: 3635, advanceWidth: 10, codePoints: [3635] }, //  ำ
          { id: 0, advanceWidth: 10, codePoints: [] }, // <empty>
          { id: 109, advanceWidth: 10, codePoints: [109] }, // m
        ] as Glyph[],
        stringIndices: [0, 1, 2, 3, 5],
        glyphIndices: [0, 1, 2, 3, 3, 4],
      };
      const sliced = slice(1, 4, composedRun);

      expect(sliced.glyphs).toHaveLength(4);
      expect(pluck('id', sliced.glyphs!)).toEqual([111, 3585, 3635, 0]);
    });

    test('should correctly slice glyphs starting at composed character', () => {
      // "loกำm" — 5 string chars, 6 glyphs (ำ produces an extra empty glyph)
      const composedRun = {
        start: 0,
        end: 5,
        attributes: {},
        glyphs: [
          { id: 76, advanceWidth: 10, codePoints: [76] }, // l
          { id: 111, advanceWidth: 10, codePoints: [111] }, // o
          { id: 3585, advanceWidth: 10, codePoints: [3585] }, // ก
          { id: 3635, advanceWidth: 10, codePoints: [3635] }, //  ำ
          { id: 0, advanceWidth: 10, codePoints: [] }, // <empty>
          { id: 109, advanceWidth: 10, codePoints: [109] }, // m
        ] as Glyph[],
        stringIndices: [0, 1, 2, 3, 5],
        glyphIndices: [0, 1, 2, 3, 3, 4],
      };
      const sliced = slice(2, 5, composedRun);

      expect(sliced.glyphs).toHaveLength(4);
      expect(pluck('id', sliced.glyphs!)).toEqual([3585, 3635, 0, 109]);
    });

    test('should correctly slice glyphs starting after composed character', () => {
      // "loกำm" — 5 string chars, 6 glyphs (ำ produces an extra empty glyph)
      const composedRun = {
        start: 0,
        end: 5,
        attributes: {},
        glyphs: [
          { id: 76, advanceWidth: 10, codePoints: [76] }, // l
          { id: 111, advanceWidth: 10, codePoints: [111] }, // o
          { id: 3585, advanceWidth: 10, codePoints: [3585] }, // ก
          { id: 3635, advanceWidth: 10, codePoints: [3635] }, //  ำ
          { id: 0, advanceWidth: 10, codePoints: [] }, // <empty>
          { id: 109, advanceWidth: 10, codePoints: [109] }, // m
        ] as Glyph[],
        stringIndices: [0, 1, 2, 3, 5],
        glyphIndices: [0, 1, 2, 3, 3, 4],
      };
      const sliced = slice(3, 5, composedRun);

      expect(sliced.glyphs).toHaveLength(2);
      expect(pluck('id', sliced.glyphs!)).toEqual([0, 109]);
    });

    test('should correctly slice glyphs ending before composed character', () => {
      // "loกำm" — 5 string chars, 6 glyphs (ำ produces an extra empty glyph)
      const composedRun = {
        start: 0,
        end: 5,
        attributes: {},
        glyphs: [
          { id: 76, advanceWidth: 10, codePoints: [76] }, // l
          { id: 111, advanceWidth: 10, codePoints: [111] }, // o
          { id: 3585, advanceWidth: 10, codePoints: [3585] }, // ก
          { id: 3635, advanceWidth: 10, codePoints: [3635] }, //  ำ
          { id: 0, advanceWidth: 10, codePoints: [] }, // <empty>
          { id: 109, advanceWidth: 10, codePoints: [109] }, // m
        ] as Glyph[],
        stringIndices: [0, 1, 2, 3, 5],
        glyphIndices: [0, 1, 2, 3, 3, 4],
      };
      const sliced = slice(0, 3, composedRun);

      expect(sliced.glyphs).toHaveLength(3);
      expect(pluck('id', sliced.glyphs!)).toEqual([76, 111, 3585]);
    });

    test('should correctly slice glyphs ending after composed character', () => {
      // "loกำm" — 5 string chars, 6 glyphs (ำ produces an extra empty glyph)
      const composedRun = {
        start: 0,
        end: 5,
        attributes: {},
        glyphs: [
          { id: 76, advanceWidth: 10, codePoints: [76] }, // l
          { id: 111, advanceWidth: 10, codePoints: [111] }, // o
          { id: 3585, advanceWidth: 10, codePoints: [3585] }, // ก
          { id: 3635, advanceWidth: 10, codePoints: [3635] }, //  ำ
          { id: 0, advanceWidth: 10, codePoints: [] }, // <empty>
          { id: 109, advanceWidth: 10, codePoints: [109] }, // m
        ] as Glyph[],
        stringIndices: [0, 1, 2, 3, 5],
        glyphIndices: [0, 1, 2, 3, 3, 4],
      };
      const sliced = slice(0, 4, composedRun);

      expect(sliced.glyphs).toHaveLength(5);
      expect(pluck('id', sliced.glyphs!)).toEqual([76, 111, 3585, 3635, 0]);
    });
  });

  describe('slice positions', () => {
    test('should exact slice return same positions', () => {
      const run = {
        start: 0,
        end: 5,
        attributes: {},
        positions: [
          { xAdvance: 8, yAdvance: 0, xOffset: 0, yOffset: 0 }, // l
          { xAdvance: 7, yAdvance: 0, xOffset: 0, yOffset: 0 }, // o
          { xAdvance: 6, yAdvance: 0, xOffset: 0, yOffset: 0 }, // r
          { xAdvance: 5, yAdvance: 0, xOffset: 0, yOffset: 0 }, // e
          { xAdvance: 4, yAdvance: 0, xOffset: 0, yOffset: 0 }, // m
        ],
      };
      const sliced = slice(0, 5, run);

      expect(sliced).toHaveProperty('start', 0);
      expect(sliced).toHaveProperty('end', 5);
      expect(pluck('xAdvance', sliced.positions!)).toEqual([8, 7, 6, 5, 4]);
    });

    test('should exact slice with ligature return same positions', () => {
      const run = {
        start: 0,
        end: 5,
        attributes: {},
        positions: [
          { xAdvance: 8, yAdvance: 0, xOffset: 0, yOffset: 0 }, // l
          { xAdvance: 7, yAdvance: 0, xOffset: 0, yOffset: 0 }, // o
          { xAdvance: 10, yAdvance: 0, xOffset: 0, yOffset: 0 }, // fi
          { xAdvance: 4, yAdvance: 0, xOffset: 0, yOffset: 0 }, // m
        ],
      };
      const sliced = slice(0, 5, run);

      expect(sliced).toHaveProperty('start', 0);
      expect(sliced).toHaveProperty('end', 5);
      expect(pluck('xAdvance', sliced.positions!)).toEqual([8, 7, 10, 4]);
    });

    test('should exact slice with composed characters', () => {
      // กำ
      const run = {
        start: 0,
        end: 2,
        attributes: {},
        positions: [
          { xAdvance: 8, yAdvance: 0, xOffset: 0, yOffset: 0 }, // ก
          { xAdvance: 7, yAdvance: 0, xOffset: 0, yOffset: 0 }, //  ำ
          { xAdvance: 6, yAdvance: 0, xOffset: 0, yOffset: 0 }, // <empty>
        ],
        glyphs: [
          { id: 76, advanceWidth: 10, codePoints: [76] }, // ก
          { id: 111, advanceWidth: 10, codePoints: [111] }, // ำ
          { id: 114, advanceWidth: 10, codePoints: [] }, // <empty>
        ] as Glyph[],
        stringIndices: [0, 1],
        glyphIndices: [0, 1, 1],
      };
      const sliced = slice(0, 3, run);

      expect(sliced).toHaveProperty('start', 0);
      expect(sliced).toHaveProperty('end', 2);
      expect(pluck('xAdvance', sliced.positions!)).toEqual([8, 7, 6]);
      expect(sliced.stringIndices).toEqual([0, 1]);
      expect(sliced.glyphIndices).toEqual([0, 1, 1]);
    });

    test('should correctly slice positions', () => {
      const run = {
        start: 0,
        end: 5,
        attributes: {},
        positions: [
          { xAdvance: 8, yAdvance: 0, xOffset: 0, yOffset: 0 }, // l
          { xAdvance: 7, yAdvance: 0, xOffset: 0, yOffset: 0 }, // o
          { xAdvance: 6, yAdvance: 0, xOffset: 0, yOffset: 0 }, // r
          { xAdvance: 5, yAdvance: 0, xOffset: 0, yOffset: 0 }, // e
          { xAdvance: 4, yAdvance: 0, xOffset: 0, yOffset: 0 }, // m
        ],
      };
      const sliced = slice(2, 4, run);

      expect(pluck('xAdvance', sliced.positions!)).toEqual([6, 5]);
    });

    test('should correctly slice positions containing ligature', () => {
      const run = {
        start: 0,
        end: 5,
        attributes: {},
        positions: [
          { xAdvance: 8, yAdvance: 0, xOffset: 0, yOffset: 0 }, // l
          { xAdvance: 7, yAdvance: 0, xOffset: 0, yOffset: 0 }, // o
          { xAdvance: 10, yAdvance: 0, xOffset: 0, yOffset: 0 }, // fi
          { xAdvance: 4, yAdvance: 0, xOffset: 0, yOffset: 0 }, // m
        ],
      };
      const sliced = slice(1, 5, run);

      expect(sliced).toHaveProperty('start', 1);
      expect(sliced).toHaveProperty('end', 5);
      expect(pluck('xAdvance', sliced.positions!)).toEqual([7, 10, 4]);
    });

    test('should correctly slice positions starting in ligature', () => {
      const run = {
        start: 0,
        end: 5,
        attributes: {},
        positions: [
          { xAdvance: 8, yAdvance: 0, xOffset: 0, yOffset: 0 }, // l
          { xAdvance: 7, yAdvance: 0, xOffset: 0, yOffset: 0 }, // o
          { xAdvance: 10, yAdvance: 0, xOffset: 0, yOffset: 0 }, // fi
          { xAdvance: 4, yAdvance: 0, xOffset: 0, yOffset: 0 }, // m
        ],
        stringIndices: [0, 1, 2, 2, 3],
        glyphIndices: [0, 1, 2, 4],
      };
      const sliced = slice(2, 5, run);

      expect(sliced).toHaveProperty('start', 2);
      expect(sliced).toHaveProperty('end', 5);
      expect(pluck('xAdvance', sliced.positions!)).toEqual([10, 4]);
    });

    test('should correctly slice positions ending in ligature', () => {
      const run = {
        start: 0,
        end: 5,
        attributes: {},
        positions: [
          { xAdvance: 8, yAdvance: 0, xOffset: 0, yOffset: 0 }, // l
          { xAdvance: 7, yAdvance: 0, xOffset: 0, yOffset: 0 }, // o
          { xAdvance: 10, yAdvance: 0, xOffset: 0, yOffset: 0 }, // fi
          { xAdvance: 4, yAdvance: 0, xOffset: 0, yOffset: 0 }, // m
        ],
        stringIndices: [0, 1, 2, 2, 3],
        glyphIndices: [0, 1, 2, 4],
      };
      const sliced = slice(1, 4, run);

      expect(sliced).toHaveProperty('start', 1);
      expect(sliced).toHaveProperty('end', 4);
      expect(pluck('xAdvance', sliced.positions!)).toEqual([7, 10]);
    });

    test('should correctly slice positions breaking ligature at start', () => {
      const run = {
        start: 0,
        end: 5,
        glyphs: [
          { id: 76, advanceWidth: 10, codePoints: [76] }, // l
          { id: 111, advanceWidth: 10, codePoints: [111] }, // o
          { id: 64257, advanceWidth: 10, codePoints: [102, 105] }, // fi
          { id: 109, advanceWidth: 10, codePoints: [109] }, // m
        ] as Glyph[],
        positions: [
          { xAdvance: 8, yAdvance: 0, xOffset: 0, yOffset: 0 }, // l
          { xAdvance: 7, yAdvance: 0, xOffset: 0, yOffset: 0 }, // o
          { xAdvance: 10, yAdvance: 0, xOffset: 0, yOffset: 0 }, // fi
          { xAdvance: 4, yAdvance: 0, xOffset: 0, yOffset: 0 }, // m
        ],
        stringIndices: [0, 1, 2, 2, 3],
        glyphIndices: [0, 1, 2, 4],
        attributes: { font: [font], fontSize: 2 },
      };
      const sliced = slice(3, 5, run);

      expect(sliced).toHaveProperty('start', 3);
      expect(sliced).toHaveProperty('end', 5);
      expect(pluck('xAdvance', sliced.positions!)).toEqual([8, 4]);
    });

    test('should correctly slice positions breaking ligature at end', () => {
      const run = {
        start: 0,
        end: 5,
        glyphs: [
          { id: 76, advanceWidth: 10, codePoints: [76] }, // l
          { id: 111, advanceWidth: 10, codePoints: [111] }, // o
          { id: 64257, advanceWidth: 10, codePoints: [102, 105] }, // fi
          { id: 109, advanceWidth: 10, codePoints: [109] }, // m
        ] as Glyph[],
        positions: [
          { xAdvance: 8, yAdvance: 0, xOffset: 0, yOffset: 0 }, // l
          { xAdvance: 7, yAdvance: 0, xOffset: 0, yOffset: 0 }, // o
          { xAdvance: 10, yAdvance: 0, xOffset: 0, yOffset: 0 }, // fi
          { xAdvance: 4, yAdvance: 0, xOffset: 0, yOffset: 0 }, // m
        ],
        stringIndices: [0, 1, 2, 2, 3],
        glyphIndices: [0, 1, 2, 4],
        attributes: { font: [font], fontSize: 2 },
      };
      const sliced = slice(1, 3, run);

      expect(sliced).toHaveProperty('start', 1);
      expect(sliced).toHaveProperty('end', 3);
      expect(pluck('xAdvance', sliced.positions!)).toEqual([7, 8]);
    });

    test('should exact slice return same positions containing composed characters', () => {
      const run = {
        start: 0,
        end: 5,
        attributes: {},
        glyphs: [
          { id: 76, advanceWidth: 10, codePoints: [76] }, // l
          { id: 111, advanceWidth: 10, codePoints: [111] }, // o
          { id: 3585, advanceWidth: 10, codePoints: [3585] }, // ก
          { id: 3635, advanceWidth: 10, codePoints: [3635] }, //  ำ
          { id: 0, advanceWidth: 10, codePoints: [] }, // <empty>
          { id: 109, advanceWidth: 10, codePoints: [109] }, // m
        ] as Glyph[],
        positions: [
          { xAdvance: 8, yAdvance: 0, xOffset: 0, yOffset: 0 }, // l
          { xAdvance: 7, yAdvance: 0, xOffset: 0, yOffset: 0 }, // o
          { xAdvance: 6, yAdvance: 0, xOffset: 0, yOffset: 0 }, // ก
          { xAdvance: 5, yAdvance: 0, xOffset: 0, yOffset: 0 }, //  ำ
          { xAdvance: 4, yAdvance: 0, xOffset: 0, yOffset: 0 }, // <empty>
          { xAdvance: 3, yAdvance: 0, xOffset: 0, yOffset: 0 }, // m
        ],
        stringIndices: [0, 1, 2, 3, 5],
        glyphIndices: [0, 1, 2, 3, 3, 4],
      };
      const sliced = slice(0, 5, run);

      expect(pluck('xAdvance', sliced.positions!)).toEqual([8, 7, 6, 5, 4, 3]);
    });

    test('should correctly slice positions containing composed characters', () => {
      const sliced = slice(1, 4, {
        start: 0,
        end: 5,
        attributes: {},
        glyphs: [
          { id: 76, advanceWidth: 10, codePoints: [76] }, // l
          { id: 111, advanceWidth: 10, codePoints: [111] }, // o
          { id: 3585, advanceWidth: 10, codePoints: [3585] }, // ก
          { id: 3635, advanceWidth: 10, codePoints: [3635] }, //  ำ
          { id: 0, advanceWidth: 10, codePoints: [] }, // <empty>
          { id: 109, advanceWidth: 10, codePoints: [109] }, // m
        ] as Glyph[],
        positions: [
          { xAdvance: 8, yAdvance: 0, xOffset: 0, yOffset: 0 }, // l
          { xAdvance: 7, yAdvance: 0, xOffset: 0, yOffset: 0 }, // o
          { xAdvance: 6, yAdvance: 0, xOffset: 0, yOffset: 0 }, // ก
          { xAdvance: 5, yAdvance: 0, xOffset: 0, yOffset: 0 }, //  ำ
          { xAdvance: 4, yAdvance: 0, xOffset: 0, yOffset: 0 }, // <empty>
          { xAdvance: 3, yAdvance: 0, xOffset: 0, yOffset: 0 }, // m
        ],
        stringIndices: [0, 1, 2, 3, 5],
        glyphIndices: [0, 1, 2, 3, 3, 4],
      });

      expect(pluck('xAdvance', sliced.positions!)).toEqual([7, 6, 5, 4]);
    });

    test('should correctly slice positions starting after composed character', () => {
      const sliced = slice(3, 5, {
        start: 0,
        end: 5,
        attributes: {},
        glyphs: [
          { id: 76, advanceWidth: 10, codePoints: [76] }, // l
          { id: 111, advanceWidth: 10, codePoints: [111] }, // o
          { id: 3585, advanceWidth: 10, codePoints: [3585] }, // ก
          { id: 3635, advanceWidth: 10, codePoints: [3635] }, //  ำ
          { id: 0, advanceWidth: 10, codePoints: [] }, // <empty>
          { id: 109, advanceWidth: 10, codePoints: [109] }, // m
        ] as Glyph[],
        positions: [
          { xAdvance: 8, yAdvance: 0, xOffset: 0, yOffset: 0 }, // l
          { xAdvance: 7, yAdvance: 0, xOffset: 0, yOffset: 0 }, // o
          { xAdvance: 6, yAdvance: 0, xOffset: 0, yOffset: 0 }, // ก
          { xAdvance: 5, yAdvance: 0, xOffset: 0, yOffset: 0 }, //  ำ
          { xAdvance: 4, yAdvance: 0, xOffset: 0, yOffset: 0 }, // <empty>
          { xAdvance: 3, yAdvance: 0, xOffset: 0, yOffset: 0 }, // m
        ],
        stringIndices: [0, 1, 2, 3, 5],
        glyphIndices: [0, 1, 2, 3, 3, 4],
      });

      expect(pluck('xAdvance', sliced.positions!)).toEqual([4, 3]);
    });

    test('should correctly slice positions ending before composed character', () => {
      const sliced = slice(0, 3, {
        start: 0,
        end: 5,
        attributes: {},
        glyphs: [
          { id: 76, advanceWidth: 10, codePoints: [76] }, // l
          { id: 111, advanceWidth: 10, codePoints: [111] }, // o
          { id: 3585, advanceWidth: 10, codePoints: [3585] }, // ก
          { id: 3635, advanceWidth: 10, codePoints: [3635] }, //  ำ
          { id: 0, advanceWidth: 10, codePoints: [] }, // <empty>
          { id: 109, advanceWidth: 10, codePoints: [109] }, // m
        ] as Glyph[],
        positions: [
          { xAdvance: 8, yAdvance: 0, xOffset: 0, yOffset: 0 }, // l
          { xAdvance: 7, yAdvance: 0, xOffset: 0, yOffset: 0 }, // o
          { xAdvance: 6, yAdvance: 0, xOffset: 0, yOffset: 0 }, // ก
          { xAdvance: 5, yAdvance: 0, xOffset: 0, yOffset: 0 }, //  ำ
          { xAdvance: 4, yAdvance: 0, xOffset: 0, yOffset: 0 }, // <empty>
          { xAdvance: 3, yAdvance: 0, xOffset: 0, yOffset: 0 }, // m
        ],
        stringIndices: [0, 1, 2, 3, 5],
        glyphIndices: [0, 1, 2, 3, 3, 4],
      });

      expect(pluck('xAdvance', sliced.positions!)).toEqual([8, 7, 6]);
    });

    test('should correctly slice positions ending after composed character', () => {
      const sliced = slice(0, 4, {
        start: 0,
        end: 5,
        attributes: {},
        glyphs: [
          { id: 76, advanceWidth: 10, codePoints: [76] }, // l
          { id: 111, advanceWidth: 10, codePoints: [111] }, // o
          { id: 3585, advanceWidth: 10, codePoints: [3585] }, // ก
          { id: 3635, advanceWidth: 10, codePoints: [3635] }, //  ำ
          { id: 0, advanceWidth: 10, codePoints: [] }, // <empty>
          { id: 109, advanceWidth: 10, codePoints: [109] }, // m
        ] as Glyph[],
        positions: [
          { xAdvance: 8, yAdvance: 0, xOffset: 0, yOffset: 0 }, // l
          { xAdvance: 7, yAdvance: 0, xOffset: 0, yOffset: 0 }, // o
          { xAdvance: 6, yAdvance: 0, xOffset: 0, yOffset: 0 }, // ก
          { xAdvance: 5, yAdvance: 0, xOffset: 0, yOffset: 0 }, //  ำ
          { xAdvance: 4, yAdvance: 0, xOffset: 0, yOffset: 0 }, // <empty>
          { xAdvance: 3, yAdvance: 0, xOffset: 0, yOffset: 0 }, // m
        ],
        stringIndices: [0, 1, 2, 3, 5],
        glyphIndices: [0, 1, 2, 3, 3, 4],
      });

      expect(pluck('xAdvance', sliced.positions!)).toEqual([8, 7, 6, 5, 4]);
    });
  });

  describe('slice indices', () => {
    test('should exact slice return same indices', () => {
      const run = {
        start: 0,
        end: 5,
        attributes: {},
        stringIndices: [0, 1, 2, 3, 4],
        glyphIndices: [0, 1, 2, 3, 4],
      };
      const sliced = slice(0, 5, run);

      expect(sliced.stringIndices).toEqual([0, 1, 2, 3, 4]);
      expect(sliced.glyphIndices).toEqual([0, 1, 2, 3, 4]);
    });

    test('should correctly slice indices', () => {
      const run = {
        start: 0,
        end: 5,
        attributes: {},
        stringIndices: [0, 1, 2, 3, 4],
        glyphIndices: [0, 1, 2, 3, 4],
      };
      const sliced = slice(2, 4, run);

      expect(sliced.stringIndices).toEqual([0, 1]);
      expect(sliced.glyphIndices).toEqual([0, 1]);
    });

    test('should exact slice return same indices when ligature', () => {
      const run = {
        start: 0,
        end: 5,
        attributes: {},
        stringIndices: [0, 1, 2, 2, 3],
        glyphIndices: [0, 1, 2, 4],
      };
      const sliced = slice(0, 5, run);

      expect(sliced.stringIndices).toEqual([0, 1, 2, 2, 3]);
      expect(sliced.glyphIndices).toEqual([0, 1, 2, 4]);
    });

    test('should correctly slice indices containing ligature', () => {
      const run = {
        start: 0,
        end: 5,
        attributes: {},
        stringIndices: [0, 1, 2, 2, 3],
        glyphIndices: [0, 1, 2, 4],
      };
      const sliced = slice(1, 5, run);

      expect(sliced.stringIndices).toEqual([0, 1, 1, 2]);
      expect(sliced.glyphIndices).toEqual([0, 1, 3]);
    });

    test('should correctly slice indices starting in ligature', () => {
      const run = {
        start: 0,
        end: 5,
        attributes: {},
        stringIndices: [0, 1, 2, 2, 3],
        glyphIndices: [0, 1, 2, 4],
      };
      const sliced = slice(2, 5, run);

      expect(sliced.stringIndices).toEqual([0, 0, 1]);
      expect(sliced.glyphIndices).toEqual([0, 2]);
    });

    test('should correctly slice indices ending in ligature', () => {
      const run = {
        start: 0,
        end: 5,
        attributes: {},
        stringIndices: [0, 1, 2, 2, 3],
        glyphIndices: [0, 1, 2, 4],
      };
      const sliced = slice(1, 4, run);

      expect(sliced.stringIndices).toEqual([0, 1, 1]);
      expect(sliced.glyphIndices).toEqual([0, 1]);
    });

    test('should correctly slice indices breaking ligature at start', () => {
      const run = {
        start: 0,
        end: 5,
        attributes: { font: [font] },
        glyphs: [
          { id: 76, advanceWidth: 10, codePoints: [76] }, // l
          { id: 111, advanceWidth: 10, codePoints: [111] }, // o
          { id: 64257, advanceWidth: 10, codePoints: [102, 105] }, // fi
          { id: 109, advanceWidth: 10, codePoints: [109] }, // m
        ] as Glyph[],
        stringIndices: [0, 1, 2, 2, 3], // l o fi m
        glyphIndices: [0, 1, 2, 4],
      };
      const sliced = slice(3, 5, run); // i m

      expect(sliced.stringIndices).toEqual([0, 1]);
      expect(sliced.glyphIndices).toEqual([0, 1]);
    });

    test('should correctly slice indices breaking ligature at end', () => {
      const run = {
        start: 0,
        end: 5,
        attributes: { font: [font] },
        stringIndices: [0, 1, 2, 2, 3], // l o fi m
        glyphIndices: [0, 1, 2, 4],
        glyphs: [
          { id: 76, advanceWidth: 10, codePoints: [76] }, // l
          { id: 111, advanceWidth: 10, codePoints: [111] }, // o
          { id: 64257, advanceWidth: 10, codePoints: [102, 105] }, // fi
          { id: 109, advanceWidth: 10, codePoints: [109] }, // m
        ] as Glyph[],
      };
      const sliced = slice(1, 3, run); // o f

      expect(sliced.stringIndices).toEqual([0, 1]);
      expect(sliced.glyphIndices).toEqual([0, 1]);
    });

    test('should exact slice return same indices containing composed characters', () => {
      const composedRun = {
        start: 0,
        end: 5,
        attributes: {},
        stringIndices: [0, 1, 2, 3, 5],
        glyphIndices: [0, 1, 2, 3, 3, 4],
      };
      const sliced = slice(0, 5, composedRun);

      expect(sliced.stringIndices).toEqual([0, 1, 2, 3, 5]);
      expect(sliced.glyphIndices).toEqual([0, 1, 2, 3, 3, 4]);
    });

    test('should correctly slice indices containing composed characters', () => {
      const composedRun = {
        start: 0,
        end: 5,
        attributes: {},
        stringIndices: [0, 1, 2, 3, 5],
        glyphIndices: [0, 1, 2, 3, 3, 4],
      };
      const sliced = slice(1, 4, composedRun);

      expect(sliced.stringIndices).toEqual([0, 1, 2]);
      expect(sliced.glyphIndices).toEqual([0, 1, 2, 2]);
    });

    test('should correctly slice indices starting at composed character', () => {
      const composedRun = {
        start: 0,
        end: 5,
        attributes: {},
        stringIndices: [0, 1, 2, 3, 5],
        glyphIndices: [0, 1, 2, 3, 3, 4],
      };
      const sliced = slice(2, 5, composedRun);

      expect(sliced.stringIndices).toEqual([0, 1, 3]);
      expect(sliced.glyphIndices).toEqual([0, 1, 1, 2]);
    });

    test('should correctly slice indices starting after composed character', () => {
      const composedRun = {
        start: 0,
        end: 5,
        attributes: {},
        stringIndices: [0, 1, 2, 3, 5],
        glyphIndices: [0, 1, 2, 3, 3, 4],
      };
      const sliced = slice(3, 5, composedRun);

      expect(sliced.stringIndices).toEqual([0, 2]);
      expect(sliced.glyphIndices).toEqual([0, 1]);
    });

    test('should correctly slice indices ending before composed character', () => {
      const composedRun = {
        start: 0,
        end: 5,
        attributes: {},
        stringIndices: [0, 1, 2, 3, 5],
        glyphIndices: [0, 1, 2, 3, 3, 4],
      };
      const sliced = slice(0, 3, composedRun);

      expect(sliced.stringIndices).toEqual([0, 1, 2]);
      expect(sliced.glyphIndices).toEqual([0, 1, 2]);
    });

    test('should correctly slice indices ending after composed character', () => {
      const composedRun = {
        start: 0,
        end: 5,
        attributes: {},
        stringIndices: [0, 1, 2, 3, 5],
        glyphIndices: [0, 1, 2, 3, 3, 4],
      };
      const sliced = slice(0, 4, composedRun);

      expect(sliced.stringIndices).toEqual([0, 1, 2, 3]);
      expect(sliced.glyphIndices).toEqual([0, 1, 2, 3, 3]);
    });
  });
});
