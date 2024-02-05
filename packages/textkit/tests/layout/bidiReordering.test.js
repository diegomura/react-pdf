import { describe, test, expect } from 'vitest';

import bidiReordering from '../../src/layout/bidiReordering';

const bidiReorderingInstance = bidiReordering();

const initializeToIndex = (size) => {
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
            direction: 'rtl',
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
            direction: 'ltr',
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
            direction: 'ltr',
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
            direction: 'rtl',
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
            direction: 'rtl',
            bidiLevel: 1,
          },
          start: 0,
          end: 4,
          glyphs: [
            { id: 0, isLigature: true },
            { id: 0, isLigature: true },
            { id: 0, isLigature: true },
            { id: 0, isLigature: true },
          ],
          positions: [0, 0, 0, 0],
          glyphIndices: initializeToIndex(4),
        },
      ],
    };

    const result = bidiReorderingInstance([[string]]);

    expect(result[0][0].string).toBe('eroL');
    expect(result[0][0].runs[0].positions).toEqual([0]);
  });
});
