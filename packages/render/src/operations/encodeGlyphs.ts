import { Glyph } from '@react-pdf/textkit';

/**
 * The code points a glyph stands for, recovered when the glyph itself lost them.
 *
 * fontkit hands out ONE cached object per glyph id, and whoever asks for it
 * first decides what that object knows. Subsetting a composite glyph asks the
 * font for its components by glyph id alone - "Ö" pulls in "O" and the
 * diaeresis - so the component is cached with an empty `codePoints` array.
 *
 * The font object outlives the document, so from the second PDF of a process
 * onwards every plain "O" IS that cached glyph. It draws correctly, because the
 * glyph id is right, but it lands in the ToUnicode map with no code point at
 * all: the page looks perfect and the text cannot be copied, searched, or read
 * by a screen reader any more. Only letters that are also part of an accented
 * character are hit, which is why it shows up as single wrong letters in an
 * otherwise correct document.
 *
 * The code point is read back out of the font's own cmap and written onto the
 * glyph, so the lookup runs once per glyph and every later document gets the
 * repaired object for free. Only ever applied to a glyph that has NO code
 * points - a ligature keeps the several it legitimately carries.
 */
const codePointsOf = (font: any, glyph: Glyph): number[] => {
  if (glyph.codePoints?.length) return glyph.codePoints;

  // The reverse lookup fontkit uses itself. It walks the cmap, so it is only
  // ever reached for a glyph that has already lost its code points.
  const recovered = font?.font?._cmapProcessor?.codePointsForGlyph?.(glyph.id);

  if (!recovered?.length) return glyph.codePoints || [];

  glyph.codePoints = recovered;

  return recovered;
};

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
        font.unicode[gid] = codePointsOf(font, glyph);
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
