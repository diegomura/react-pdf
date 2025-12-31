import { beforeEach, describe, expect, test, vi } from 'vitest';
import fromCodePoint from '../../src/glyph/fromCodePoint';

const font = {
  glyphForCodePoint: vi.fn((x) => ({
    id: x,
    codePoints: [x],
    advanceWidth: 5,
  })),
};

describe('glyph fromCodePoint operator', () => {
  beforeEach(() => {
    font.glyphForCodePoint.mockClear();
  });

  test('should return null if no font provided', () => {
    const result = fromCodePoint(76, null);

    expect(result).toBeNull();
  });

  test('should return null if no value provided', () => {
    const result = fromCodePoint(null, font as any);

    expect(result).toBeNull();
  });

  test('should return null if font is a string', () => {
    const result = fromCodePoint(76, 'Helvetica');

    expect(result).toBeNull();
  });

  test('should return null if both font and value are null', () => {
    const result = fromCodePoint(null, null);

    expect(result).toBeNull();
  });

  test('should return null if value is zero', () => {
    const result = fromCodePoint(0, font as any);

    expect(result).toBeNull();
  });

  test('should get glyph from font', () => {
    const result = fromCodePoint(76, font as any);

    expect(result).toHaveProperty('id', 76);
    expect(font.glyphForCodePoint.mock.calls).toHaveLength(1);
  });

  test('should get glyph for different code point', () => {
    const result = fromCodePoint(65, font as any);

    expect(result).toHaveProperty('id', 65);
    expect(result).toHaveProperty('codePoints', [65]);
    expect(font.glyphForCodePoint).toHaveBeenCalledWith(65);
  });

  test('should get glyph for emoji code point', () => {
    const result = fromCodePoint(128512, font as any);

    expect(result).toHaveProperty('id', 128512);
    expect(font.glyphForCodePoint).toHaveBeenCalledWith(128512);
  });

  test('should get glyph for space code point', () => {
    const result = fromCodePoint(32, font as any);

    expect(result).toHaveProperty('id', 32);
    expect(font.glyphForCodePoint).toHaveBeenCalledWith(32);
  });
});
