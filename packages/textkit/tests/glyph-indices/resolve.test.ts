import { describe, expect, test } from 'vitest';

import resolve from '../../src/glyph-indices/resolve';
import { Glyph } from '../../src/types';

const singleGlyph = { id: 1, advanceWidth: 0, codePoints: [0] } as Glyph;

const ligatureGlyph = { id: 1, advanceWidth: 0, codePoints: [0, 1] } as Glyph;

const longerLigatureGlyph = {
  id: 1,
  advanceWidth: 0,
  codePoints: [0, 1, 2],
} as Glyph;

const decomposedGlyph = {
  id: 2,
  advanceWidth: 0,
  codePoints: [] as number[],
} as Glyph;

describe('glyph indices resolve operator', () => {
  test('should return empty array from no arguments', () => {
    const result = resolve();
    expect(result).toEqual([]);
  });

  test('should return empty array from empty array', () => {
    const result = resolve([]);
    expect(result).toEqual([]);
  });

  test('should return index for single glyph', () => {
    const result = resolve([singleGlyph]);
    expect(result).toEqual([0]);
  });

  test('should return index for single ligature glyph', () => {
    const result = resolve([ligatureGlyph]);
    expect(result).toEqual([0]);
  });

  test('should return index for single long ligature glyph', () => {
    const result = resolve([longerLigatureGlyph]);
    expect(result).toEqual([0]);
  });

  test('should return sequential indices for simple glyphs', () => {
    // ex. lorem (each glyph = 1 code point)
    const result = resolve([
      singleGlyph,
      singleGlyph,
      singleGlyph,
      singleGlyph,
      singleGlyph,
    ]);

    expect(result).toEqual([0, 1, 2, 3, 4]);
  });

  test('should return correct indices when starting with ligature', () => {
    // ex. firem (fi is a ligature)
    const result = resolve([
      ligatureGlyph,
      singleGlyph,
      singleGlyph,
      singleGlyph,
    ]);

    expect(result).toEqual([0, 2, 3, 4]);
  });

  test('should return correct indices when containing ligature', () => {
    // ex. lofim (fi is a ligature)
    const result = resolve([
      singleGlyph,
      singleGlyph,
      ligatureGlyph,
      singleGlyph,
    ]);

    expect(result).toEqual([0, 1, 2, 4]);
  });

  test('should return correct indices when ending in ligature', () => {
    // ex. lorfi (fi is a ligature)
    const result = resolve([
      singleGlyph,
      singleGlyph,
      singleGlyph,
      ligatureGlyph,
    ]);

    expect(result).toEqual([0, 1, 2, 3]);
  });

  test('should return correct indices when starting with long ligature', () => {
    // ex. ffirem (ffi is a ligature)
    const result = resolve([
      longerLigatureGlyph,
      singleGlyph,
      singleGlyph,
      singleGlyph,
    ]);

    expect(result).toEqual([0, 3, 4, 5]);
  });

  test('should return correct indices when containing long ligature', () => {
    // ex. loffim (ffi is a ligature)
    const result = resolve([
      singleGlyph,
      singleGlyph,
      longerLigatureGlyph,
      singleGlyph,
    ]);

    expect(result).toEqual([0, 1, 2, 5]);
  });

  test('should return correct indices when ending in long ligature', () => {
    // ex. lorffi (ffi is a ligature)
    const result = resolve([
      singleGlyph,
      singleGlyph,
      singleGlyph,
      longerLigatureGlyph,
    ]);

    expect(result).toEqual([0, 1, 2, 3]);
  });

  test('should handle consecutive ligatures', () => {
    // ex. fifi (two fi ligatures)
    const result = resolve([ligatureGlyph, ligatureGlyph]);
    expect(result).toEqual([0, 2]);
  });

  test('should handle multiple consecutive ligatures', () => {
    // ex. fififi (three fi ligatures)
    const result = resolve([ligatureGlyph, ligatureGlyph, ligatureGlyph]);
    expect(result).toEqual([0, 2, 4]);
  });

  test('should handle consecutive long ligatures', () => {
    // ex. ffiffi (two ffi ligatures)
    const result = resolve([longerLigatureGlyph, longerLigatureGlyph]);
    expect(result).toEqual([0, 3]);
  });

  test('should map decomposed glyph to same index as base glyph', () => {
    // ex. é decomposed into base "e" + combining accent
    const result = resolve([singleGlyph, decomposedGlyph]);
    expect(result).toEqual([0, 0]);
  });

  test('should handle decomposed glyph at start of string', () => {
    // ex. él — é decomposes, then "l"
    const result = resolve([singleGlyph, decomposedGlyph, singleGlyph]);
    expect(result).toEqual([0, 0, 1]);
  });

  test('should handle decomposed glyph in middle of string', () => {
    // ex. lém — l, then é decomposes, then "m"
    const result = resolve([
      singleGlyph,
      singleGlyph,
      decomposedGlyph,
      singleGlyph,
    ]);

    expect(result).toEqual([0, 1, 1, 2]);
  });

  test('should handle decomposed glyph at end of string', () => {
    // ex. lé — l, then é decomposes
    const result = resolve([singleGlyph, singleGlyph, decomposedGlyph]);
    expect(result).toEqual([0, 1, 1]);
  });

  test('should handle multiple decomposed characters', () => {
    // ex. éà — both decompose into base + combining mark
    const result = resolve([
      singleGlyph,
      decomposedGlyph,
      singleGlyph,
      decomposedGlyph,
    ]);

    expect(result).toEqual([0, 0, 1, 1]);
  });

  test('should handle decomposed glyph next to ligature', () => {
    // ex. fié — fi ligature, then é decomposes
    const result = resolve([ligatureGlyph, singleGlyph, decomposedGlyph]);
    expect(result).toEqual([0, 2, 2]);
  });
});
