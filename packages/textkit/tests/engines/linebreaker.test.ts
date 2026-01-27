import { describe, expect, test } from 'vitest';

import linebreakerFactory from '../../src/engines/linebreaker';
import applyBestFit from '../../src/engines/linebreaker/bestFit';
import applyKnuthPlass from '../../src/engines/linebreaker/knuthPlass';
import font from '../internal/font';

const width = 50;

const CJK_ADVANCE = 10;

const makePosition = (xAdvance: number) => ({
  xAdvance,
  yAdvance: 0,
  xOffset: 0,
  yOffset: 0,
});

const makeAttributedString = (
  str: string,
  syllables: string[],
  advanceWidth = CJK_ADVANCE,
) => ({
  string: str,
  runs: [
    {
      start: 0,
      end: str.length,
      attributes: { font: [font] },
      glyphIndices: Array.from({ length: str.length }, (_, i) => i),
      positions: Array.from({ length: str.length }, () =>
        makePosition(advanceWidth),
      ),
      glyphs: [],
      string: str,
    },
  ],
  syllables,
});

describe('linebreaker', () => {
  const linebreaker = linebreakerFactory({});

  test('should break lines and adds hyphens only where indicated', () => {
    const str = 'Potentieel broeikasgasemissierapport';
    const syllables = ['Potentieel', ' ', 'broeikasgas', 'emissie', 'rapport'];
    const attributedString = makeAttributedString(str, syllables, 8);

    const result = linebreaker(attributedString, [10]);

    expect(result.map((line) => line.string)).toEqual([
      'Potentieel ',
      'broeikasgas-',
      'emissie-',
      'rapport',
    ]);
  });
});

describe('bestFit', () => {
  test('should return at least one breakpoint', () => {
    const node = [
      {
        type: 'box' as const,
        width: 25,
        start: 0,
        end: 5,
      },
      {
        type: 'glue' as const,
        width: 0,
        stretch: 10000,
        shrink: 0,
        start: 5,
        end: 6,
      },
      {
        type: 'penalty' as const,
        width: 0,
        penalty: -10000,
      },
    ];

    const breakpoints = applyBestFit(node, [width]);
    expect(breakpoints.length).toBe(1);
  });

  test('should break lines when the subnode is bigger than the given widths', () => {
    const node = [
      {
        type: 'box' as const,
        width: 55,
        start: 0,
        end: 5,
      },
      {
        type: 'glue' as const,
        width: 5,
        stretch: 1,
        shrink: 1,
        start: 5,
        end: 6,
      },
      {
        type: 'box' as const,
        width: 55,
        start: 6,
        end: 11,
      },
      {
        type: 'glue' as const,
        width: 5,
        stretch: 1,
        shrink: 1,
        start: 11,
        end: 12,
      },
      {
        type: 'box' as const,
        width: 25,
        start: 12,
        end: 17,
      },
      {
        type: 'glue' as const,
        width: 0,
        stretch: 10000,
        shrink: 0,
        start: 17,
        end: 18,
      },
      {
        type: 'penalty' as const,
        width: 0,
        penalty: -10000,
      },
    ];

    const breakpoints = applyBestFit(node, [width]);

    expect(breakpoints.length).toBe(3);
  });

  test('should consider the length of a potentially added hyphen when calculating breakpoints', () => {
    const node = [
      {
        type: 'box' as const,
        width: 25,
        start: 0,
        end: 5,
      },
      {
        type: 'penalty' as const,
        penalty: 1000,
        width: 0,
        stretch: 0,
        shrink: 0,
        start: 5,
        end: 6,
      },
      {
        type: 'box' as const,
        width: 20,
        start: 6,
        end: 10,
      },
      {
        type: 'penalty' as const,
        penalty: 1000,
        width: 6,
        stretch: 0,
        shrink: 0,
        start: 10,
        end: 11,
      },
      {
        type: 'box' as const,
        width: 25,
        start: 11,
        end: 15,
      },
      {
        type: 'glue' as const,
        width: 6,
        stretch: 1,
        shrink: 1,
        start: 15,
        end: 16,
      },
      {
        type: 'box' as const,
        width: 30,
        start: 16,
        end: 20,
      },
    ];

    const breakpoints = applyBestFit(node, [width]);

    expect(breakpoints).toEqual([0, 1, 5]);
  });
});

describe('knuthPlass', () => {
  test('should return at least one breakpoint', () => {
    const node = [
      {
        type: 'box' as const,
        width: 8,
        start: 0,
        end: 3,
      }, // Lo
      {
        type: 'penalty' as const,
        width: 2,
        penalty: 100,
      }, // -
      {
        type: 'box' as const,
        width: 12,
        start: 3,
        end: 6,
      }, // rem
      {
        type: 'glue' as const,
        width: 4,
        stretch: 10000,
        shrink: 0,
        start: 6,
        end: 7,
      }, // <space>
      {
        type: 'box' as const,
        width: 8,
        start: 7,
        end: 9,
      }, // ip
      {
        type: 'penalty' as const,
        width: 2,
        penalty: 100,
      }, // -
      {
        type: 'box' as const,
        width: 12,
        start: 9,
        end: 12,
      }, // sum
      {
        type: 'glue' as const,
        width: 4,
        stretch: 10000,
        shrink: 0,
        start: 12,
        end: 13,
      }, // <space>
      {
        type: 'box' as const,
        width: 8,
        start: 13,
        end: 15,
      }, // do
      {
        type: 'penalty' as const,
        width: 2,
        penalty: 100,
      }, // -
      {
        type: 'box' as const,
        width: 12,
        start: 15,
        end: 18,
      }, // lor
      {
        type: 'glue' as const,
        width: 0,
        stretch: 10000,
        shrink: 0,
        start: 18,
        end: 18,
      }, // KP mandatory end
      {
        type: 'penalty' as const,
        width: 0,
        penalty: -10000,
      }, // KP mandatory end
    ];

    const breakpoints = applyKnuthPlass(node, [width]);
    expect(breakpoints.length).toBe(3);
    expect(breakpoints).toEqual([0, 7, 12]);
  });
});
