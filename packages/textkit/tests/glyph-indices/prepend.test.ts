import { describe, expect, test } from 'vitest';

import prepend from '../../src/glyph-indices/prepend';

describe('glyph indices prepend operator', () => {
  test('should return array with zero when prepending to empty array', () => {
    const result = prepend(1, []);
    expect(result).toEqual([0]);
  });

  test('should return same empty array if zero passed to empty array', () => {
    const result = prepend(0, []);
    expect(result).toEqual([]);
  });

  test('should return same array if zero passed', () => {
    const result = prepend(0, [0, 1, 2]);
    expect(result).toEqual([0, 1, 2]);
  });

  test('should prepend and shift single element array', () => {
    const result = prepend(1, [0]);
    expect(result).toEqual([0, 1]);
  });

  test('should prepend and shift sequential indices', () => {
    const result = prepend(1, [0, 1, 2]);
    expect(result).toEqual([0, 1, 2, 3]);
  });

  test('should prepend with ligature length', () => {
    // Prepending a ligature glyph (2 code points) before existing glyphs
    const result = prepend(2, [0, 1, 2]);
    expect(result).toEqual([0, 2, 3, 4]);
  });

  test('should prepend with long ligature length', () => {
    // Prepending a 3-code-point ligature before existing glyphs
    const result = prepend(3, [0, 1]);
    expect(result).toEqual([0, 3, 4]);
  });

  test('should prepend to array with ligature indices', () => {
    // Existing array has a ligature (index 0 repeated), prepend single glyph
    const result = prepend(1, [0, 2]);
    expect(result).toEqual([0, 1, 3]);
  });

  test('should prepend to array with decomposed character indices', () => {
    // Existing array: base + combining mark (both at index 0)
    const result = prepend(1, [0, 0]);
    expect(result).toEqual([0, 1, 1]);
  });

  test('should not mutate original array', () => {
    const original = [0, 1, 2];
    const result = prepend(1, original);
    expect(original).toEqual([0, 1, 2]);
    expect(result).toEqual([0, 1, 2, 3]);
  });
});
