import { describe, expect, test } from 'vitest';

import empty from '../../src/attributedString/empty';
import start from '../../src/attributedString/start';

describe('attributeString start operator', () => {
  test('should return 0 for empty string', () => {
    expect(start(empty())).toBe(0);
  });

  test('should return start value for single run', () => {
    const string = {
      string: '',
      runs: [{ start: 0, end: 5, attributes: {} }],
    };
    expect(start(string)).toBe(0);
  });

  test('should return first run start value', () => {
    const string = {
      string: '',
      runs: [
        { start: 2, end: 5, attributes: {} },
        { start: 5, end: 8, attributes: {} },
      ],
    };
    expect(start(string)).toBe(2);
  });
});
