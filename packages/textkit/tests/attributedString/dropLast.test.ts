import { describe, expect, test } from 'vitest';

import pluck from '../internal/pluck';
import dropLast from '../../src/attributedString/dropLast';
import { Glyph } from '../../src/types';

describe('attributeString dropLast operator', () => {
  test('should dropLast with one run', () => {
    const runs = [{ start: 0, end: 11, attributes: { font: [] } }];
    const string = { string: 'Lorem ipsum', runs };
    const result = dropLast(string);

    expect(result.string).toBe('Lorem ipsu');
    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 10);
    expect(result.runs[0]).toHaveProperty('attributes', { font: [] });
  });

  test('should dropLast with two runs', () => {
    const string = {
      string: 'Lorem ipsum',
      runs: [
        { start: 0, end: 6, attributes: { font: [] } },
        { start: 6, end: 11, attributes: { fontSize: 16 } },
      ],
    };
    const splittedString = dropLast(string);

    expect(splittedString.string).toBe('Lorem ipsu');
    expect(splittedString.runs[0]).toHaveProperty('start', 0);
    expect(splittedString.runs[0]).toHaveProperty('end', 6);
    expect(splittedString.runs[0]).toHaveProperty('attributes', { font: [] });
    expect(splittedString.runs[1]).toHaveProperty('start', 6);
    expect(splittedString.runs[1]).toHaveProperty('end', 10);
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
    const string = { string: 'Lorem ipsum', runs };
    const splittedString = dropLast(string);

    expect(splittedString.string).toBe('Lorem ipsu');
    expect(splittedString.runs[0]).toHaveProperty('start', 0);
    expect(splittedString.runs[0]).toHaveProperty('end', 3);
    expect(splittedString.runs[0]).toHaveProperty('attributes', { font: [] });
    expect(splittedString.runs[1]).toHaveProperty('start', 3);
    expect(splittedString.runs[1]).toHaveProperty('end', 6);
    expect(splittedString.runs[1]).toHaveProperty('attributes', {
      fontSize: 16,
    });
    expect(splittedString.runs[2]).toHaveProperty('start', 6);
    expect(splittedString.runs[2]).toHaveProperty('end', 10);
    expect(splittedString.runs[2]).toHaveProperty('attributes', {
      fontSize: 20,
    });
  });

  test('should dropLast glyphs with one run', () => {
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
