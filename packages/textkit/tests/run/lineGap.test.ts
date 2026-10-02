import { describe, expect, test } from 'vitest';

import lineGap from '../../src/run/lineGap';
import { Font } from '../../src/types';

describe('run lineGap operator', () => {
  test('should return 0 if font not present', () => {
    const run = { start: 0, end: 0, attributes: { fontSize: 12 } };

    expect(lineGap(run)).toBe(0);
  });

  test('should return 0 if fontSize not present', () => {
    const run = {
      start: 0,
      end: 0,
      attributes: { font: [{ unitsPerEm: 2 } as Font] },
    };

    expect(lineGap(run)).toBe(0);
  });

  test('should return 0 if unknown font unitsPerEm', () => {
    const font = { descent: 10 } as Font;

    const run = {
      start: 0,
      end: 0,
      attributes: { fontSize: 12, font: [font] },
    };

    expect(lineGap(run)).toBe(0);
  });

  test('should return 0 if unknown font decent', () => {
    const run = {
      start: 0,
      end: 0,
      attributes: { fontSize: 12, font: [{ unitsPerEm: 2 } as Font] },
    };

    expect(lineGap(run)).toBe(0);
  });

  test('should return correct font lineGap', () => {
    const run = {
      start: 0,
      end: 0,
      attributes: {
        fontSize: 12,
        font: [{ lineGap: 10, unitsPerEm: 2 } as Font],
      },
    };

    expect(lineGap(run)).toBe((10 * 12) / 2);
  });

  test('should prefer OS/2 typoLineGap over hhea lineGap', () => {
    const run = {
      start: 0,
      end: 0,
      attributes: {
        fontSize: 12,
        font: [
          {
            lineGap: 200,
            unitsPerEm: 1000,
            'OS/2': {
              typoAscender: 800,
              typoDescender: -200,
              typoLineGap: 0,
            },
          } as unknown as Font,
        ],
      },
    };

    expect(lineGap(run)).toBe(0);
  });
});
