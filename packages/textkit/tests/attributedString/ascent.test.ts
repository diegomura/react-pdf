import { describe, expect, test } from 'vitest';

import empty from '../../src/attributedString/empty';
import ascent from '../../src/attributedString/ascent';
import { Font } from '../../src/types';

const font = { ascent: 10, unitsPerEm: 2 } as Font;

describe('attributeString ascent operator', () => {
  test('should return 0 for empty string', () => {
    expect(ascent(empty())).toBe(0);
  });

  test('should return 0 if runs dont have font', () => {
    const string = {
      string: '',
      attributes: {},
      runs: [
        { start: 2, end: 5, attributes: {} },
        { start: 5, end: 8, attributes: {} },
      ],
    };

    expect(ascent(string)).toBe(0);
  });

  test('should return ascent for single run', () => {
    const runs = [
      { start: 0, end: 5, attributes: { fontSize: 10, font: [font] } }, // 50
    ];
    const string = { string: '', runs };

    expect(ascent(string)).toBe(50);
  });

  test('should max runs ascent', () => {
    const runs = [
      { start: 2, end: 4, attributes: { fontSize: 10, font: [font] } }, // 50
      { start: 4, end: 6, attributes: { fontSize: 12, font: [font] } }, // 60
    ];
    const string = { string: '', runs };

    expect(ascent(string)).toBe(60);
  });

  test('should sum up runs ascent with attachments', () => {
    const runs = [
      { start: 4, end: 6, attributes: { fontSize: 12, font: [font] } }, // 60
      {
        start: 2,
        end: 4,
        attributes: {
          fontSize: 10,
          font: [font],
          attachment: { width: 70, height: 70, image: Buffer.from('') },
        },
      }, // 70
    ];
    const string = { string: '', runs };

    expect(ascent(string)).toBe(70);
  });
});
