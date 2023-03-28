const IGNORABLE_CODEPOINTS = [
  8232, // LINE_SEPARATOR
  8233, // PARAGRAPH_SEPARATOR
];

const buildSubsetForFontStack = fonts =>
  IGNORABLE_CODEPOINTS.reduce((acc, codePoint) => {
    for (let i = 0; i < fonts.length; i += 1) {
      const font = fonts[i];
      if (
        font &&
        font.hasGlyphForCodePoint &&
        font.hasGlyphForCodePoint(codePoint)
      ) {
        return acc;
      }
    }
    return [...acc, String.fromCharCode(codePoint)];
  }, []);

const ignoreChars = fragments =>
  fragments.map(fragment => {
    const charSubset = buildSubsetForFontStack(fragment.attributes.fontStack);
    const subsetRegex = new RegExp(charSubset.join('|'));

    return {
      string: fragment.string.replace(subsetRegex, ''),
      attributes: fragment.attributes,
    };
  });

export default ignoreChars;
