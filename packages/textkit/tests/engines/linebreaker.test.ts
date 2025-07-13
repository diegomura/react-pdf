import { describe, expect, test, vi } from 'vitest';

import linebreakerFactory from '../../src/engines/linebreaker';
import applyBestFit from '../../src/engines/linebreaker/bestFit';
import applyKnuthPlass from '../../src/engines/linebreaker/knuthPlass';

const width = 50;

describe('linebreaker', () => {
  const linebreaker = linebreakerFactory({});

  test('should break lines and adds hyphens only where indicated', () => {
    const fontMock = {
      glyphForCodePoint: vi.fn().mockReturnValue({
        id: 45,
        codePoints: [45],
        isLigature: false,
        name: 'softhyphen',
        _font: null,
        advanceWidth: 0,
      }),
      postscriptName: '',
      fullName: '',
      familyName: '',
      subfamilyName: '',
    };

    const attributedString = {
      string: 'Potentieel broeikas­gas­emissierapport',
      runs: [
        {
          start: 0,
          end: 39,
          attributes: {
            bidiLevel: 0,
            scale: 0.012,
            script: null,
            align: 'left',
            alignLastLine: 'left',
            attachment: null,
            backgroundColor: null,
            bullet: null,
            characterSpacing: 0,
            color: 'black',
            direction: 'ltr' as const,
            features: [],
            font: [fontMock],
            fill: true,
            fontSize: 12,
            hangingPunctuation: false,
            hyphenationFactor: 0,
            indent: 0,
            justificationFactor: 1,
            lineHeight: null,
            lineSpacing: 0,
            link: null,
            marginLeft: 0,
            marginRight: 0,
            opacity: undefined,
            paddingTop: 0,
            paragraphSpacing: 0,
            shrinkFactor: 0,
            strike: false,
            strikeColor: 'black',
            strikeStyle: 'solid',
            stroke: false,
            underline: false,
            underlineColor: 'black',
            underlineStyle: 'solid',
            verticalAlign: null,
            wordSpacing: 0,
            yOffset: 0,
          },
          glyphIndices: [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
            19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
            36, 37,
          ],
          positions: [
            {
              advanceWidth: 556,
              xAdvance: 6.5860625,
              xOffset: 0,
              yAdvance: 0,
              yOffset: 0,
            },
            {
              advanceWidth: 333,
              xAdvance: 3.9100625,
              xOffset: 0,
              yAdvance: 0,
              yOffset: 0,
            },
            {
              advanceWidth: 556,
              xAdvance: 6.5860625,
              xOffset: 0,
              yAdvance: 0,
              yOffset: 0,
            },
            {
              advanceWidth: 556,
              xAdvance: 6.5860625,
              xOffset: 0,
              yAdvance: 0,
              yOffset: 0,
            },
            {
              advanceWidth: 222,
              xAdvance: 2.5780625,
              xOffset: 0,
              yAdvance: 0,
              yOffset: 0,
            },
            {
              advanceWidth: 500,
              xAdvance: 5.9140625,
              xOffset: 0,
              yAdvance: 0,
              yOffset: 0,
            },
            {
              advanceWidth: 556,
              xAdvance: 6.5860625,
              xOffset: 0,
              yAdvance: 0,
              yOffset: 0,
            },
            {
              advanceWidth: 500,
              xAdvance: 5.9140625,
              xOffset: 0,
              yAdvance: 0,
              yOffset: 0,
            },
            {
              advanceWidth: 0,
              xAdvance: -0.0859375,
              xOffset: 0,
              yAdvance: 0,
              yOffset: 0,
            },
            {
              advanceWidth: 556,
              xAdvance: 6.5860625,
              xOffset: 0,
              yAdvance: 0,
              yOffset: 0,
            },
            {
              advanceWidth: 556,
              xAdvance: 6.5860625,
              xOffset: 0,
              yAdvance: 0,
              yOffset: 0,
            },
            {
              advanceWidth: 500,
              xAdvance: 5.9140625,
              xOffset: 0,
              yAdvance: 0,
              yOffset: 0,
            },
            {
              advanceWidth: 0,
              xAdvance: -0.0859375,
              xOffset: 0,
              yAdvance: 0,
              yOffset: 0,
            },
            {
              advanceWidth: 556,
              xAdvance: 6.5860625,
              xOffset: 0,
              yAdvance: 0,
              yOffset: 0,
            },
            {
              advanceWidth: 833,
              xAdvance: 9.9100625,
              xOffset: 0,
              yAdvance: 0,
              yOffset: 0,
            },
            {
              advanceWidth: 222,
              xAdvance: 2.5780625,
              xOffset: 0,
              yAdvance: 0,
              yOffset: 0,
            },
            {
              advanceWidth: 500,
              xAdvance: 5.9140625,
              xOffset: 0,
              yAdvance: 0,
              yOffset: 0,
            },
            {
              advanceWidth: 500,
              xAdvance: 5.9140625,
              xOffset: 0,
              yAdvance: 0,
              yOffset: 0,
            },
            {
              advanceWidth: 222,
              xAdvance: 2.5780625,
              xOffset: 0,
              yAdvance: 0,
              yOffset: 0,
            },
            {
              advanceWidth: 556,
              xAdvance: 6.5860625,
              xOffset: 0,
              yAdvance: 0,
              yOffset: 0,
            },
            {
              advanceWidth: 333,
              xAdvance: 3.7900625,
              xOffset: 0,
              yAdvance: 0,
              yOffset: 0,
            },
            {
              advanceWidth: 556,
              xAdvance: 6.5860625,
              xOffset: 0,
              yAdvance: 0,
              yOffset: 0,
            },
            {
              advanceWidth: 556,
              xAdvance: 6.5860625,
              xOffset: 0,
              yAdvance: 0,
              yOffset: 0,
            },
            {
              advanceWidth: 556,
              xAdvance: 6.5860625,
              xOffset: 0,
              yAdvance: 0,
              yOffset: 0,
            },
            {
              advanceWidth: 556,
              xAdvance: 6.5860625,
              xOffset: 0,
              yAdvance: 0,
              yOffset: 0,
            },
            {
              advanceWidth: 333,
              xAdvance: 4.3900625,
              xOffset: 0,
              yAdvance: 0,
              yOffset: 0,
            },
            {
              advanceWidth: 278,
              xAdvance: 3.336,
              xOffset: 0,
              yAdvance: 0,
              yOffset: 0,
            },
          ],
          string: 'Potentieel broeikas­gas­emissierapport',
        },
      ],
      syllables: ['Potentieel', ' ', 'broeikas­gas­', 'emissie', 'rapport'],
    };

    // @ts-expect-error we are mocking the font part of attributed string
    const result = linebreaker(attributedString, [10]);
    expect(result.map((line) => line.string)).toMatchInlineSnapshot(`
      [
        "Potentieel ",
        "broeikas­gas­-",
        "emissie",
        "rapport",
      ]
    `);
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
