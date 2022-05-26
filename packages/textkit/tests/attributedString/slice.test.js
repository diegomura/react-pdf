import * as R from 'ramda';

import font from '../internal/font';
import slice from '../../src/attributedString/slice';

const testString = 'Lorem ipsum';
const testRuns = [
  { start: 0, end: 6, attributes: { attr: 1 } },
  { start: 6, end: 11, attributes: { attr: 2 } },
];

describe('attributeString slice operator', () => {
  test('should slice with one run', () => {
    const runs = [{ start: 0, end: 11, attributes: { attr: 1 } }];
    const string = { string: testString, runs };
    const sliced = slice(2, 8, string);

    expect(sliced.string).toBe('rem ip');
    expect(sliced.runs[0]).toHaveProperty('start', 0);
    expect(sliced.runs[0]).toHaveProperty('end', 6);
    expect(sliced.runs[0]).toHaveProperty('attributes', { attr: 1 });
  });

  test('should slice with two runs', () => {
    const string = { string: testString, runs: testRuns };
    const splittedString = slice(2, 8, string);

    expect(splittedString.string).toBe('rem ip');
    expect(splittedString.runs[0]).toHaveProperty('start', 0);
    expect(splittedString.runs[0]).toHaveProperty('end', 4);
    expect(splittedString.runs[0]).toHaveProperty('attributes', { attr: 1 });
    expect(splittedString.runs[1]).toHaveProperty('start', 4);
    expect(splittedString.runs[1]).toHaveProperty('end', 6);
    expect(splittedString.runs[1]).toHaveProperty('attributes', { attr: 2 });
  });

  test('should slice with several runs', () => {
    const runs = [
      { start: 0, end: 3, attributes: { attr: 1 } },
      { start: 3, end: 6, attributes: { attr: 2 } },
      { start: 6, end: 11, attributes: { attr: 3 } },
    ];
    const string = { string: testString, runs };
    const splittedString = slice(2, 8, string);

    expect(splittedString.string).toBe('rem ip');
    expect(splittedString.runs[0]).toHaveProperty('start', 0);
    expect(splittedString.runs[0]).toHaveProperty('end', 1);
    expect(splittedString.runs[0]).toHaveProperty('attributes', { attr: 1 });
    expect(splittedString.runs[1]).toHaveProperty('start', 1);
    expect(splittedString.runs[1]).toHaveProperty('end', 4);
    expect(splittedString.runs[1]).toHaveProperty('attributes', { attr: 2 });
    expect(splittedString.runs[2]).toHaveProperty('start', 4);
    expect(splittedString.runs[2]).toHaveProperty('end', 6);
    expect(splittedString.runs[2]).toHaveProperty('attributes', { attr: 3 });
  });

  test('should ignore unnecesary leading runs when slice', () => {
    const string = { string: testString, runs: testRuns };
    const splittedString = slice(6, 11, string);

    expect(splittedString.runs.length).toBe(1);
    expect(splittedString.string).toBe('ipsum');
    expect(splittedString.runs[0]).toHaveProperty('start', 0);
    expect(splittedString.runs[0]).toHaveProperty('end', 5);
    expect(splittedString.runs[0]).toHaveProperty('attributes', { attr: 2 });
  });

  test('should ignore unnecesary trailing runs when slice', () => {
    const string = { string: testString, runs: testRuns };
    const splittedString = slice(1, 6, string);

    expect(splittedString.runs.length).toBe(1);
    expect(splittedString.string).toBe('orem ');
    expect(splittedString.runs[0]).toHaveProperty('start', 0);
    expect(splittedString.runs[0]).toHaveProperty('end', 5);
    expect(splittedString.runs[0]).toHaveProperty('attributes', { attr: 1 });
  });

  test('should slice glyphs when one run', () => {
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
    const sliced = slice(1, 4, string);

    expect(sliced.runs[0].glyphIndices).toEqual([0, 1, 2]);
    expect(R.pluck('id', sliced.runs[0].glyphs)).toEqual([111, 114, 101]);
    expect(R.pluck('xAdvance', sliced.runs[0].positions)).toEqual([7, 8, 9]);
  });

  test('should slice glyphs with several runs', () => {
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
    const sliced = slice(1, 4, string);

    expect(sliced.runs[0].glyphIndices).toEqual([0, 1]);
    expect(R.pluck('id', sliced.runs[0].glyphs)).toEqual([111, 114]);
    expect(R.pluck('xAdvance', sliced.runs[0].positions)).toEqual([7, 8]);

    expect(sliced.runs[1].glyphIndices).toEqual([0]);
    expect(R.pluck('id', sliced.runs[1].glyphs)).toEqual([101]);
    expect(R.pluck('xAdvance', sliced.runs[1].positions)).toEqual([9]);
  });

  test('should slice glyphs ending on ligature', () => {
    const runs = [
      {
        start: 0,
        end: 5,
        glyphs: [
          { id: 76, codePoints: [76] }, // L
          { id: 111, codePoints: [111] }, // o
          { id: 64257, codePoints: [102, 105] }, // fi
          { id: 109, codePoints: [109] }, // m
        ],
        positions: [
          { xAdvance: 6 },
          { xAdvance: 7 },
          { xAdvance: 10 },
          { xAdvance: 9 },
        ],
        glyphIndices: [0, 1, 2, 2, 3],
        attributes: { font, fontSize: 2 },
      },
    ];

    const string = { string: 'Lofim', runs, sylables: [] };
    const sliced = slice(1, 3, string);

    expect(sliced).toHaveProperty('string', 'of');
    expect(sliced.runs[0].glyphIndices).toEqual([0, 1]);
    expect(R.pluck('id', sliced.runs[0].glyphs)).toEqual([111, 102]);
    expect(R.pluck('xAdvance', sliced.runs[0].positions)).toEqual([7, 8]);
  });

  test('should slice glyphs starting on ligature', () => {
    const runs = [
      {
        start: 0,
        end: 5,
        glyphs: [
          { id: 76, codePoints: [76] }, // L
          { id: 111, codePoints: [111] }, // o
          { id: 64257, codePoints: [102, 105] }, // fi
          { id: 109, codePoints: [109] }, // m
        ],
        positions: [
          { xAdvance: 6 },
          { xAdvance: 7 },
          { xAdvance: 10 },
          { xAdvance: 9 },
        ],
        glyphIndices: [0, 1, 2, 2, 3],
        attributes: { font, fontSize: 2 },
      },
    ];

    const string = { string: 'Lofim', runs, sylables: [] };
    const sliced = slice(3, 5, string);

    expect(sliced).toHaveProperty('string', 'im');
    expect(sliced.runs[0].glyphIndices).toEqual([0, 1]);
    expect(R.pluck('id', sliced.runs[0].glyphs)).toEqual([105, 109]);
    expect(R.pluck('xAdvance', sliced.runs[0].positions)).toEqual([8, 9]);
  });
});
