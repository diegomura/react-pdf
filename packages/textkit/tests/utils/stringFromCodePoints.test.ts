import { describe, expect, test } from 'vitest';
import stringFromCodePoints from '../../src/utils/stringFromCodePoints';

describe('utils stringFromCodePoints operator', () => {
  test('should return empty string if no param passed', () => {
    expect(stringFromCodePoints(null)).toBe('');
  });

  test('should return empty string if empty array passed', () => {
    expect(stringFromCodePoints([])).toBe('');
  });

  test('should return get correct string for single code point', () => {
    expect(stringFromCodePoints([76])).toBe('L');
  });

  test('should return get correct string for single ligature code point', () => {
    expect(stringFromCodePoints([64257])).toBe('ﬁ');
  });

  test('should return get correct string for multipe code points', () => {
    expect(stringFromCodePoints([76, 77, 78])).toBe('LMN');
  });

  test('should return get correct string for multipe ligautre code points', () => {
    expect(stringFromCodePoints([64257, 64259])).toBe('ﬁﬃ');
  });

  test('should return get correct string for even mode code points', () => {
    expect(stringFromCodePoints([76, 64257, 77, 64259, 78])).toBe('LﬁMﬃN');
  });

  test('should handle surrogate pair code points correctly', () => {
    expect(stringFromCodePoints([0x1f600])).toBe(String.fromCodePoint(0x1f600));
  });

  test('should handle multiple surrogate pair code points', () => {
    expect(stringFromCodePoints([0x1f600, 0x1f60d])).toBe(
      String.fromCodePoint(0x1f600) + String.fromCodePoint(0x1f60d),
    );
  });

  test('should handle mixed regular and surrogate pair code points', () => {
    expect(stringFromCodePoints([65, 0x1f600, 66, 0x1f60d, 67])).toBe(
      'A' +
        String.fromCodePoint(0x1f600) +
        'B' +
        String.fromCodePoint(0x1f60d) +
        'C',
    );
  });
});
