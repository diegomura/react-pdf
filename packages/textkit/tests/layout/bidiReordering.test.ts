import { describe, test, expect } from 'vitest';

import bidiReordering from '../../src/layout/bidiReordering';
import { Glyph } from '../../src/types';

const bidiReorderingInstance = bidiReordering();

const initializeToIndex = (size: number) => {
  const arr = new Array(size);
  for (let i = 0; i < size; i += 1) {
    arr[i] = i;
  }
  return arr;
};

const createPositions = (size: number) =>
  new Array(size).fill(null).map(() => ({
    xAdvance: 0,
    yAdvance: 0,
    xOffset: 0,
    yOffset: 0,
  }));

describe('bidiReordering', () => {
  test('should return reversed string', () => {
    const word = 'Lorem';
    const wordReversed = word.split('').reverse().join('');
    const string = {
      string: word,
      runs: [
        {
          attributes: {
            direction: 'rtl' as const,
            bidiLevel: 1,
          },
          start: 0,
          end: 5,
          glyphs: initializeToIndex(5),
          positions: initializeToIndex(5),
          stringIndices: initializeToIndex(5),
          glyphIndices: initializeToIndex(5),
        },
      ],
    };
    const result = bidiReorderingInstance([[string]]);
    expect(result[0][0].string).toBe(wordReversed);
    expect(result[0][0].runs[0].glyphs).toEqual(
      string.runs[0].glyphs.reverse(),
    );
    expect(result[0][0].runs[0].positions).toEqual(
      string.runs[0].positions.reverse(),
    );
  });

  test('should return normal string for direction ltr', () => {
    const word = 'Lorem';
    const string = {
      string: word,
      runs: [
        {
          attributes: {
            direction: 'ltr' as const,
            bidiLevel: 0,
          },
          start: 0,
          end: 5,
          glyphs: initializeToIndex(word.length),
          positions: initializeToIndex(word.length),
          stringIndices: initializeToIndex(word.length),
          glyphIndices: initializeToIndex(word.length),
        },
      ],
    };
    const result = bidiReorderingInstance([[string]]);
    expect(result[0][0].string).toBe(word);
    expect(result[0][0].runs[0].glyphs).toEqual(string.runs[0].glyphs);
    expect(result[0][0].runs[0].positions).toEqual(string.runs[0].positions);
  });

  test('should return part of the string reversed', () => {
    const string = {
      string: 'Lorem ipsum',
      runs: [
        {
          attributes: {
            direction: 'ltr' as const,
            bidiLevel: 0,
          },
          start: 0,
          end: 6,
          glyphs: initializeToIndex(6),
          positions: initializeToIndex(6),
          stringIndices: initializeToIndex(6),
          glyphIndices: initializeToIndex(6),
        },
        {
          attributes: {
            direction: 'rtl' as const,
            bidiLevel: 1,
          },
          start: 6,
          end: 11,
          glyphs: initializeToIndex(5),
          positions: initializeToIndex(5),
          stringIndices: initializeToIndex(5),
          glyphIndices: initializeToIndex(5),
        },
      ],
    };
    const result = bidiReorderingInstance([[string]]);

    expect(result[0][0].string).toBe('Lorem muspi');
    expect(result[0][0].runs[0].glyphs).toEqual(string.runs[0].glyphs);
    expect(result[0][0].runs[0].positions).toEqual(string.runs[0].positions);

    expect(result[0][0].runs[1].glyphs).toEqual(
      string.runs[1].glyphs.reverse(),
    );
    expect(result[0][0].runs[1].positions).toEqual(
      string.runs[1].positions.reverse(),
    );
  });

  test('should return string reversed not repeating ligatures characters', () => {
    const string = {
      string: 'Lore',
      runs: [
        {
          attributes: {
            direction: 'rtl' as const,
            bidiLevel: 1,
          },
          start: 0,
          end: 4,
          glyphs: [
            { id: 0, advanceWidth: 10, codePoints: [0], isLigature: true },
            { id: 0, advanceWidth: 10, codePoints: [0], isLigature: true },
            { id: 0, advanceWidth: 10, codePoints: [0], isLigature: true },
            { id: 0, advanceWidth: 10, codePoints: [0], isLigature: true },
          ] as Glyph[],
          positions: [
            { xAdvance: 0, yAdvance: 0, xOffset: 0, yOffset: 0 },
            { xAdvance: 0, yAdvance: 0, xOffset: 0, yOffset: 0 },
            { xAdvance: 0, yAdvance: 0, xOffset: 0, yOffset: 0 },
            { xAdvance: 0, yAdvance: 0, xOffset: 0, yOffset: 0 },
          ],
          stringIndices: initializeToIndex(4),
          glyphIndices: initializeToIndex(4),
        },
      ],
    };

    const result = bidiReorderingInstance([[string]]);

    expect(result[0][0].string).toBe('eroL');
  });

  test('should keep repeated ligature glyph ids from different clusters', () => {
    const string = {
      string: 'abcdef',
      runs: [
        {
          attributes: {
            direction: 'rtl' as const,
            bidiLevel: 1,
          },
          start: 0,
          end: 6,
          glyphs: [
            { id: 1, advanceWidth: 10, codePoints: [0x61] },
            {
              id: 9,
              advanceWidth: 10,
              codePoints: [0x62, 0x63],
              isLigature: true,
            },
            { id: 2, advanceWidth: 10, codePoints: [0x64] },
            {
              id: 9,
              advanceWidth: 10,
              codePoints: [0x65, 0x66],
              isLigature: true,
            },
          ] as Glyph[],
          positions: createPositions(4),
          stringIndices: [0, 1, 1, 2, 3, 3],
          glyphIndices: [0, 1, 3, 4],
        },
      ],
    };

    const result = bidiReorderingInstance([[string]]);
    const run = result[0][0].runs[0];

    expect(result[0][0].string).toBe('fedcba');
    expect(run.glyphs!.map((glyph) => glyph.id)).toEqual([9, 2, 9, 1]);
    expect(run.stringIndices).toEqual([0, 0, 1, 2, 2, 3]);
    expect(run.glyphIndices).toEqual([0, 2, 3, 5]);
  });

  test('should keep ligature clusters in their owning run after mixed bidi reordering', () => {
    const string = {
      string: 'الشركة (saudi)',
      runs: [
        {
          attributes: {
            direction: 'rtl' as const,
            bidiLevel: 1,
          },
          start: 0,
          end: 8,
          glyphs: [
            { id: 1, advanceWidth: 10, codePoints: [0x627] },
            { id: 2, advanceWidth: 10, codePoints: [0x644] },
            {
              id: 29,
              advanceWidth: 10,
              codePoints: [0x634, 0x631],
              isLigature: true,
            },
            { id: 4, advanceWidth: 10, codePoints: [0x643] },
            { id: 5, advanceWidth: 10, codePoints: [0x629] },
            { id: 6, advanceWidth: 10, codePoints: [0x20] },
            { id: 7, advanceWidth: 10, codePoints: [0x28] },
          ] as Glyph[],
          positions: createPositions(7),
          stringIndices: [0, 1, 2, 2, 3, 4, 5, 6],
          glyphIndices: [0, 1, 2, 4, 5, 6, 7],
        },
        {
          attributes: {
            direction: 'rtl' as const,
            bidiLevel: 2,
          },
          start: 8,
          end: 13,
          glyphs: [
            { id: 8, advanceWidth: 10, codePoints: [0x73] },
            { id: 9, advanceWidth: 10, codePoints: [0x61] },
            { id: 10, advanceWidth: 10, codePoints: [0x75] },
            { id: 11, advanceWidth: 10, codePoints: [0x64] },
            { id: 12, advanceWidth: 10, codePoints: [0x69] },
          ] as Glyph[],
          positions: createPositions(5),
          stringIndices: initializeToIndex(5),
          glyphIndices: initializeToIndex(5),
        },
        {
          attributes: {
            direction: 'rtl' as const,
            bidiLevel: 1,
          },
          start: 13,
          end: 14,
          glyphs: [
            { id: 13, advanceWidth: 10, codePoints: [0x29] },
          ] as Glyph[],
          positions: createPositions(1),
          stringIndices: [0],
          glyphIndices: [0],
        },
      ],
    };

    const result = bidiReorderingInstance([[string]]);
    const line = result[0][0];

    expect(line.string).toBe('(saudi) ةكرشلا');
    expect(
      line.runs.map((run) => line.string.slice(run.start, run.end)),
    ).toEqual(['(', 'saudi', ') ةكرشلا']);
    expect(line.runs[2].glyphs!.map((glyph) => glyph.id)).toEqual([
      7, 6, 5, 4, 29, 2, 1,
    ]);
    expect(line.runs[2].stringIndices).toEqual([0, 1, 2, 3, 4, 4, 5, 6]);
  });
});
