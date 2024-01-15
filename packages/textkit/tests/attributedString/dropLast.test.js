import { describe, expect, test } from 'vitest';

import pluck from '../internal/pluck';
import dropLast from '../../src/attributedString/dropLast';

describe('attributeString dropLast operator', () => {
  test('should dropLast with one run', () => {
    const runs = [{ start: 0, end: 11, attributes: { attr: 1 } }];
    const string = { string: 'Lorem ipsum', runs };
    const result = dropLast(string);

    expect(result.string).toBe('Lorem ipsu');
    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 10);
    expect(result.runs[0]).toHaveProperty('attributes', { attr: 1 });
  });

  test('should dropLast with two runs', () => {
    const string = {
      string: 'Lorem ipsum',
      runs: [
        { start: 0, end: 6, attributes: { attr: 1 } },
        { start: 6, end: 11, attributes: { attr: 2 } },
      ],
    };
    const splittedString = dropLast(string);

    expect(splittedString.string).toBe('Lorem ipsu');
    expect(splittedString.runs[0]).toHaveProperty('start', 0);
    expect(splittedString.runs[0]).toHaveProperty('end', 6);
    expect(splittedString.runs[0]).toHaveProperty('attributes', { attr: 1 });
    expect(splittedString.runs[1]).toHaveProperty('start', 6);
    expect(splittedString.runs[1]).toHaveProperty('end', 10);
    expect(splittedString.runs[1]).toHaveProperty('attributes', { attr: 2 });
  });

  test('should slice with several runs', () => {
    const runs = [
      { start: 0, end: 3, attributes: { attr: 1 } },
      { start: 3, end: 6, attributes: { attr: 2 } },
      { start: 6, end: 11, attributes: { attr: 3 } },
    ];
    const string = { string: 'Lorem ipsum', runs };
    const splittedString = dropLast(string);

    expect(splittedString.string).toBe('Lorem ipsu');
    expect(splittedString.runs[0]).toHaveProperty('start', 0);
    expect(splittedString.runs[0]).toHaveProperty('end', 3);
    expect(splittedString.runs[0]).toHaveProperty('attributes', { attr: 1 });
    expect(splittedString.runs[1]).toHaveProperty('start', 3);
    expect(splittedString.runs[1]).toHaveProperty('end', 6);
    expect(splittedString.runs[1]).toHaveProperty('attributes', { attr: 2 });
    expect(splittedString.runs[2]).toHaveProperty('start', 6);
    expect(splittedString.runs[2]).toHaveProperty('end', 10);
    expect(splittedString.runs[2]).toHaveProperty('attributes', { attr: 3 });
  });

  test('should dropLast glyphs with one run', () => {
    const runs = [
      {
        start: 0,
        end: 5,
        glyphs: [
          { id: 76, codePoints: [76] }, // L
          { id: 111, codePoints: [111] }, // o
          { id: 114, codePoints: [114] }, // r
          { id: 101, codePoints: [101] }, // e
          { id: 109, codePoints: [109] }, // m
        ],
        positions: [
          { xAdvance: 6 },
          { xAdvance: 7 },
          { xAdvance: 8 },
          { xAdvance: 9 },
          { xAdvance: 10 },
        ],
        glyphIndices: [0, 1, 2, 3, 4],
      },
    ];

    const string = { string: 'Lorem', runs, sylables: [] };
    const result = dropLast(string);

    expect(result.string).toBe('Lore');
    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 4);
    expect(result.runs[0].glyphIndices).toEqual([0, 1, 2, 3]);
    expect(pluck('id', result.runs[0].glyphs)).toEqual([76, 111, 114, 101]);
    expect(pluck('xAdvance', result.runs[0].positions)).toEqual([6, 7, 8, 9]);
  });

  test('should dropLast glyphs with several runs', () => {
    const runs = [
      {
        start: 0,
        end: 3,
        glyphs: [
          { id: 76, codePoints: [76] }, // L
          { id: 111, codePoints: [111] }, // o
          { id: 114, codePoints: [114] }, // r
        ],
        positions: [{ xAdvance: 6 }, { xAdvance: 7 }, { xAdvance: 8 }],
        glyphIndices: [0, 1, 2],
      },
      {
        start: 3,
        end: 5,
        glyphs: [
          { id: 101, codePoints: [101] }, // e
          { id: 109, codePoints: [109] }, // m
        ],
        positions: [{ xAdvance: 9 }, { xAdvance: 10 }],
        glyphIndices: [0, 1],
      },
    ];
    const string = { string: 'Lorem', runs };
    const result = dropLast(string);

    expect(result.string).toBe('Lore');

    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 3);
    expect(result.runs[0].glyphIndices).toEqual([0, 1, 2]);
    expect(pluck('id', result.runs[0].glyphs)).toEqual([76, 111, 114]);
    expect(pluck('xAdvance', result.runs[0].positions)).toEqual([6, 7, 8]);

    expect(result.runs[1]).toHaveProperty('start', 3);
    expect(result.runs[1]).toHaveProperty('end', 4);
    expect(result.runs[1].glyphIndices).toEqual([0]);
    expect(pluck('id', result.runs[1].glyphs)).toEqual([101]);
    expect(pluck('xAdvance', result.runs[1].positions)).toEqual([9]);
  });
});
