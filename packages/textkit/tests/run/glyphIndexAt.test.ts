import { describe, expect, test } from 'vitest';

import glyphIndexAt from '../../src/run/glyphIndexAt';

describe('run glyphIndexAt operator', () => {
  test('should return string index if no glyph indices present', () => {
    const run = { start: 0, end: 5, attributes: {} };

    expect(glyphIndexAt(1, run)).toBe(1);
  });

  test('should correctly return glyph index', () => {
    const run = {
      start: 0,
      end: 5,
      attributes: {},
      stringIndices: [0, 1, 2, 3, 4],
      glyphIndices: [0, 1, 2, 3, 4],
    };

    expect(glyphIndexAt(1, run)).toBe(1);
  });

  test('should correctly return trailing glyph index when ligature', () => {
    const run = {
      start: 0,
      end: 5,
      attributes: {},
      stringIndices: [0, 1, 2, 2, 3],
      glyphIndices: [0, 1, 2, 4],
    };

    expect(glyphIndexAt(1, run)).toBe(1);
  });

  test('should correctly return leading glyph index when ligature', () => {
    const run = {
      start: 0,
      end: 5,
      attributes: {},
      stringIndices: [0, 1, 2, 2, 3],
      glyphIndices: [0, 1, 2, 4],
    };

    expect(glyphIndexAt(4, run)).toBe(3);
  });

  test('should correctly return glyph index at ligature start', () => {
    const run = {
      start: 0,
      end: 5,
      attributes: {},
      stringIndices: [0, 1, 2, 2, 3],
      glyphIndices: [0, 1, 2, 4],
    };

    expect(glyphIndexAt(2, run)).toBe(2);
  });

  test('should correctly return glyph index at ligature end', () => {
    const run = {
      start: 0,
      end: 5,
      attributes: {},
      stringIndices: [0, 1, 2, 2, 3],
      glyphIndices: [0, 1, 2, 4],
    };

    expect(glyphIndexAt(3, run)).toBe(2);
  });

  test('should correctly return glyph index for composed characters', () => {
    const run = {
      start: 0,
      end: 2,
      attributes: {},
      stringIndices: [0, 1],
      glyphIndices: [0, 1, 1],
    };

    expect(glyphIndexAt(0, run)).toBe(0);
    expect(glyphIndexAt(1, run)).toBe(2);
  });

  test('should return length for index past all glyph mappings', () => {
    const run = {
      start: 0,
      end: 2,
      attributes: {},
      glyphIndices: [0, 1],
    };

    expect(glyphIndexAt(2, run)).toBe(2);
    expect(glyphIndexAt(5, run)).toBe(2);
  });

  test('should return length for index past ligature mappings', () => {
    const run = {
      start: 0,
      end: 5,
      attributes: {},
      glyphIndices: [0, 1, 2, 4],
    };

    expect(glyphIndexAt(5, run)).toBe(4);
    expect(glyphIndexAt(10, run)).toBe(4);
  });
});
