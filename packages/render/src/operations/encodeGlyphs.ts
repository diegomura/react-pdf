import { Glyph } from '@react-pdf/textkit';

const encodeGlyphs = (font: any, glyphs: Glyph[]) => {
  // Embedded font path (has font subset)
  if (font.subset) {
    const res: string[] = [];

    for (let i = 0; i < glyphs.length; i++) {
      const glyph = glyphs[i];
      const gid = font.subset.includeGlyph(glyph.id);
      res.push(`0000${gid.toString(16)}`.slice(-4));

      if (font.widths[gid] == null) {
        font.widths[gid] = glyph.advanceWidth * font.scale;
      }

      if (font.unicode[gid] == null) {
        font.unicode[gid] = glyph.codePoints;
      }
    }

    return res;
  }

  // Standard font path
  const res: string[] = [];

  for (const glyph of glyphs) {
    res.push(`00${glyph.id.toString(16)}`.slice(-2));
  }

  return res;
};

export default encodeGlyphs;
