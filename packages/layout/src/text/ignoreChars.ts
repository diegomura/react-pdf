import { Font, Fragment } from '@react-pdf/textkit';

const IGNORABLE_CODEPOINTS = [
  8232, // LINE_SEPARATOR
  8233, // PARAGRAPH_SEPARATOR
];

const buildSubsetForFont = (font: Font) =>
  IGNORABLE_CODEPOINTS.reduce((acc, codePoint) => {
    if (
      font &&
      font.hasGlyphForCodePoint &&
      font.hasGlyphForCodePoint(codePoint)
    ) {
      return acc;
    }
    return [...acc, String.fromCharCode(codePoint)];
  }, []);

const ignoreChars = (fragments: Fragment[]): Fragment[] =>
  fragments.map((fragment) => {
    const charSubset = buildSubsetForFont(fragment.attributes.font[0]);
    const subsetRegex = new RegExp(charSubset.join('|'));

    return {
      string: fragment.string.replace(subsetRegex, ''),
      attributes: fragment.attributes,
    };
  });

export default ignoreChars;
