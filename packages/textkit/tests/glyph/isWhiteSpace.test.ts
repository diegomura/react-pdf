import { describe, expect, test } from 'vitest';

import isWhiteSpace from '../../src/glyph/isWhiteSpace';

describe('glyph isWhiteSpace operator', () => {
  test('should return false if no glyph provided', () => {
    const result = isWhiteSpace(null);

    expect(result).toBeFalsy();
  });

  test('should return false for non white space glyph', () => {
    const result = isWhiteSpace({ id: 45, codePoints: [45], advanceWidth: 0 });

    expect(result).toBeFalsy();
  });

  test('should get glyph from font', () => {
    const result = isWhiteSpace({ id: 32, codePoints: [32], advanceWidth: 0 });

    expect(result).toBeTruthy();
  });
});
