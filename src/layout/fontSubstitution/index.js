import { pathOr, last } from 'ramda';

import StandardFont from './standardFont';

const fontCache = {};

const IGNORED_CODE_POINTS = [173];

const getFontSize = pathOr(12, ['attributes', 'fontSize']);

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
  let lastFontSize = null;
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
      // If the default font does not have a glyph and the fallback font does, we use it
      const font = shouldFallback ? getFallbackFont() : defaultFont;
      const fontSize = getFontSize(run);

      // If anything that would impact res has changed, update it
      if (font !== lastFont || fontSize !== lastFontSize || font.unitsPerEm !== lastFont.unitsPerEm) {
        if (lastFont) {
          res.push({
            start: lastIndex,
            end: index,
            attributes: {
              font: lastFont,
              scale: lastFontSize / lastFont.unitsPerEm,
            },
          });
        }

        lastFont = font;
        lastFontSize = fontSize;
        lastIndex = index;
      }

      index += char.length;
    }
  }

  if (lastIndex < string.length) {
    const fontSize = getFontSize(last(runs));

    res.push({
      start: lastIndex,
      end: string.length,
      attributes: {
        font: lastFont,
        scale: fontSize / lastFont.unitsPerEm,
      },
    });
  }

  return { string, runs: res };
};

export default fontSubstitution;
