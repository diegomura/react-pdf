import { describe, expect, test } from 'vitest';

import empty from '../../src/attributedString/empty';
import end from '../../src/attributedString/end';

describe('attributeString end operator', () => {
  test('should return 0 for empty string', () => {
    expect(end(empty())).toBe(0);
  });

  test('should return end value for single run', () => {
    const string = {
      string: '',
      runs: [{ start: 0, end: 5, attributes: {} }],
    };
    expect(end(string)).toBe(5);
  });

  test('should return last run end value', () => {
    const string = {
      string: '',
      runs: [
        { start: 2, end: 5, attributes: {} },
        { start: 5, end: 8, attributes: {} },
      ],
    };
    expect(end(string)).toBe(8);
  });
});
