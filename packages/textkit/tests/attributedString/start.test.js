import { describe, expect, test } from '@jest/globals';

import empty from '../../src/attributedString/empty';
import start from '../../src/attributedString/start';

describe('attributeString start operator', () => {
  test('should return 0 for empty string', () => {
    expect(start(empty())).toBe(0);
  });

  test('should return first run start value', () => {
    const string = {
      string: '',
      runs: [
        { start: 2, end: 5 },
        { start: 5, end: 8 },
      ],
    };
    expect(start(string)).toBe(2);
  });
});
