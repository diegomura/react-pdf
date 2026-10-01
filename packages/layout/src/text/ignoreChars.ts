import { Font, Fragment } from '@react-pdf/textkit';

// Separators historically stripped by this module. They are not
// Default_Ignorable_Code_Points but should keep being removed to avoid a
// visible-glyph regression.
const EXTRA_IGNORABLE_CODEPOINTS = new Set([
  0x2028, // LINE_SEPARATOR
  0x2029, // PARAGRAPH_SEPARATOR
]);

/**
 * Whether a code point is a Unicode Default_Ignorable_Code_Point.
 *
 * These characters (bidi controls, zero-width spaces/joiners, the BOM, variation
 * selectors, etc.) are not meant to be rendered as visible glyphs. This mirrors
 * fontkit's own `isDefaultIgnorable` (derived from DerivedCoreProperties.txt),
 * so text laid out here matches what the shaper considers ignorable.
 */
const isDefaultIgnorableCodePoint = (ch: number): boolean => {
  const plane = ch >> 16;
  if (plane === 0) {
    // BMP
    switch (ch >> 8) {
      case 0x00:
        return ch === 0x00ad;
      case 0x03:
        return ch === 0x034f;
      case 0x06:
        return ch === 0x061c;
      case 0x17:
        return ch >= 0x17b4 && ch <= 0x17b5;
      case 0x18:
        return ch >= 0x180b && ch <= 0x180e;
      case 0x20:
        return (
          (ch >= 0x200b && ch <= 0x200f) ||
          (ch >= 0x202a && ch <= 0x202e) ||
          (ch >= 0x2060 && ch <= 0x206f)
        );
      case 0xfe:
        return (ch >= 0xfe00 && ch <= 0xfe0f) || ch === 0xfeff;
      case 0xff:
        return ch >= 0xfff0 && ch <= 0xfff8;
      default:
        return false;
    }
  }
  switch (plane) {
    case 0x01:
      return (
        (ch >= 0x1bca0 && ch <= 0x1bca3) || (ch >= 0x1d173 && ch <= 0x1d17a)
      );
    case 0x0e:
      return ch >= 0xe0000 && ch <= 0xe0fff;
    default:
      return false;
  }
};

/**
 * Removes default-ignorable characters that the fragment's font cannot render.
 *
 * Without this, characters such as the bidi controls U+202A/U+202C or the RLM
 * U+200F reach glyph mapping, miss the font's cmap, and get drawn as a fallback
 * `.notdef` glyph — appearing as visible garbage (e.g. overprinted on an adjacent
 * letter). If the font does provide a glyph for a given code point we keep it, so
 * fonts that intentionally render these are unaffected.
 */
const buildIgnorableChars = (font: Font, string: string): string[] => {
  const chars = new Set<string>();
  for (const char of string) {
    const codePoint = char.codePointAt(0);
    if (codePoint === undefined) continue;
    if (
      !isDefaultIgnorableCodePoint(codePoint) &&
      !EXTRA_IGNORABLE_CODEPOINTS.has(codePoint)
    )
      continue;
    if (
      font &&
      font.hasGlyphForCodePoint &&
      font.hasGlyphForCodePoint(codePoint)
    )
      continue;
    chars.add(char);
  }
  return [...chars];
};

const escapeRegExp = (char: string): string =>
  char.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const ignoreChars = (fragments: Fragment[]): Fragment[] =>
  fragments.map((fragment) => {
    const ignorable = buildIgnorableChars(
      fragment.attributes.font[0],
      fragment.string,
    );

    if (ignorable.length === 0) {
      return fragment;
    }

    const subsetRegex = new RegExp(ignorable.map(escapeRegExp).join('|'), 'gu');

    return {
      string: fragment.string.replace(subsetRegex, ''),
      attributes: fragment.attributes,
    };
  });

export default ignoreChars;
