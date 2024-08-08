import { describe, expect, test } from 'vitest';

import bidi from '../../src/engines/bidi';

const bidiInstance = bidi({});

describe('Bidi', () => {
  test('should return string with correct bidi level for ltr', () => {
    const result = bidiInstance({
      string: 'English عربي English עִברִית فارسی 1234 English عربي ١٢٣٤٥',
      runs: [
        {
          attributes: {
            direction: 'ltr',
          },
        },
      ],
    });
    expect(result.runs.length).toBe(8);
    expect(result.runs[0].attributes.bidiLevel).toBe(0);
    expect(result.runs[1].attributes.bidiLevel).toBe(1);
    expect(result.runs[2].attributes.bidiLevel).toBe(0);
    expect(result.runs[3].attributes.bidiLevel).toBe(1);
    expect(result.runs[4].attributes.bidiLevel).toBe(2);
    expect(result.runs[5].attributes.bidiLevel).toBe(0);
    expect(result.runs[6].attributes.bidiLevel).toBe(1);
    expect(result.runs[7].attributes.bidiLevel).toBe(2);
  });

  test('should return string with correct bidi level for rtl', () => {
    const result = bidiInstance({
      string: 'English عربي English עִברִית فارسی 1234 English عربي ١٢٣٤٥',
      runs: [
        {
          attributes: {
            direction: 'rtl',
          },
        },
      ],
    });
    expect(result.runs.length).toBe(9);
    expect(result.runs[0].attributes.bidiLevel).toBe(2);
    expect(result.runs[1].attributes.bidiLevel).toBe(1);
    expect(result.runs[2].attributes.bidiLevel).toBe(2);
    expect(result.runs[3].attributes.bidiLevel).toBe(1);
    expect(result.runs[4].attributes.bidiLevel).toBe(2);
    expect(result.runs[5].attributes.bidiLevel).toBe(1);
    expect(result.runs[6].attributes.bidiLevel).toBe(2);
    expect(result.runs[7].attributes.bidiLevel).toBe(1);
    expect(result.runs[8].attributes.bidiLevel).toBe(2);
  });
});
