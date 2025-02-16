import { describe, expect, test } from 'vitest';

import empty from '../../src/attributedString/empty';
import descent from '../../src/attributedString/descent';

const font = { descent: -10, unitsPerEm: 2 };

describe('attributeString descent operator', () => {
  test('should return 0 for empty string', () => {
    expect(descent(empty())).toBe(0);
  });

  test('should return 0 if runs dont have font', () => {
    const string = {
      string: '',
      runs: [
        { start: 2, end: 5, attributes: {} },
        { start: 5, end: 8, attributes: {} },
      ],
    };

    expect(descent(string)).toBe(0);
  });

  test('should return min runs descent', () => {
    const runs = [
      { start: 2, end: 4, attributes: { fontSize: 10, font } }, // -50
      { start: 4, end: 6, attributes: { fontSize: 12, font } }, // -60
    ];
    const string = { string: '', runs };

    expect(descent(string)).toBe(-60);
  });
});
