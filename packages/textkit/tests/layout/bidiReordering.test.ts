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
          glyphIndices: initializeToIndex(4),
        },
      ],
    };

    const result = bidiReorderingInstance([[string]]);

    expect(result[0][0].string).toBe('eroL');
  });

  test('should preserve run attributes when reordering multiple RTL runs', () => {
    // Simulates: <Text dir='rtl'>עברית <Text color='red'>קשה</Text> שפה</Text>
    // Run0: "ABC " (default style), Run1: "DEF" (red), Run2: " GHI" (default)
    // All RTL (bidiLevel 1). Runs should be reordered as units, not character-by-character.
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
          glyphIndices: initializeToIndex(4),
        },
        {
          attributes: {
            direction: 'rtl' as const,
            bidiLevel: 1,
            color: 'red',
          },
          start: 4,
          end: 7,
          glyphs: initializeToIndex(3),
          positions: initializeToIndex(3),
          glyphIndices: initializeToIndex(3),
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
          glyphIndices: initializeToIndex(4),
        },
      ],
    };

    const result = bidiReorderingInstance([[string]]);

    // Runs should be reordered: Run2, Run1, Run0 (reversed for RTL)
    // Each run's glyphs should be reversed internally
    expect(result[0][0].string).toBe('IHG FED CBA');

    // Run2 is now first - should keep its 'black' color attribute
    expect(result[0][0].runs[0].attributes.color).toBe('black');
    expect(result[0][0].runs[0].start).toBe(0);
    expect(result[0][0].runs[0].end).toBe(4);
    expect(result[0][0].runs[0].glyphs).toEqual(initializeToIndex(4).reverse());

    // Run1 is now second - should keep its 'red' color attribute
    expect(result[0][0].runs[1].attributes.color).toBe('red');
    expect(result[0][0].runs[1].start).toBe(4);
    expect(result[0][0].runs[1].end).toBe(7);
    expect(result[0][0].runs[1].glyphs).toEqual(initializeToIndex(3).reverse());

    // Run0 is now last - should keep its 'black' color attribute
    expect(result[0][0].runs[2].attributes.color).toBe('black');
    expect(result[0][0].runs[2].start).toBe(7);
    expect(result[0][0].runs[2].end).toBe(11);
    expect(result[0][0].runs[2].glyphs).toEqual(initializeToIndex(4).reverse());
  });

  test('should handle LTR embedded in RTL correctly', () => {
    // Simulates: <Text dir='rtl'>שלום Hello עולם</Text>
    // Run0: "AAA " (RTL level 1), Run1: "Hello" (LTR level 2), Run2: " BBB" (RTL level 1)
    const string = {
      string: 'AAA Hello BBB',
      runs: [
        {
          attributes: {
            direction: 'rtl' as const,
            bidiLevel: 1,
          },
          start: 0,
          end: 4,
          glyphs: initializeToIndex(4),
          positions: initializeToIndex(4),
          glyphIndices: initializeToIndex(4),
        },
        {
          attributes: {
            direction: 'ltr' as const,
            bidiLevel: 2,
          },
          start: 4,
          end: 9,
          glyphs: initializeToIndex(5),
          positions: initializeToIndex(5),
          glyphIndices: initializeToIndex(5),
        },
        {
          attributes: {
            direction: 'rtl' as const,
            bidiLevel: 1,
          },
          start: 9,
          end: 13,
          glyphs: initializeToIndex(4),
          positions: initializeToIndex(4),
          glyphIndices: initializeToIndex(4),
        },
      ],
    };

    const result = bidiReorderingInstance([[string]]);

    // L2 reordering for RTL base:
    // Level 2: reverse contiguous runs at >=2: Run1 alone, no change
    // Level 1: reverse contiguous runs at >=1: all three → Run2, Run1, Run0
    // Run2 (RTL) and Run0 (RTL) get internal glyph reversal
    // Run1 (LTR, level 2 = even) keeps glyphs as-is
    expect(result[0][0].string).toBe('BBB Hello AAA');

    // Run2 first (RTL, reversed internally)
    expect(result[0][0].runs[0].glyphs).toEqual(initializeToIndex(4).reverse());

    // Run1 second (LTR, not reversed)
    expect(result[0][0].runs[1].glyphs).toEqual(initializeToIndex(5));

    // Run0 last (RTL, reversed internally)
    expect(result[0][0].runs[2].glyphs).toEqual(initializeToIndex(4).reverse());
  });
});
