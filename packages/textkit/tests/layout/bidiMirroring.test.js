import { describe, test, expect } from 'vitest';

import bidiMirroring from '../../src/layout/bidiMirroring';

const bidiMirrorInstance = bidiMirroring();

const swapElements = (arr, firstIndex, lastIndex) => {
  const tmp = arr;
  [tmp[firstIndex], tmp[lastIndex]] = [tmp[lastIndex], tmp[firstIndex]];
  return tmp;
};

const initializeToIndex = (size) => {
  const arr = new Array(size);
  for (let i = 0; i < size; i += 1) {
    arr[i] = i;
  }
  return arr;
};

describe('bidiMirroring', () => {
  test('should mirror characters correctly', () => {
    const word = '(Lorem)';
    const attributedString = {
      string: word,
      runs: [
        {
          attributes: {
            direction: 'rtl',
            bidiLevel: 1,
          },
          start: 0,
          end: 7,
          glyphs: initializeToIndex(word.length),
          positions: initializeToIndex(word.length),
          glyphIndices: initializeToIndex(word.length),
        },
      ],
    };
    const result = bidiMirrorInstance(attributedString);

    expect(result.string).toBe(')Lorem(');
    const expectedGlyphs = swapElements(
      attributedString.runs[0].glyphs,
      0,
      attributedString.runs[0].glyphs.length - 1,
    );
    const expectedPositions = swapElements(
      attributedString.runs[0].positions,
      0,
      attributedString.runs[0].positions.length - 1,
    );

    expect(result.runs[0].glyphs).toEqual(expectedGlyphs);
    expect(result.runs[0].positions).toEqual(expectedPositions);
  });

  test('should not mirror any characters', () => {
    const word = '(Lorem)';
    const attributedString = {
      string: word,
      runs: [
        {
          attributes: {
            direction: 'rtl',
            bidiLevel: 0,
          },
          start: 0,
          end: 7,
          glyphs: initializeToIndex(word.length),
          positions: initializeToIndex(word.length),
          glyphIndices: initializeToIndex(word.length),
        },
      ],
    };
    const result = bidiMirrorInstance(attributedString);

    expect(result.string).toBe(word);
    expect(result.runs[0].glyphs).toEqual(attributedString.runs[0].glyphs);
    expect(result.runs[0].positions).toEqual(
      attributedString.runs[0].positions,
    );
  });
});
