import { describe, expect, test } from 'vitest';

import append from '../../src/glyph-indices/append';

describe('glyph indices append operator', () => {
  test('should append to empty array', () => {
    const result = append(0, []);
    expect(result).toEqual([0]);
  });

  test('should append to single element array', () => {
    const result = append(1, [0]);
    expect(result).toEqual([0, 1]);
  });

  test('should append to array with sequential indices', () => {
    const result = append(3, [0, 1, 2]);
    expect(result).toEqual([0, 1, 2, 3]);
  });

  test('should append to array with ligature indices', () => {
    // ex. fi + new glyph — fi ligature maps both glyphs to index 0
    const result = append(2, [0]);
    expect(result).toEqual([0, 2]);
  });

  test('should append to array with decomposed character indices', () => {
    // ex. é (base + combining) + new glyph
    const result = append(1, [0, 0]);
    expect(result).toEqual([0, 0, 1]);
  });

  test('should not mutate original array', () => {
    const original = [0, 1, 2];
    const result = append(3, original);
    expect(original).toEqual([0, 1, 2]);
    expect(result).toEqual([0, 1, 2, 3]);
  });
});
