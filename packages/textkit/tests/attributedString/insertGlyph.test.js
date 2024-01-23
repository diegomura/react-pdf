import { describe, expect, test } from 'vitest';

import pluck from '../internal/pluck';
import insertGlyph from '../../src/attributedString/insertGlyph';

describe('attributeString insertGlyph operator', () => {
  test('should insert glyph on single run string at beggining', () => {
    const string = {
      string: 'lorem',
      runs: [
        {
          start: 0,
          end: 5,
          glyphs: [
            { id: 76, codePoints: [76] }, // l
            { id: 111, codePoints: [111] }, // o
            { id: 114, codePoints: [114] }, // r
            { id: 101, codePoints: [101] }, // e
            { id: 109, codePoints: [109] }, // m
          ],
          glyphIndices: [0, 1, 2, 3, 4],
        },
      ],
    };
    const glyph = { id: 105, codePoints: [105] };
    const result = insertGlyph(0, glyph, string);

    expect(result).toHaveProperty('string', 'ilorem');
    expect(result.runs).toHaveLength(1);
    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 6);
    expect(pluck('id', result.runs[0].glyphs)).toEqual([
      105,
      76,
      111,
      114,
      101,
      109,
    ]);
  });

  test('should insert glyph on single run string at end', () => {
    const string = {
      string: 'lorem',
      runs: [
        {
          start: 0,
          end: 5,
          glyphs: [
            { id: 76, codePoints: [76] }, // l
            { id: 111, codePoints: [111] }, // o
            { id: 114, codePoints: [114] }, // r
            { id: 101, codePoints: [101] }, // e
            { id: 109, codePoints: [109] }, // m
          ],
          glyphIndices: [0, 1, 2, 3, 4],
        },
      ],
    };
    const glyph = { id: 105, codePoints: [105] };
    const result = insertGlyph(5, glyph, string);

    expect(result).toHaveProperty('string', 'loremi');
    expect(result.runs).toHaveLength(1);
    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 6);
    expect(pluck('id', result.runs[0].glyphs)).toEqual([
      76,
      111,
      114,
      101,
      109,
      105,
    ]);
  });

  test('should insert glyph on single run string at middle', () => {
    const string = {
      string: 'lorem',
      runs: [
        {
          start: 0,
          end: 5,
          glyphs: [
            { id: 76, codePoints: [76] }, // l
            { id: 111, codePoints: [111] }, // o
            { id: 114, codePoints: [114] }, // r
            { id: 101, codePoints: [101] }, // e
            { id: 109, codePoints: [109] }, // m
          ],
          glyphIndices: [0, 1, 2, 3, 4],
        },
      ],
    };
    const glyph = { id: 105, codePoints: [105] };
    const result = insertGlyph(3, glyph, string);

    expect(result).toHaveProperty('string', 'loriem');
    expect(result.runs).toHaveLength(1);
    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 6);
    expect(pluck('id', result.runs[0].glyphs)).toEqual([
      76,
      111,
      114,
      105,
      101,
      109,
    ]);
  });

  test('should insert ligature glyph on single run string at beggining', () => {
    const string = {
      string: 'lorem',
      runs: [
        {
          start: 0,
          end: 5,
          glyphs: [
            { id: 76, codePoints: [76] }, // l
            { id: 111, codePoints: [111] }, // o
            { id: 114, codePoints: [114] }, // r
            { id: 101, codePoints: [101] }, // e
            { id: 109, codePoints: [109] }, // m
          ],
          glyphIndices: [0, 1, 2, 3, 4],
        },
      ],
    };
    const glyph = { id: 64257, codePoints: [102, 105] }; // fi
    const result = insertGlyph(0, glyph, string);

    expect(result).toHaveProperty('string', 'filorem');
    expect(result.runs).toHaveLength(1);
    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 7);
    expect(pluck('id', result.runs[0].glyphs)).toEqual([
      64257,
      76,
      111,
      114,
      101,
      109,
    ]);
  });

  test('should insert ligature glyph on single run string at end', () => {
    const string = {
      string: 'lorem',
      runs: [
        {
          start: 0,
          end: 5,
          glyphs: [
            { id: 76, codePoints: [76] }, // l
            { id: 111, codePoints: [111] }, // o
            { id: 114, codePoints: [114] }, // r
            { id: 101, codePoints: [101] }, // e
            { id: 109, codePoints: [109] }, // m
          ],
          glyphIndices: [0, 1, 2, 3, 4],
        },
      ],
    };
    const glyph = { id: 64257, codePoints: [102, 105] }; // fi
    const result = insertGlyph(5, glyph, string);

    expect(result).toHaveProperty('string', 'loremfi');
    expect(result.runs).toHaveLength(1);
    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 7);
    expect(pluck('id', result.runs[0].glyphs)).toEqual([
      76,
      111,
      114,
      101,
      109,
      64257,
    ]);
  });

  test('should insert ligature glyph on single run string at middile', () => {
    const string = {
      string: 'lorem',
      runs: [
        {
          start: 0,
          end: 5,
          glyphs: [
            { id: 76, codePoints: [76] }, // l
            { id: 111, codePoints: [111] }, // o
            { id: 114, codePoints: [114] }, // r
            { id: 101, codePoints: [101] }, // e
            { id: 109, codePoints: [109] }, // m
          ],
          glyphIndices: [0, 1, 2, 3, 4],
        },
      ],
    };
    const glyph = { id: 64257, codePoints: [102, 105] }; // fi
    const result = insertGlyph(3, glyph, string);

    expect(result).toHaveProperty('string', 'lorfiem');
    expect(result.runs).toHaveLength(1);
    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 7);
    expect(pluck('id', result.runs[0].glyphs)).toEqual([
      76,
      111,
      114,
      64257,
      101,
      109,
    ]);
  });

  test('should insert glyph on single run with ligature string at beggining', () => {
    const string = {
      string: 'lofiem',
      runs: [
        {
          start: 0,
          end: 6,
          glyphs: [
            { id: 76, codePoints: [76] }, // l
            { id: 111, codePoints: [111] }, // o
            { id: 64257, codePoints: [102, 105] }, // fi
            { id: 101, codePoints: [101] }, // e
            { id: 109, codePoints: [109] }, // m
          ],
          glyphIndices: [0, 1, 2, 2, 3, 4],
        },
      ],
    };
    const glyph = { id: 105, codePoints: [105] };
    const result = insertGlyph(0, glyph, string);

    expect(result).toHaveProperty('string', 'ilofiem');
    expect(result.runs).toHaveLength(1);
    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 7);
    expect(pluck('id', result.runs[0].glyphs)).toEqual([
      105,
      76,
      111,
      64257,
      101,
      109,
    ]);
  });

  test('should insert glyph on single run with ligature string at end', () => {
    const string = {
      string: 'lofiem',
      runs: [
        {
          start: 0,
          end: 6,
          glyphs: [
            { id: 76, codePoints: [76] }, // l
            { id: 111, codePoints: [111] }, // o
            { id: 64257, codePoints: [102, 105] }, // fi
            { id: 101, codePoints: [101] }, // e
            { id: 109, codePoints: [109] }, // m
          ],
          glyphIndices: [0, 1, 2, 2, 3, 4],
        },
      ],
    };
    const glyph = { id: 105, codePoints: [105] };
    const result = insertGlyph(6, glyph, string);

    expect(result).toHaveProperty('string', 'lofiemi');
    expect(result.runs).toHaveLength(1);
    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 7);
    expect(pluck('id', result.runs[0].glyphs)).toEqual([
      76,
      111,
      64257,
      101,
      109,
      105,
    ]);
  });

  test('should insert glyph on single run with ligature string at middle', () => {
    const string = {
      string: 'lofiem',
      runs: [
        {
          start: 0,
          end: 6,
          glyphs: [
            { id: 76, codePoints: [76] }, // l
            { id: 111, codePoints: [111] }, // o
            { id: 64257, codePoints: [102, 105] }, // fi
            { id: 101, codePoints: [101] }, // e
            { id: 109, codePoints: [109] }, // m
          ],
          glyphIndices: [0, 1, 2, 2, 3, 4],
        },
      ],
    };
    const glyph = { id: 105, codePoints: [105] };
    const result = insertGlyph(4, glyph, string);

    expect(result).toHaveProperty('string', 'lofiiem');
    expect(result.runs).toHaveLength(1);
    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 7);
    expect(pluck('id', result.runs[0].glyphs)).toEqual([
      76,
      111,
      64257,
      105,
      101,
      109,
    ]);
  });

  test('should insert glyph at beggining of first run of two run string', () => {
    const string = {
      string: 'lorem',
      runs: [
        {
          start: 0,
          end: 2,
          glyphs: [
            { id: 76, codePoints: [76] }, // l
            { id: 111, codePoints: [111] }, // o
          ],
          glyphIndices: [0, 1],
        },
        {
          start: 2,
          end: 5,
          glyphs: [
            { id: 114, codePoints: [114] }, // r
            { id: 101, codePoints: [101] }, // e
            { id: 109, codePoints: [109] }, // m
          ],
          glyphIndices: [0, 1, 2],
        },
      ],
    };
    const glyph = { id: 105, codePoints: [105] };
    const result = insertGlyph(0, glyph, string);

    expect(result).toHaveProperty('string', 'ilorem');
    expect(result.runs).toHaveLength(2);

    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 3);
    expect(pluck('id', result.runs[0].glyphs)).toEqual([105, 76, 111]);

    expect(result.runs[1]).toHaveProperty('start', 3);
    expect(result.runs[1]).toHaveProperty('end', 6);
    expect(pluck('id', result.runs[1].glyphs)).toEqual([114, 101, 109]);
  });

  test('should insert glyph on first run of two run string', () => {
    const string = {
      string: 'lorem',
      runs: [
        {
          start: 0,
          end: 2,
          glyphs: [
            { id: 76, codePoints: [76] }, // l
            { id: 111, codePoints: [111] }, // o
          ],
          glyphIndices: [0, 1],
        },
        {
          start: 2,
          end: 5,
          glyphs: [
            { id: 114, codePoints: [114] }, // r
            { id: 101, codePoints: [101] }, // e
            { id: 109, codePoints: [109] }, // m
          ],
          glyphIndices: [0, 1, 2],
        },
      ],
    };
    const glyph = { id: 105, codePoints: [105] };
    const result = insertGlyph(1, glyph, string);

    expect(result).toHaveProperty('string', 'liorem');
    expect(result.runs).toHaveLength(2);

    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 3);
    expect(pluck('id', result.runs[0].glyphs)).toEqual([76, 105, 111]);

    expect(result.runs[1]).toHaveProperty('start', 3);
    expect(result.runs[1]).toHaveProperty('end', 6);
    expect(pluck('id', result.runs[1].glyphs)).toEqual([114, 101, 109]);
  });

  test('should insert glyph at beggining of second run of two run string', () => {
    const string = {
      string: 'lorem',
      runs: [
        {
          start: 0,
          end: 2,
          glyphs: [
            { id: 76, codePoints: [76] }, // l
            { id: 111, codePoints: [111] }, // o
          ],
          glyphIndices: [0, 1],
        },
        {
          start: 2,
          end: 5,
          glyphs: [
            { id: 114, codePoints: [114] }, // r
            { id: 101, codePoints: [101] }, // e
            { id: 109, codePoints: [109] }, // m
          ],
          glyphIndices: [0, 1, 2],
        },
      ],
    };
    const glyph = { id: 105, codePoints: [105] };
    const result = insertGlyph(0, glyph, string);

    expect(result).toHaveProperty('string', 'ilorem');
    expect(result.runs).toHaveLength(2);

    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 3);
    expect(pluck('id', result.runs[0].glyphs)).toEqual([105, 76, 111]);

    expect(result.runs[1]).toHaveProperty('start', 3);
    expect(result.runs[1]).toHaveProperty('end', 6);
    expect(pluck('id', result.runs[1].glyphs)).toEqual([114, 101, 109]);
  });

  test('should insert glyph on second run of two run string', () => {
    const string = {
      string: 'lorem',
      runs: [
        {
          start: 0,
          end: 2,
          glyphs: [
            { id: 76, codePoints: [76] }, // l
            { id: 111, codePoints: [111] }, // o
          ],
          glyphIndices: [0, 1],
        },
        {
          start: 2,
          end: 5,
          glyphs: [
            { id: 114, codePoints: [114] }, // r
            { id: 101, codePoints: [101] }, // e
            { id: 109, codePoints: [109] }, // m
          ],
          glyphIndices: [0, 1, 2],
        },
      ],
    };
    const glyph = { id: 105, codePoints: [105] };
    const result = insertGlyph(2, glyph, string);

    expect(result).toHaveProperty('string', 'loirem');
    expect(result.runs).toHaveLength(2);

    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 2);
    expect(pluck('id', result.runs[0].glyphs)).toEqual([76, 111]);

    expect(result.runs[1]).toHaveProperty('start', 2);
    expect(result.runs[1]).toHaveProperty('end', 6);
    expect(pluck('id', result.runs[1].glyphs)).toEqual([105, 114, 101, 109]);
  });

  test('should insert ligature glyph on first run of two run string', () => {
    const string = {
      string: 'lorem',
      runs: [
        {
          start: 0,
          end: 2,
          glyphs: [
            { id: 76, codePoints: [76] }, // l
            { id: 111, codePoints: [111] }, // o
          ],
          glyphIndices: [0, 1],
        },
        {
          start: 2,
          end: 5,
          glyphs: [
            { id: 114, codePoints: [114] }, // r
            { id: 101, codePoints: [101] }, // e
            { id: 109, codePoints: [109] }, // m
          ],
          glyphIndices: [0, 1, 2],
        },
      ],
    };
    const glyph = { id: 64259, codePoints: [102, 102, 105] }; // ffii
    const result = insertGlyph(1, glyph, string);

    expect(result).toHaveProperty('string', 'lffiorem');
    expect(result.runs).toHaveLength(2);

    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 5);
    expect(pluck('id', result.runs[0].glyphs)).toEqual([76, 64259, 111]);

    expect(result.runs[1]).toHaveProperty('start', 5);
    expect(result.runs[1]).toHaveProperty('end', 8);
    expect(pluck('id', result.runs[1].glyphs)).toEqual([114, 101, 109]);
  });

  test('should insert ligature glyph on second run of two run string', () => {
    const string = {
      string: 'lorem',
      runs: [
        {
          start: 0,
          end: 2,
          glyphs: [
            { id: 76, codePoints: [76] }, // l
            { id: 111, codePoints: [111] }, // o
          ],
          glyphIndices: [0, 1],
        },
        {
          start: 2,
          end: 5,
          glyphs: [
            { id: 114, codePoints: [114] }, // r
            { id: 101, codePoints: [101] }, // e
            { id: 109, codePoints: [109] }, // m
          ],
          glyphIndices: [0, 1, 2],
        },
      ],
    };
    const glyph = { id: 64259, codePoints: [102, 102, 105] }; // ffii
    const result = insertGlyph(4, glyph, string);

    expect(result).toHaveProperty('string', 'loreffim');
    expect(result.runs).toHaveLength(2);

    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 2);
    expect(pluck('id', result.runs[0].glyphs)).toEqual([76, 111]);

    expect(result.runs[1]).toHaveProperty('start', 2);
    expect(result.runs[1]).toHaveProperty('end', 8);
    expect(pluck('id', result.runs[1].glyphs)).toEqual([114, 101, 64259, 109]);
  });
});
