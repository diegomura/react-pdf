import { describe, expect, test } from 'vitest';

import isWhiteSpace from '../../src/glyph/isWhiteSpace';
import { Glyph } from '../../src/types';

describe('glyph isWhiteSpace operator', () => {
  test('should return false if no glyph provided', () => {
    const result = isWhiteSpace(null);

    expect(result).toBeFalsy();
  });

  test('should return false for non white space glyph', () => {
    const result = isWhiteSpace({
      id: 45,
      codePoints: [45],
      advanceWidth: 0,
    } as Glyph);

    expect(result).toBeFalsy();
  });

  test('should return true for white space glyph', () => {
    const result = isWhiteSpace({
      id: 32,
      codePoints: [32],
      advanceWidth: 0,
    } as Glyph);

    expect(result).toBeTruthy();
  });

  test('should return true when whitespace is in multiple codePoints', () => {
    const result = isWhiteSpace({
      id: 100,
      codePoints: [65, 32, 66],
      advanceWidth: 0,
    } as Glyph);

    expect(result).toBeTruthy();
  });

  test('should return false for letter glyph', () => {
    const result = isWhiteSpace({
      id: 65,
      codePoints: [65],
      advanceWidth: 0,
    } as Glyph);

    expect(result).toBeFalsy();
  });

  test('should return false for number glyph', () => {
    const result = isWhiteSpace({
      id: 48,
      codePoints: [48],
      advanceWidth: 0,
    } as Glyph);

    expect(result).toBeFalsy();
  });

  test('should return false for tab character (code 9)', () => {
    const result = isWhiteSpace({
      id: 9,
      codePoints: [9],
      advanceWidth: 0,
    } as Glyph);

    expect(result).toBeFalsy();
  });

  test('should return false for newline character (code 10)', () => {
    const result = isWhiteSpace({
      id: 10,
      codePoints: [10],
      advanceWidth: 0,
    } as Glyph);

    expect(result).toBeFalsy();
  });
});
