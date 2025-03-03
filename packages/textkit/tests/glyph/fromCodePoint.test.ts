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

  test('should get glyph from font', () => {
    const result = fromCodePoint(76, font as any);

    expect(result).toHaveProperty('id', 76);
    expect(font.glyphForCodePoint.mock.calls).toHaveLength(1);
  });
});
