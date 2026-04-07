import { describe, expect, test } from 'vitest';

import slice from '../../src/glyph/slice';
import font from '../internal/font';
import { Glyph, Font } from '../../src/types';

describe('glyph slice operator', () => {
  test('should return empty array for null glyph', () => {
    const sliced = slice(0, 1, font, null as unknown as Glyph);

    expect(sliced).toHaveLength(0);
  });

  test('should return empty array for undefined glyph', () => {
    const sliced = slice(0, 1, font, undefined as unknown as Glyph);

    expect(sliced).toHaveLength(0);
  });

  test('should return same glyph when no font provided', () => {
    const glyph = { id: 76, advanceWidth: 10, codePoints: [76] } as Glyph;
    const sliced = slice(0, 1, null as unknown as Font, glyph);

    expect(sliced).toHaveLength(1);
    expect(sliced[0]).toBe(glyph);
  });

  test('should return no glyph for empty slice', () => {
    const glyph = { id: 76, advanceWidth: 10, codePoints: [76] } as Glyph;
    const sliced = slice(0, 0, font, glyph);

    expect(sliced).toHaveLength(0);
  });

  test('should return no glyph when start equals end', () => {
    const glyph = { id: 76, advanceWidth: 10, codePoints: [76] } as Glyph;
    const sliced = slice(1, 1, font, glyph);

    expect(sliced).toHaveLength(0);
  });

  test('should return same glyph for exact slice', () => {
    const glyph = { id: 76, advanceWidth: 10, codePoints: [76] } as Glyph;
    const sliced = slice(0, 1, font, glyph);

    expect(sliced).toHaveLength(1);
    expect(sliced[0]).toHaveProperty('id', 76);
    expect(sliced[0]).toHaveProperty('codePoints', [76]);
  });

  test('should return same ligature glyphs for exact slice', () => {
    const glyph = {
      id: 64257,
      advanceWidth: 10,
      codePoints: [102, 105],
    } as Glyph; // fi;

    const sliced = slice(0, 2, font, glyph);

    expect(sliced).toHaveLength(1);
    expect(sliced[0]).toHaveProperty('id', 64257);
    expect(sliced[0]).toHaveProperty('codePoints', [102, 105]);
  });

  test('should return same long ligature glyphs for exact slice', () => {
    const glyph = {
      id: 64259,
      advanceWidth: 10,
      codePoints: [102, 102, 105],
    } as Glyph; // fi;

    const sliced = slice(0, 3, font, glyph);

    expect(sliced).toHaveLength(1);
    expect(sliced[0]).toHaveProperty('id', 64259);
    expect(sliced[0]).toHaveProperty('codePoints', [102, 102, 105]);
  });

  test('should break ligature glyph in half at start', () => {
    const glyph = {
      id: 64257,
      advanceWidth: 10,
      codePoints: [102, 105],
    } as Glyph; // fi;

    const sliced = slice(0, 1, font, glyph);

    expect(sliced).toHaveLength(1);
    expect(sliced[0]).toHaveProperty('id', 102);
    expect(sliced[0]).toHaveProperty('codePoints', [102]);
  });

  test('should break ligature glyph in half at end', () => {
    const glyph = {
      id: 64257,
      advanceWidth: 10,
      codePoints: [102, 105],
    } as Glyph; // fi;

    const sliced = slice(1, 2, font, glyph);

    expect(sliced).toHaveLength(1);
    expect(sliced[0]).toHaveProperty('id', 105);
    expect(sliced[0]).toHaveProperty('codePoints', [105]);
  });

  test('should break long ligature glyph in 1st char at start', () => {
    const glyph = {
      id: 64259,
      advanceWidth: 10,
      codePoints: [102, 102, 105],
    } as Glyph; // fi;

    const sliced = slice(0, 1, font, glyph);

    expect(sliced).toHaveLength(1);
    expect(sliced[0]).toHaveProperty('id', 102);
    expect(sliced[0]).toHaveProperty('codePoints', [102]);
  });

  test('should break long ligature glyph in 1st char at end', () => {
    const glyph = {
      id: 64259,
      advanceWidth: 10,
      codePoints: [102, 102, 105],
    } as Glyph; // fi;

    const sliced = slice(1, 3, font, glyph);

    expect(sliced).toHaveLength(1);
    expect(sliced[0]).toHaveProperty('id', 64257);
    expect(sliced[0]).toHaveProperty('codePoints', [102, 105]);
  });

  test('should break long ligature glyph in 2nd char at start', () => {
    const glyph = {
      id: 64259,
      advanceWidth: 10,
      codePoints: [102, 102, 105],
    } as Glyph; // ffi;

    const sliced = slice(0, 2, font, glyph);

    expect(sliced).toHaveLength(2);
    expect(sliced[0]).toHaveProperty('id', 102);
    expect(sliced[0]).toHaveProperty('codePoints', [102]);
    expect(sliced[1]).toHaveProperty('id', 102);
    expect(sliced[1]).toHaveProperty('codePoints', [102]);
  });

  test('should break long ligature glyph in 2nd char at end', () => {
    const glyph = {
      id: 64259,
      advanceWidth: 10,
      codePoints: [102, 102, 105],
    } as Glyph; // fi;

    const sliced = slice(2, 3, font, glyph);

    expect(sliced).toHaveLength(1);
    expect(sliced[0]).toHaveProperty('id', 105);
    expect(sliced[0]).toHaveProperty('codePoints', [105]);
  });
});
