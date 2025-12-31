import { describe, expect, test } from 'vitest';

import font from '../internal/font';
import pluck from '../internal/pluck';
import slice from '../../src/attributedString/slice';
import { Glyph } from '../../src/types';
import empty from '../../src/attributedString/empty';

const testString = 'Lorem ipsum';
const testRuns = [
  { start: 0, end: 6, attributes: { font: [] } },
  { start: 6, end: 11, attributes: { fontSize: 16 } },
];

describe('attributeString slice operator', () => {
  test('should return same attributed string when empty', () => {
    const string = empty();
    const sliced = slice(0, 0, string);

    expect(sliced).toBe(string);
  });

  test('should slice from start of string', () => {
    const string = { string: testString, runs: testRuns };
    const sliced = slice(0, 5, string);

    expect(sliced.string).toBe('Lorem');
    expect(sliced.runs.length).toBe(1);
    expect(sliced.runs[0]).toHaveProperty('start', 0);
    expect(sliced.runs[0]).toHaveProperty('end', 5);
    expect(sliced.runs[0]).toHaveProperty('attributes', { font: [] });
  });

  test('should slice to end of string', () => {
    const string = { string: testString, runs: testRuns };
    const sliced = slice(6, 11, string);

    expect(sliced.string).toBe('ipsum');
    expect(sliced.runs.length).toBe(1);
    expect(sliced.runs[0]).toHaveProperty('start', 0);
    expect(sliced.runs[0]).toHaveProperty('end', 5);
    expect(sliced.runs[0]).toHaveProperty('attributes', { fontSize: 16 });
  });

  test('should slice entire string', () => {
    const string = { string: testString, runs: testRuns };
    const sliced = slice(0, 11, string);

    expect(sliced.string).toBe('Lorem ipsum');
    expect(sliced.runs.length).toBe(2);
    expect(sliced.runs[0]).toHaveProperty('start', 0);
    expect(sliced.runs[0]).toHaveProperty('end', 6);
    expect(sliced.runs[0]).toHaveProperty('attributes', { font: [] });
    expect(sliced.runs[1]).toHaveProperty('start', 6);
    expect(sliced.runs[1]).toHaveProperty('end', 11);
    expect(sliced.runs[1]).toHaveProperty('attributes', { fontSize: 16 });
  });

  test('should return empty string when start equals end', () => {
    const string = { string: testString, runs: testRuns };
    const sliced = slice(5, 5, string);

    expect(sliced.string).toBe('');
  });

  test('should slice with one run', () => {
    const runs = [{ start: 0, end: 11, attributes: { font: [] } }];
    const string = { string: testString, runs };
    const sliced = slice(2, 8, string);

    expect(sliced.string).toBe('rem ip');
    expect(sliced.runs[0]).toHaveProperty('start', 0);
    expect(sliced.runs[0]).toHaveProperty('end', 6);
    expect(sliced.runs[0]).toHaveProperty('attributes', { font: [] });
  });

  test('should slice with two runs', () => {
    const string = { string: testString, runs: testRuns };
    const splittedString = slice(2, 8, string);

    expect(splittedString.string).toBe('rem ip');
    expect(splittedString.runs[0]).toHaveProperty('start', 0);
    expect(splittedString.runs[0]).toHaveProperty('end', 4);
    expect(splittedString.runs[0]).toHaveProperty('attributes', { font: [] });
    expect(splittedString.runs[1]).toHaveProperty('start', 4);
    expect(splittedString.runs[1]).toHaveProperty('end', 6);
    expect(splittedString.runs[1]).toHaveProperty('attributes', {
      fontSize: 16,
    });
  });

  test('should slice with several runs', () => {
    const runs = [
      { start: 0, end: 3, attributes: { font: [] } },
      { start: 3, end: 6, attributes: { fontSize: 16 } },
      { start: 6, end: 11, attributes: { fontSize: 20 } },
    ];
    const string = { string: testString, runs };
    const splittedString = slice(2, 8, string);

    expect(splittedString.string).toBe('rem ip');
    expect(splittedString.runs[0]).toHaveProperty('start', 0);
    expect(splittedString.runs[0]).toHaveProperty('end', 1);
    expect(splittedString.runs[0]).toHaveProperty('attributes', { font: [] });
    expect(splittedString.runs[1]).toHaveProperty('start', 1);
    expect(splittedString.runs[1]).toHaveProperty('end', 4);
    expect(splittedString.runs[1]).toHaveProperty('attributes', {
      fontSize: 16,
    });
    expect(splittedString.runs[2]).toHaveProperty('start', 4);
    expect(splittedString.runs[2]).toHaveProperty('end', 6);
    expect(splittedString.runs[2]).toHaveProperty('attributes', {
      fontSize: 20,
    });
  });

  test('should ignore unnecesary leading runs when slice', () => {
    const string = { string: testString, runs: testRuns };
    const splittedString = slice(6, 11, string);

    expect(splittedString.runs.length).toBe(1);
    expect(splittedString.string).toBe('ipsum');
    expect(splittedString.runs[0]).toHaveProperty('start', 0);
    expect(splittedString.runs[0]).toHaveProperty('end', 5);
    expect(splittedString.runs[0]).toHaveProperty('attributes', {
      fontSize: 16,
    });
  });

  test('should ignore unnecesary trailing runs when slice', () => {
    const string = { string: testString, runs: testRuns };
    const splittedString = slice(1, 6, string);

    expect(splittedString.runs.length).toBe(1);
    expect(splittedString.string).toBe('orem ');
    expect(splittedString.runs[0]).toHaveProperty('start', 0);
    expect(splittedString.runs[0]).toHaveProperty('end', 5);
    expect(splittedString.runs[0]).toHaveProperty('attributes', { font: [] });
  });

  test('should slice glyphs when one run', () => {
    const runs = [
      {
        start: 0,
        end: 5,
        attributes: {},
        glyphs: [
          { id: 76, advanceWidth: 0, codePoints: [76] }, // L
          { id: 111, advanceWidth: 0, codePoints: [111] }, // o
          { id: 114, advanceWidth: 0, codePoints: [114] }, // r
          { id: 101, advanceWidth: 0, codePoints: [101] }, // e
          { id: 109, advanceWidth: 0, codePoints: [109] }, // m
        ] as Glyph[],
        positions: [
          { xAdvance: 6, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 7, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 8, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 9, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 10, yAdvance: 0, xOffset: 0, yOffset: 0 },
        ],
        glyphIndices: [0, 1, 2, 3, 4],
      },
    ];

    const string = { string: 'Lorem', runs, sylables: [] };
    const sliced = slice(1, 4, string);

    expect(sliced.runs[0].glyphIndices).toEqual([0, 1, 2]);
    expect(pluck('id', sliced.runs[0].glyphs!)).toEqual([111, 114, 101]);
    expect(pluck('xAdvance', sliced.runs[0].positions!)).toEqual([7, 8, 9]);
  });

  test('should slice glyphs with several runs', () => {
    const runs = [
      {
        start: 0,
        end: 3,
        attributes: {},
        glyphs: [
          { id: 76, advanceWidth: 0, codePoints: [76] }, // L
          { id: 111, advanceWidth: 0, codePoints: [111] }, // o
          { id: 114, advanceWidth: 0, codePoints: [114] }, // r
        ] as Glyph[],
        positions: [
          { xAdvance: 6, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 7, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 8, yAdvance: 0, xOffset: 0, yOffset: 0 },
        ],
        glyphIndices: [0, 1, 2],
      },
      {
        start: 3,
        end: 5,
        attributes: {},
        glyphs: [
          { id: 101, advanceWidth: 0, codePoints: [101] }, // e
          { id: 109, advanceWidth: 0, codePoints: [109] }, // m
        ] as Glyph[],
        positions: [
          { xAdvance: 9, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 10, yAdvance: 0, xOffset: 0, yOffset: 0 },
        ],
        glyphIndices: [0, 1],
      },
    ];
    const string = { string: 'Lorem', runs };
    const sliced = slice(1, 4, string);

    expect(sliced.runs[0].glyphIndices).toEqual([0, 1]);
    expect(pluck('id', sliced.runs[0].glyphs!)).toEqual([111, 114]);
    expect(pluck('xAdvance', sliced.runs[0].positions!)).toEqual([7, 8]);

    expect(sliced.runs[1].glyphIndices).toEqual([0]);
    expect(pluck('id', sliced.runs[1].glyphs!)).toEqual([101]);
    expect(pluck('xAdvance', sliced.runs[1].positions!)).toEqual([9]);
  });

  test('should slice glyphs ending on ligature', () => {
    const runs = [
      {
        start: 0,
        end: 5,
        glyphs: [
          { id: 76, advanceWidth: 0, codePoints: [76] }, // L
          { id: 111, advanceWidth: 0, codePoints: [111] }, // o
          { id: 64257, advanceWidth: 0, codePoints: [102, 105] }, // fi
          { id: 109, advanceWidth: 0, codePoints: [109] }, // m
        ] as Glyph[],
        positions: [
          { xAdvance: 6, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 7, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 10, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 9, yAdvance: 0, xOffset: 0, yOffset: 0 },
        ],
        glyphIndices: [0, 1, 2, 2, 3],
        attributes: { font: [font], fontSize: 2 },
      },
    ];

    const string = { string: 'Lofim', runs, sylables: [] };
    const sliced = slice(1, 3, string);

    expect(sliced).toHaveProperty('string', 'of');
    expect(sliced.runs[0].glyphIndices).toEqual([0, 1]);
    expect(pluck('id', sliced.runs[0].glyphs!)).toEqual([111, 102]);
    expect(pluck('xAdvance', sliced.runs[0].positions!)).toEqual([7, 8]);
  });

  test('should slice glyphs starting on ligature', () => {
    const runs = [
      {
        start: 0,
        end: 5,
        glyphs: [
          { id: 76, advanceWidth: 0, codePoints: [76] }, // L
          { id: 111, advanceWidth: 0, codePoints: [111] }, // o
          { id: 64257, advanceWidth: 0, codePoints: [102, 105] }, // fi
          { id: 109, advanceWidth: 0, codePoints: [109] }, // m
        ] as Glyph[],
        positions: [
          { xAdvance: 6, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 7, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 10, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 9, yAdvance: 0, xOffset: 0, yOffset: 0 },
        ],
        glyphIndices: [0, 1, 2, 2, 3],
        attributes: { font: [font], fontSize: 2 },
      },
    ];

    const string = { string: 'Lofim', runs, sylables: [] };
    const sliced = slice(3, 5, string);

    expect(sliced).toHaveProperty('string', 'im');
    expect(sliced.runs[0].glyphIndices).toEqual([0, 1]);
    expect(pluck('id', sliced.runs[0].glyphs!)).toEqual([105, 109]);
    expect(pluck('xAdvance', sliced.runs[0].positions!)).toEqual([8, 9]);
  });
});
