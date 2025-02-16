import { describe, expect, test } from 'vitest';

import empty from '../../src/attributedString/empty';
import length from '../../src/attributedString/length';

describe('attributeString length operator', () => {
  test('should return 0 for empty string', () => {
    expect(length(empty())).toBe(0);
  });

  test('should correct length for attributed string', () => {
    const string = {
      string: '',
      runs: [
        { start: 2, end: 5, attributes: {} },
        { start: 5, end: 8, attributes: {} },
      ],
    };
    expect(length(string)).toBe(6);
  });
});
