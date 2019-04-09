import StandardFont from './standardFont';

const fontCache = {};

const IGNORED_CODE_POINTS = [173];

const getFallbackFont = () => {
  return getOrCreateFont('Helvetica');
};

const getOrCreateFont = name => {
  if (fontCache[name]) return fontCache[name];

  const font = new StandardFont(name);
  fontCache[name] = font;

  return font;
};

const shouldFallbackToFont = (codePoint, font) => {
  return (
    !IGNORED_CODE_POINTS.includes(codePoint) &&
    !font.hasGlyphForCodePoint(codePoint) &&
    getFallbackFont().hasGlyphForCodePoint(codePoint)
  );
};

const fontSubstitution = () => ({ string, runs }) => {
  let lastFont = null;
  let lastIndex = 0;
  let index = 0;

  const res = [];

  for (const run of runs) {
    const defaultFont =
      typeof run.attributes.font === 'string'
        ? getOrCreateFont(run.attributes.font)
        : run.attributes.font;

    if (string.length === 0) {
      res.push({ start: 0, end: 0, attributes: { font: defaultFont } });
      break;
    }

    for (const char of string.slice(run.start, run.end)) {
      const codePoint = char.codePointAt();
      const shouldFallback = shouldFallbackToFont(codePoint, defaultFont);
      const font = shouldFallback ? getFallbackFont() : defaultFont;

      // If the default font does not have a glyph and the fallback font does, we use it
      if (font !== lastFont) {
        if (lastFont) {
          res.push({
            start: lastIndex,
            end: index,
            attributes: { font: lastFont },
          });
        }

        lastFont = font;
        lastIndex = index;
      }

      index += char.length;
    }
  }

  if (lastIndex < string.length) {
    res.push({
      start: lastIndex,
      end: string.length,
      attributes: { font: lastFont },
    });
  }

  return { string, runs: res };
};

export default fontSubstitution;
