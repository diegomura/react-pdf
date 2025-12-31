import { describe, expect, test } from 'vitest';

import resolve from '../../src/indices/resolve';
import { Glyph } from '../../src/types';

const singleGlyph = { id: 1, advanceWidth: 0, codePoints: [0] } as Glyph;

const ligatureGlyph = { id: 1, advanceWidth: 0, codePoints: [0, 1] } as Glyph;

const longerLigatureGlyph = {
  id: 1,
  advanceWidth: 0,
  codePoints: [0, 1, 2],
} as Glyph;

describe('indices resolve operator', () => {
  test('should return empty array from empty array', () => {
    const result = resolve([]);
    expect(result).toEqual([]);
  });

  test('should return same indices from simple chars', () => {
    // ex. lorem
    const result = resolve([
      singleGlyph,
      singleGlyph,
      singleGlyph,
      singleGlyph,
      singleGlyph,
    ]);

    expect(result).toEqual([0, 1, 2, 3, 4]);
  });

  test('should return correct glyph indices when starting with ligature', () => {
    // ex. firem
    const result = resolve([
      ligatureGlyph,
      singleGlyph,
      singleGlyph,
      singleGlyph,
    ]);

    expect(result).toEqual([0, 0, 1, 2, 3]);
  });

  test('should return correct glyph indices when contain ligature', () => {
    // ex. lofim
    const result = resolve([
      singleGlyph,
      singleGlyph,
      ligatureGlyph,
      singleGlyph,
    ]);

    expect(result).toEqual([0, 1, 2, 2, 3]);
  });

  test('should return correct glyph indices when ending in ligature', () => {
    // ex. lorfi
    const result = resolve([
      singleGlyph,
      singleGlyph,
      singleGlyph,
      ligatureGlyph,
    ]);

    expect(result).toEqual([0, 1, 2, 3, 3]);
  });

  test('should return correct glyph indices when starting with long ligature', () => {
    // ex. ffirem
    const result = resolve([
      longerLigatureGlyph,
      singleGlyph,
      singleGlyph,
      singleGlyph,
    ]);

    expect(result).toEqual([0, 0, 0, 1, 2, 3]);
  });

  test('should return correct glyph indices when contain long ligature', () => {
    // ex. loffim
    const result = resolve([
      singleGlyph,
      singleGlyph,
      longerLigatureGlyph,
      singleGlyph,
    ]);

    expect(result).toEqual([0, 1, 2, 2, 2, 3]);
  });

  test('should return correct glyph indices when ending in long ligature', () => {
    // ex. lorffi
    const result = resolve([
      singleGlyph,
      singleGlyph,
      singleGlyph,
      longerLigatureGlyph,
    ]);

    expect(result).toEqual([0, 1, 2, 3, 3, 3]);
  });

  test('should fill undefined index at start', () => {
    // ex. lorem
    const result = resolve([
      undefined,
      singleGlyph,
      singleGlyph,
      singleGlyph,
      singleGlyph,
    ]);

    expect(result).toEqual([0, 1, 2, 3, 4]);
  });

  test('should fill undefined index at middle', () => {
    // ex. lorem
    const result = resolve([
      singleGlyph,
      singleGlyph,
      undefined,
      singleGlyph,
      singleGlyph,
    ]);

    expect(result).toEqual([0, 1, 2, 3, 4]);
  });

  test('should fill undefined index at end', () => {
    // ex. lorem
    const result = resolve([
      singleGlyph,
      singleGlyph,
      singleGlyph,
      singleGlyph,
      undefined,
    ]);

    expect(result).toEqual([0, 1, 2, 3, 4]);
  });

  test('should return indices for single glyph', () => {
    const result = resolve([singleGlyph]);

    expect(result).toEqual([0]);
  });

  test('should return indices for single ligature glyph', () => {
    const result = resolve([ligatureGlyph]);

    expect(result).toEqual([0, 0]);
  });

  test('should return indices for single long ligature glyph', () => {
    const result = resolve([longerLigatureGlyph]);

    expect(result).toEqual([0, 0, 0]);
  });

  test('should handle consecutive ligatures', () => {
    // ex. fifi
    const result = resolve([ligatureGlyph, ligatureGlyph]);

    expect(result).toEqual([0, 0, 1, 1]);
  });

  test('should handle multiple consecutive ligatures', () => {
    // ex. fififi
    const result = resolve([ligatureGlyph, ligatureGlyph, ligatureGlyph]);

    expect(result).toEqual([0, 0, 1, 1, 2, 2]);
  });

  test('should handle consecutive long ligatures', () => {
    // ex. ffiffi
    const result = resolve([longerLigatureGlyph, longerLigatureGlyph]);

    expect(result).toEqual([0, 0, 0, 1, 1, 1]);
  });
});
