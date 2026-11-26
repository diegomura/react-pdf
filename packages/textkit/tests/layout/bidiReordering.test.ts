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
    expect(result[0][0].runs[0].glyphs).toEqual(initializeToIndex(6));
    expect(result[0][0].runs[0].positions).toEqual(initializeToIndex(6));

    expect(result[0][0].runs[1].glyphs).toEqual(initializeToIndex(5).reverse());
    expect(result[0][0].runs[1].positions).toEqual(
      initializeToIndex(5).reverse(),
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

  test('should preserve run attributes when reordering multiple RTL runs', () => {
    // <Text style={{ direction: 'rtl' }}>ABC <Text style={{ color: 'red' }}>DEF</Text> GHI</Text>
    const string = {
      string: 'ABC DEF GHI',
      runs: [
        {
          attributes: {
            direction: 'rtl' as const,
            bidiLevel: 1,
            color: 'black',
          },
          start: 0,
          end: 4,
          glyphs: initializeToIndex(4),
          positions: initializeToIndex(4),
        },
        {
          attributes: { direction: 'rtl' as const, bidiLevel: 1, color: 'red' },
          start: 4,
          end: 7,
          glyphs: initializeToIndex(3),
          positions: initializeToIndex(3),
        },
        {
          attributes: {
            direction: 'rtl' as const,
            bidiLevel: 1,
            color: 'black',
          },
          start: 7,
          end: 11,
          glyphs: initializeToIndex(4),
          positions: initializeToIndex(4),
        },
      ],
    };

    const result = bidiReorderingInstance([[string]]);

    expect(result[0][0].string).toBe('IHG FED CBA');

    expect(result[0][0].runs[0].attributes.color).toBe('black');
    expect(result[0][0].runs[0].start).toBe(0);
    expect(result[0][0].runs[0].end).toBe(4);
    expect(result[0][0].runs[0].glyphs).toEqual(initializeToIndex(4).reverse());

    expect(result[0][0].runs[1].attributes.color).toBe('red');
    expect(result[0][0].runs[1].start).toBe(4);
    expect(result[0][0].runs[1].end).toBe(7);
    expect(result[0][0].runs[1].glyphs).toEqual(initializeToIndex(3).reverse());

    expect(result[0][0].runs[2].attributes.color).toBe('black');
    expect(result[0][0].runs[2].start).toBe(7);
    expect(result[0][0].runs[2].end).toBe(11);
    expect(result[0][0].runs[2].glyphs).toEqual(initializeToIndex(4).reverse());
  });

  test('should reorder ltr runs embedded in rtl ones', () => {
    // <Text style={{ direction: 'rtl' }}>AAA Hello BBB</Text>
    const string = {
      string: 'AAA Hello BBB',
      runs: [
        {
          attributes: { direction: 'rtl' as const, bidiLevel: 1 },
          start: 0,
          end: 4,
          glyphs: initializeToIndex(4),
          positions: initializeToIndex(4),
        },
        {
          attributes: { direction: 'ltr' as const, bidiLevel: 2 },
          start: 4,
          end: 9,
          glyphs: initializeToIndex(5),
          positions: initializeToIndex(5),
        },
        {
          attributes: { direction: 'rtl' as const, bidiLevel: 1 },
          start: 9,
          end: 13,
          glyphs: initializeToIndex(4),
          positions: initializeToIndex(4),
        },
      ],
    };

    const result = bidiReorderingInstance([[string]]);

    expect(result[0][0].string).toBe('BBB Hello AAA');
    expect(result[0][0].runs[0].glyphs).toEqual(initializeToIndex(4).reverse());
    expect(result[0][0].runs[1].glyphs).toEqual(initializeToIndex(5));
    expect(result[0][0].runs[2].glyphs).toEqual(initializeToIndex(4).reverse());
  });
});
