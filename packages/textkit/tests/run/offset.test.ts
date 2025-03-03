import { describe, expect, test } from 'vitest';

import offset from '../../src/run/offset';
import { Glyph } from '../../src/types';

describe('run offset operator', () => {
  test('should return always 0 if no glyphIndices present', () => {
    const run = {
      start: 0,
      end: 5,
      attributes: {},
      glyphs: [
        { id: 76, advanceWidth: 10, codePoints: [76] }, // l
        { id: 111, advanceWidth: 10, codePoints: [111] }, // o
        { id: 102, advanceWidth: 10, codePoints: [102] }, // f
        { id: 105, advanceWidth: 10, codePoints: [105] }, // i
        { id: 109, advanceWidth: 10, codePoints: [109] }, // m
      ] as Glyph[],
    };

    expect(offset(0, run)).toBe(0);
    expect(offset(1, run)).toBe(0);
    expect(offset(2, run)).toBe(0);
    expect(offset(3, run)).toBe(0);
    expect(offset(4, run)).toBe(0);
  });

  test('should return always 0 for run without ligatures', () => {
    const run = {
      start: 0,
      end: 5,
      attributes: {},
      glyphs: [
        { id: 76, advanceWidth: 10, codePoints: [76] }, // l
        { id: 111, advanceWidth: 10, codePoints: [111] }, // o
        { id: 102, advanceWidth: 10, codePoints: [102] }, // f
        { id: 105, advanceWidth: 10, codePoints: [105] }, // i
        { id: 109, advanceWidth: 10, codePoints: [109] }, // m
      ] as Glyph[],
      glyphIndices: [0, 1, 2, 3, 4],
    };

    expect(offset(0, run)).toBe(0);
    expect(offset(1, run)).toBe(0);
    expect(offset(2, run)).toBe(0);
    expect(offset(3, run)).toBe(0);
    expect(offset(4, run)).toBe(0);
  });

  test('should correctly return offset for run with ligature', () => {
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
      glyphIndices: [0, 1, 2, 2, 3],
    };

    expect(offset(0, run)).toBe(0);
    expect(offset(1, run)).toBe(0);
    expect(offset(2, run)).toBe(0);
    expect(offset(3, run)).toBe(1);
    expect(offset(4, run)).toBe(0);
  });

  test('should correctly return offset for run with long ligature', () => {
    const run = {
      start: 0,
      end: 5,
      attributes: {},
      glyphs: [
        { id: 76, advanceWidth: 10, codePoints: [76] }, // l
        { id: 64259, advanceWidth: 10, codePoints: [102, 102, 105] }, // ffi
        { id: 109, advanceWidth: 10, codePoints: [109] }, // m
      ] as Glyph[],
      glyphIndices: [0, 1, 1, 1, 2],
    };

    expect(offset(0, run)).toBe(0);
    expect(offset(1, run)).toBe(0);
    expect(offset(2, run)).toBe(1);
    expect(offset(3, run)).toBe(2);
    expect(offset(4, run)).toBe(0);
  });
});
