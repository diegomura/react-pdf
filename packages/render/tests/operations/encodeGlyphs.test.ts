import { describe, expect, test } from 'vitest';

import encodeGlyphs from '../../src/operations/encodeGlyphs';

const createFakeFont = () => ({
  subset: { includeGlyph: (id: number) => id },
  widths: [] as number[],
  unicode: [] as number[][],
  scale: 1,
});

describe('operations encodeGlyphs', () => {
  test('reverses multi-codepoint ToUnicode mapping in RTL runs without mutating glyph.codePoints', () => {
    const font = createFakeFont();
    const codePoints = [0x644, 0x649];
    const glyphs: any[] = [{ id: 10, advanceWidth: 500, codePoints }];

    encodeGlyphs(font, glyphs, true);

    expect(font.unicode[10]).toEqual([0x649, 0x644]);
    expect(codePoints).toEqual([0x644, 0x649]);
  });

  test('keeps multi-codepoint ToUnicode mapping in logical order in LTR runs', () => {
    const font = createFakeFont();
    const glyphs: any[] = [
      { id: 10, advanceWidth: 500, codePoints: [0x644, 0x649] },
    ];

    encodeGlyphs(font, glyphs);

    expect(font.unicode[10]).toEqual([0x644, 0x649]);
  });

  test('keeps single-codepoint ToUnicode mapping unchanged in RTL runs', () => {
    const font = createFakeFont();
    const glyphs: any[] = [{ id: 20, advanceWidth: 500, codePoints: [0x628] }];

    encodeGlyphs(font, glyphs, true);

    expect(font.unicode[20]).toEqual([0x628]);
  });
});
