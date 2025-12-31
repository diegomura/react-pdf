import { describe, expect, test } from 'vitest';

import pluck from '../internal/pluck';
import insertGlyph from '../../src/attributedString/insertGlyph';
import { Glyph } from '../../src/types';
import font from '../internal/font';
import empty from '../../src/attributedString/empty';

describe('attributeString insertGlyph operator', () => {
  test('should insert glyph on single run string at beggining', () => {
    const string = {
      string: 'lorem',
      runs: [
        {
          start: 0,
          end: 5,
          attributes: {},
          glyphs: [
            { id: 76, advanceWidth: 0, codePoints: [76] }, // l
            { id: 111, advanceWidth: 0, codePoints: [111] }, // o
            { id: 114, advanceWidth: 0, codePoints: [114] }, // r
            { id: 101, advanceWidth: 0, codePoints: [101] }, // e
            { id: 109, advanceWidth: 0, codePoints: [109] }, // m
          ] as Glyph[],
          glyphIndices: [0, 1, 2, 3, 4],
        },
      ],
    };
    const glyph = { id: 105, advanceWidth: 0, codePoints: [105] } as Glyph;
    const result = insertGlyph(0, glyph, string);

    expect(result).toHaveProperty('string', 'ilorem');
    expect(result.runs).toHaveLength(1);
    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 6);
    expect(pluck('id', result.runs[0].glyphs!)).toEqual([
      105, 76, 111, 114, 101, 109,
    ]);
  });

  test('should insert glyph on single run string at end', () => {
    const string = {
      string: 'lorem',
      runs: [
        {
          start: 0,
          end: 5,
          attributes: {},
          glyphs: [
            { id: 76, advanceWidth: 0, codePoints: [76] }, // l
            { id: 111, advanceWidth: 0, codePoints: [111] }, // o
            { id: 114, advanceWidth: 0, codePoints: [114] }, // r
            { id: 101, advanceWidth: 0, codePoints: [101] }, // e
            { id: 109, advanceWidth: 0, codePoints: [109] }, // m
          ] as Glyph[],
          glyphIndices: [0, 1, 2, 3, 4],
        },
      ],
    };
    const glyph = { id: 105, advanceWidth: 0, codePoints: [105] } as Glyph;
    const result = insertGlyph(5, glyph, string);

    expect(result).toHaveProperty('string', 'loremi');
    expect(result.runs).toHaveLength(1);
    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 6);
    expect(pluck('id', result.runs[0].glyphs!)).toEqual([
      76, 111, 114, 101, 109, 105,
    ]);
  });

  test('should insert glyph on single run string at middle', () => {
    const string = {
      string: 'lorem',
      runs: [
        {
          start: 0,
          end: 5,
          attributes: {},
          glyphs: [
            { id: 76, advanceWidth: 0, codePoints: [76] }, // l
            { id: 111, advanceWidth: 0, codePoints: [111] }, // o
            { id: 114, advanceWidth: 0, codePoints: [114] }, // r
            { id: 101, advanceWidth: 0, codePoints: [101] }, // e
            { id: 109, advanceWidth: 0, codePoints: [109] }, // m
          ] as Glyph[],
          glyphIndices: [0, 1, 2, 3, 4],
        },
      ],
    };
    const glyph = { id: 105, advanceWidth: 0, codePoints: [105] } as Glyph;
    const result = insertGlyph(3, glyph, string);

    expect(result).toHaveProperty('string', 'loriem');
    expect(result.runs).toHaveLength(1);
    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 6);
    expect(pluck('id', result.runs[0].glyphs!)).toEqual([
      76, 111, 114, 105, 101, 109,
    ]);
  });

  test('should insert ligature glyph on single run string at beggining', () => {
    const string = {
      string: 'lorem',
      runs: [
        {
          start: 0,
          end: 5,
          attributes: {},
          glyphs: [
            { id: 76, advanceWidth: 0, codePoints: [76] }, // l
            { id: 111, advanceWidth: 0, codePoints: [111] }, // o
            { id: 114, advanceWidth: 0, codePoints: [114] }, // r
            { id: 101, advanceWidth: 0, codePoints: [101] }, // e
            { id: 109, advanceWidth: 0, codePoints: [109] }, // m
          ] as Glyph[],
          glyphIndices: [0, 1, 2, 3, 4],
        },
      ],
    };
    const glyph = {
      id: 64257,
      advanceWidth: 0,
      codePoints: [102, 105],
    } as Glyph; // fi
    const result = insertGlyph(0, glyph, string);

    expect(result).toHaveProperty('string', 'filorem');
    expect(result.runs).toHaveLength(1);
    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 7);
    expect(pluck('id', result.runs[0].glyphs!)).toEqual([
      64257, 76, 111, 114, 101, 109,
    ]);
  });

  test('should insert ligature glyph on single run string at end', () => {
    const string = {
      string: 'lorem',
      runs: [
        {
          start: 0,
          end: 5,
          attributes: {},
          glyphs: [
            { id: 76, advanceWidth: 0, codePoints: [76] }, // l
            { id: 111, advanceWidth: 0, codePoints: [111] }, // o
            { id: 114, advanceWidth: 0, codePoints: [114] }, // r
            { id: 101, advanceWidth: 0, codePoints: [101] }, // e
            { id: 109, advanceWidth: 0, codePoints: [109] }, // m
          ] as Glyph[],
          glyphIndices: [0, 1, 2, 3, 4],
        },
      ],
    };
    const glyph = {
      id: 64257,
      advanceWidth: 0,
      codePoints: [102, 105],
    } as Glyph; // fi
    const result = insertGlyph(5, glyph, string);

    expect(result).toHaveProperty('string', 'loremfi');
    expect(result.runs).toHaveLength(1);
    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 7);
    expect(pluck('id', result.runs[0].glyphs!)).toEqual([
      76, 111, 114, 101, 109, 64257,
    ]);
  });

  test('should insert ligature glyph on single run string at middile', () => {
    const string = {
      string: 'lorem',
      runs: [
        {
          start: 0,
          end: 5,
          attributes: {},
          glyphs: [
            { id: 76, advanceWidth: 0, codePoints: [76] }, // l
            { id: 111, advanceWidth: 0, codePoints: [111] }, // o
            { id: 114, advanceWidth: 0, codePoints: [114] }, // r
            { id: 101, advanceWidth: 0, codePoints: [101] }, // e
            { id: 109, advanceWidth: 0, codePoints: [109] }, // m
          ] as Glyph[],
          glyphIndices: [0, 1, 2, 3, 4],
        },
      ],
    };
    const glyph = {
      id: 64257,
      advanceWidth: 0,
      codePoints: [102, 105],
    } as Glyph; // fi
    const result = insertGlyph(3, glyph, string);

    expect(result).toHaveProperty('string', 'lorfiem');
    expect(result.runs).toHaveLength(1);
    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 7);
    expect(pluck('id', result.runs[0].glyphs!)).toEqual([
      76, 111, 114, 64257, 101, 109,
    ]);
  });

  test('should insert glyph on single run with ligature string at beggining', () => {
    const string = {
      string: 'lofiem',
      runs: [
        {
          start: 0,
          end: 6,
          attributes: {},
          glyphs: [
            { id: 76, advanceWidth: 0, codePoints: [76] }, // l
            { id: 111, advanceWidth: 0, codePoints: [111] }, // o
            { id: 64257, advanceWidth: 0, codePoints: [102, 105] }, // fi
            { id: 101, advanceWidth: 0, codePoints: [101] }, // e
            { id: 109, advanceWidth: 0, codePoints: [109] }, // m
          ] as Glyph[],
          glyphIndices: [0, 1, 2, 2, 3, 4],
        },
      ],
    };
    const glyph = { id: 105, advanceWidth: 0, codePoints: [105] } as Glyph;
    const result = insertGlyph(0, glyph, string);

    expect(result).toHaveProperty('string', 'ilofiem');
    expect(result.runs).toHaveLength(1);
    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 7);
    expect(pluck('id', result.runs[0].glyphs!)).toEqual([
      105, 76, 111, 64257, 101, 109,
    ]);
  });

  test('should insert glyph on single run with ligature string at end', () => {
    const string = {
      string: 'lofiem',
      runs: [
        {
          start: 0,
          end: 6,
          attributes: {},
          glyphs: [
            { id: 76, advanceWidth: 0, codePoints: [76] }, // l
            { id: 111, advanceWidth: 0, codePoints: [111] }, // o
            { id: 64257, advanceWidth: 0, codePoints: [102, 105] }, // fi
            { id: 101, advanceWidth: 0, codePoints: [101] }, // e
            { id: 109, advanceWidth: 0, codePoints: [109] }, // m
          ] as Glyph[],
          glyphIndices: [0, 1, 2, 2, 3, 4],
        },
      ],
    };
    const glyph = { id: 105, advanceWidth: 0, codePoints: [105] } as Glyph;
    const result = insertGlyph(6, glyph, string);

    expect(result).toHaveProperty('string', 'lofiemi');
    expect(result.runs).toHaveLength(1);
    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 7);
    expect(pluck('id', result.runs[0].glyphs!)).toEqual([
      76, 111, 64257, 101, 109, 105,
    ]);
  });

  test('should insert glyph on single run with ligature string at middle', () => {
    const string = {
      string: 'lofiem',
      runs: [
        {
          start: 0,
          end: 6,
          attributes: {},
          glyphs: [
            { id: 76, advanceWidth: 0, codePoints: [76] }, // l
            { id: 111, advanceWidth: 0, codePoints: [111] }, // o
            { id: 64257, advanceWidth: 0, codePoints: [102, 105] }, // fi
            { id: 101, advanceWidth: 0, codePoints: [101] }, // e
            { id: 109, advanceWidth: 0, codePoints: [109] }, // m
          ] as Glyph[],
          glyphIndices: [0, 1, 2, 2, 3, 4],
        },
      ],
    };
    const glyph = { id: 105, advanceWidth: 0, codePoints: [105] } as Glyph;
    const result = insertGlyph(4, glyph, string);

    expect(result).toHaveProperty('string', 'lofiiem');
    expect(result.runs).toHaveLength(1);
    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 7);
    expect(pluck('id', result.runs[0].glyphs!)).toEqual([
      76, 111, 64257, 105, 101, 109,
    ]);
  });

  test('should insert glyph at beggining of first run of two run string', () => {
    const string = {
      string: 'lorem',
      runs: [
        {
          start: 0,
          end: 2,
          attributes: {},
          glyphs: [
            { id: 76, advanceWidth: 0, codePoints: [76] }, // l
            { id: 111, advanceWidth: 0, codePoints: [111] }, // o
          ] as Glyph[],
          glyphIndices: [0, 1],
        },
        {
          start: 2,
          end: 5,
          attributes: {},
          glyphs: [
            { id: 114, advanceWidth: 0, codePoints: [114] }, // r
            { id: 101, advanceWidth: 0, codePoints: [101] }, // e
            { id: 109, advanceWidth: 0, codePoints: [109] }, // m
          ] as Glyph[],
          glyphIndices: [0, 1, 2],
        },
      ],
    };
    const glyph = { id: 105, advanceWidth: 0, codePoints: [105] } as Glyph;
    const result = insertGlyph(0, glyph, string);

    expect(result).toHaveProperty('string', 'ilorem');
    expect(result.runs).toHaveLength(2);

    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 3);
    expect(pluck('id', result.runs[0].glyphs!)).toEqual([105, 76, 111]);

    expect(result.runs[1]).toHaveProperty('start', 3);
    expect(result.runs[1]).toHaveProperty('end', 6);
    expect(pluck('id', result.runs[1].glyphs!)).toEqual([114, 101, 109]);
  });

  test('should insert glyph on first run of two run string', () => {
    const string = {
      string: 'lorem',
      runs: [
        {
          start: 0,
          end: 2,
          attributes: {},
          glyphs: [
            { id: 76, advanceWidth: 0, codePoints: [76] }, // l
            { id: 111, advanceWidth: 0, codePoints: [111] }, // o
          ] as Glyph[],
          glyphIndices: [0, 1],
        },
        {
          start: 2,
          end: 5,
          attributes: {},
          glyphs: [
            { id: 114, advanceWidth: 0, codePoints: [114] }, // r
            { id: 101, advanceWidth: 0, codePoints: [101] }, // e
            { id: 109, advanceWidth: 0, codePoints: [109] }, // m
          ] as Glyph[],
          glyphIndices: [0, 1, 2],
        },
      ],
    };
    const glyph = { id: 105, advanceWidth: 0, codePoints: [105] } as Glyph;
    const result = insertGlyph(1, glyph, string);

    expect(result).toHaveProperty('string', 'liorem');
    expect(result.runs).toHaveLength(2);

    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 3);
    expect(pluck('id', result.runs[0].glyphs!)).toEqual([76, 105, 111]);

    expect(result.runs[1]).toHaveProperty('start', 3);
    expect(result.runs[1]).toHaveProperty('end', 6);
    expect(pluck('id', result.runs[1].glyphs!)).toEqual([114, 101, 109]);
  });

  test('should insert glyph at beggining of second run of two run string', () => {
    const string = {
      string: 'lorem',
      runs: [
        {
          start: 0,
          end: 2,
          attributes: {},
          glyphs: [
            { id: 76, advanceWidth: 0, codePoints: [76] }, // l
            { id: 111, advanceWidth: 0, codePoints: [111] }, // o
          ] as Glyph[],
          glyphIndices: [0, 1],
        },
        {
          start: 2,
          end: 5,
          attributes: {},
          glyphs: [
            { id: 114, advanceWidth: 0, codePoints: [114] }, // r
            { id: 101, advanceWidth: 0, codePoints: [101] }, // e
            { id: 109, advanceWidth: 0, codePoints: [109] }, // m
          ] as Glyph[],
          glyphIndices: [0, 1, 2],
        },
      ],
    };
    const glyph = { id: 105, advanceWidth: 0, codePoints: [105] } as Glyph;
    const result = insertGlyph(2, glyph, string);

    expect(result).toHaveProperty('string', 'loirem');
    expect(result.runs).toHaveLength(2);

    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 2);
    expect(pluck('id', result.runs[0].glyphs!)).toEqual([76, 111]);

    expect(result.runs[1]).toHaveProperty('start', 2);
    expect(result.runs[1]).toHaveProperty('end', 6);
    expect(pluck('id', result.runs[1].glyphs!)).toEqual([105, 114, 101, 109]);
  });

  test('should insert glyph on second run of two run string', () => {
    const string = {
      string: 'lorem',
      runs: [
        {
          start: 0,
          end: 2,
          attributes: {},
          glyphs: [
            { id: 76, advanceWidth: 0, codePoints: [76] }, // l
            { id: 111, advanceWidth: 0, codePoints: [111] }, // o
          ] as Glyph[],
          glyphIndices: [0, 1],
        },
        {
          start: 2,
          end: 5,
          attributes: {},
          glyphs: [
            { id: 114, advanceWidth: 0, codePoints: [114] }, // r
            { id: 101, advanceWidth: 0, codePoints: [101] }, // e
            { id: 109, advanceWidth: 0, codePoints: [109] }, // m
          ] as Glyph[],
          glyphIndices: [0, 1, 2],
        },
      ],
    };
    const glyph = { id: 105, advanceWidth: 0, codePoints: [105] } as Glyph;
    const result = insertGlyph(2, glyph, string);

    expect(result).toHaveProperty('string', 'loirem');
    expect(result.runs).toHaveLength(2);

    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 2);
    expect(pluck('id', result.runs[0].glyphs!)).toEqual([76, 111]);

    expect(result.runs[1]).toHaveProperty('start', 2);
    expect(result.runs[1]).toHaveProperty('end', 6);
    expect(pluck('id', result.runs[1].glyphs!)).toEqual([105, 114, 101, 109]);
  });

  test('should insert ligature glyph on first run of two run string', () => {
    const string = {
      string: 'lorem',
      runs: [
        {
          start: 0,
          end: 2,
          attributes: {},
          glyphs: [
            { id: 76, advanceWidth: 0, codePoints: [76] }, // l
            { id: 111, advanceWidth: 0, codePoints: [111] }, // o
          ] as Glyph[],
          glyphIndices: [0, 1],
        },
        {
          start: 2,
          end: 5,
          attributes: {},
          glyphs: [
            { id: 114, advanceWidth: 0, codePoints: [114] }, // r
            { id: 101, advanceWidth: 0, codePoints: [101] }, // e
            { id: 109, advanceWidth: 0, codePoints: [109] }, // m
          ] as Glyph[],
          glyphIndices: [0, 1, 2],
        },
      ],
    };
    const glyph = {
      id: 64259,
      advanceWidth: 0,
      codePoints: [102, 102, 105],
    } as Glyph; // ffii
    const result = insertGlyph(1, glyph, string);

    expect(result).toHaveProperty('string', 'lffiorem');
    expect(result.runs).toHaveLength(2);

    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 5);
    expect(pluck('id', result.runs[0].glyphs!)).toEqual([76, 64259, 111]);

    expect(result.runs[1]).toHaveProperty('start', 5);
    expect(result.runs[1]).toHaveProperty('end', 8);
    expect(pluck('id', result.runs[1].glyphs!)).toEqual([114, 101, 109]);
  });

  test('should insert ligature glyph on second run of two run string', () => {
    const string = {
      string: 'lorem',
      runs: [
        {
          start: 0,
          end: 2,
          attributes: {},
          glyphs: [
            { id: 76, advanceWidth: 0, codePoints: [76] }, // l
            { id: 111, advanceWidth: 0, codePoints: [111] }, // o
          ] as Glyph[],
          glyphIndices: [0, 1],
        },
        {
          start: 2,
          end: 5,
          attributes: {},
          glyphs: [
            { id: 114, advanceWidth: 0, codePoints: [114] }, // r
            { id: 101, advanceWidth: 0, codePoints: [101] }, // e
            { id: 109, advanceWidth: 0, codePoints: [109] }, // m
          ] as Glyph[],
          glyphIndices: [0, 1, 2],
        },
      ],
    };
    const glyph = {
      id: 64259,
      advanceWidth: 0,
      codePoints: [102, 102, 105],
    } as Glyph; // ffii
    const result = insertGlyph(4, glyph, string);

    expect(result).toHaveProperty('string', 'loreffim');
    expect(result.runs).toHaveLength(2);

    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 2);
    expect(pluck('id', result.runs[0].glyphs!)).toEqual([76, 111]);

    expect(result.runs[1]).toHaveProperty('start', 2);
    expect(result.runs[1]).toHaveProperty('end', 8);
    expect(pluck('id', result.runs[1].glyphs!)).toEqual([114, 101, 64259, 109]);
  });

  test('should insert glyph using code point number instead of Glyph object', () => {
    const string = {
      string: 'lorem',
      runs: [
        {
          start: 0,
          end: 5,
          attributes: {
            font: [font],
          },
          glyphs: [
            { id: 76, advanceWidth: 0, codePoints: [76] }, // l
            { id: 111, advanceWidth: 0, codePoints: [111] }, // o
            { id: 114, advanceWidth: 0, codePoints: [114] }, // r
            { id: 101, advanceWidth: 0, codePoints: [101] }, // e
            { id: 109, advanceWidth: 0, codePoints: [109] }, // m
          ] as Glyph[],
          glyphIndices: [0, 1, 2, 3, 4],
        },
      ],
    };
    const codePoint = 105; // 'i'
    const result = insertGlyph(2, codePoint, string);

    expect(result).toHaveProperty('string', 'loirem');
    expect(result.runs).toHaveLength(1);
    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 6);
  });

  test('should append glyph when index is beyond string length', () => {
    const string = {
      string: 'lorem',
      runs: [
        {
          start: 0,
          end: 5,
          attributes: {},
          glyphs: [
            { id: 76, advanceWidth: 0, codePoints: [76] }, // l
            { id: 111, advanceWidth: 0, codePoints: [111] }, // o
            { id: 114, advanceWidth: 0, codePoints: [114] }, // r
            { id: 101, advanceWidth: 0, codePoints: [101] }, // e
            { id: 109, advanceWidth: 0, codePoints: [109] }, // m
          ] as Glyph[],
          glyphIndices: [0, 1, 2, 3, 4],
        },
      ],
    };
    const glyph = { id: 105, advanceWidth: 0, codePoints: [105] } as Glyph;
    const result = insertGlyph(10, glyph, string);

    expect(result).toHaveProperty('string', 'loremi');
    expect(result.runs).toHaveLength(1);
    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 6);
    expect(pluck('id', result.runs[0].glyphs!)).toEqual([
      76, 111, 114, 101, 109, 105,
    ]);
  });

  test('should handle empty attributed string by appending', () => {
    const string = empty();
    const glyph = { id: 105, advanceWidth: 0, codePoints: [105] } as Glyph;
    const result = insertGlyph(0, glyph, string);

    expect(result).toHaveProperty('string', 'i');
    expect(result.runs).toHaveLength(1);
    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 1);
  });

  test('should insert glyph on three run string at middle run', () => {
    const string = {
      string: 'loremipsum',
      runs: [
        {
          start: 0,
          end: 3,
          attributes: {},
          glyphs: [
            { id: 76, advanceWidth: 0, codePoints: [76] }, // l
            { id: 111, advanceWidth: 0, codePoints: [111] }, // o
            { id: 114, advanceWidth: 0, codePoints: [114] }, // r
          ] as Glyph[],
          glyphIndices: [0, 1, 2],
        },
        {
          start: 3,
          end: 7,
          attributes: {},
          glyphs: [
            { id: 101, advanceWidth: 0, codePoints: [101] }, // e
            { id: 109, advanceWidth: 0, codePoints: [109] }, // m
            { id: 105, advanceWidth: 0, codePoints: [105] }, // i
            { id: 112, advanceWidth: 0, codePoints: [112] }, // p
          ] as Glyph[],
          glyphIndices: [0, 1, 2, 3],
        },
        {
          start: 7,
          end: 10,
          attributes: {},
          glyphs: [
            { id: 115, advanceWidth: 0, codePoints: [115] }, // s
            { id: 117, advanceWidth: 0, codePoints: [117] }, // u
            { id: 109, advanceWidth: 0, codePoints: [109] }, // m
          ] as Glyph[],
          glyphIndices: [0, 1, 2],
        },
      ],
    };
    const glyph = { id: 120, advanceWidth: 0, codePoints: [120] } as Glyph; // x
    const result = insertGlyph(5, glyph, string);

    expect(result).toHaveProperty('string', 'loremxipsum');
    expect(result.runs).toHaveLength(3);

    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 3);
    expect(pluck('id', result.runs[0].glyphs!)).toEqual([76, 111, 114]);

    expect(result.runs[1]).toHaveProperty('start', 3);
    expect(result.runs[1]).toHaveProperty('end', 8);
    expect(pluck('id', result.runs[1].glyphs!)).toEqual([
      101, 109, 120, 105, 112,
    ]);

    expect(result.runs[2]).toHaveProperty('start', 8);
    expect(result.runs[2]).toHaveProperty('end', 11);
    expect(pluck('id', result.runs[2].glyphs!)).toEqual([115, 117, 109]);
  });

  test('should insert glyph at end of two run string', () => {
    const string = {
      string: 'lorem',
      runs: [
        {
          start: 0,
          end: 2,
          attributes: {},
          glyphs: [
            { id: 76, advanceWidth: 0, codePoints: [76] }, // l
            { id: 111, advanceWidth: 0, codePoints: [111] }, // o
          ] as Glyph[],
          glyphIndices: [0, 1],
        },
        {
          start: 2,
          end: 5,
          attributes: {},
          glyphs: [
            { id: 114, advanceWidth: 0, codePoints: [114] }, // r
            { id: 101, advanceWidth: 0, codePoints: [101] }, // e
            { id: 109, advanceWidth: 0, codePoints: [109] }, // m
          ] as Glyph[],
          glyphIndices: [0, 1, 2],
        },
      ],
    };
    const glyph = { id: 105, advanceWidth: 0, codePoints: [105] } as Glyph;
    const result = insertGlyph(5, glyph, string);

    expect(result).toHaveProperty('string', 'loremi');
    expect(result.runs).toHaveLength(2);

    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 2);
    expect(pluck('id', result.runs[0].glyphs!)).toEqual([76, 111]);

    expect(result.runs[1]).toHaveProperty('start', 2);
    expect(result.runs[1]).toHaveProperty('end', 6);
    expect(pluck('id', result.runs[1].glyphs!)).toEqual([114, 101, 109, 105]);
  });
});
