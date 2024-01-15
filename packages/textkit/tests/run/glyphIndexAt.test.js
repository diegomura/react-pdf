import { describe, expect, test } from '@jest/globals';

import glyphIndexAt from '../../src/run/glyphIndexAt';

describe('run glyphIndexAt operator', () => {
  test('should return string index if no glyph indices present', () => {
    const run = { start: 0, end: 5 };

    expect(glyphIndexAt(1, run)).toBe(1);
  });

  test('should correctly return glyph index', () => {
    const run = { start: 0, end: 5, glyphIndices: [0, 1, 2, 3, 4] };

    expect(glyphIndexAt(1, run)).toBe(1);
  });

  test('should correctly return trailing glyph index when ligature', () => {
    const run = { start: 0, end: 5, glyphIndices: [0, 1, 2, 2, 3] };

    expect(glyphIndexAt(1, run)).toBe(1);
  });

  test('should correctly return leading glyph index when ligature', () => {
    const run = { start: 0, end: 5, glyphIndices: [0, 1, 2, 2, 3] };

    expect(glyphIndexAt(4, run)).toBe(3);
  });

  test('should correctly return glyph index at ligature start', () => {
    const run = { start: 0, end: 5, glyphIndices: [0, 1, 2, 2, 3] };

    expect(glyphIndexAt(2, run)).toBe(2);
  });

  test('should correctly return glyph index at ligature end', () => {
    const run = { start: 0, end: 5, glyphIndices: [0, 1, 2, 2, 3] };

    expect(glyphIndexAt(3, run)).toBe(2);
  });
});
