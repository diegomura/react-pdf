const IGNORABLE_CODEPOINTS = [
  8232, // LINE_SEPARATOR
  8233, // PARAGRAPH_SEPARATOR
];

const buildSubsetForFont = font =>
  IGNORABLE_CODEPOINTS.reduce((acc, codePoint) => {
    if (
      !font ||
      (font.hasGlyphForCodePoint && font.hasGlyphForCodePoint(codePoint))
    ) {
      return acc;
    }
    return [...acc, String.fromCharCode(codePoint)];
  }, []);

export const ignoreChars = fragments =>
  fragments.map(fragment => {
    const charSubset = buildSubsetForFont(fragment.attributes.font);
    const subsetRegex = new RegExp(charSubset.join('|'));

    return {
      string: fragment.string.replace(subsetRegex, ''),
      attributes: fragment.attributes,
    };
  });
