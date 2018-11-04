import StandardFont from './standardFont';

export default () => ({ Run }) =>
  class FontSubstitutionEngine {
    constructor() {
      this.fontCache = {};
    }

    get fallbackFont() {
      return this.getOrCreateFont('Helvetica');
    }

    getOrCreateFont(name) {
      if (this.fontCache[name]) return this.fontCache[name];

      const font = new StandardFont(name);
      this.fontCache[name] = font;

      return font;
    }

    shouldFallbackToFont(codePoint, font) {
      return (
        !font.hasGlyphForCodePoint(codePoint) &&
        this.fallbackFont.hasGlyphForCodePoint(codePoint)
      );
    }

    getRuns(string, runs) {
      const res = [];
      let lastFont = null;
      let lastIndex = 0;
      let index = 0;

      for (const run of runs) {
        const defaultFont =
          typeof run.attributes.font === 'string'
            ? this.getOrCreateFont(run.attributes.font)
            : run.attributes.font;

        if (string.length === 0) {
          res.push(new Run(0, 0, { font: defaultFont }));
          break;
        }

        for (const char of string.slice(run.start, run.end)) {
          const codePoint = char.codePointAt();
          const font = this.shouldFallbackToFont(codePoint, defaultFont)
            ? this.fallbackFont
            : defaultFont;

          // If the default font does not have a glyph and the fallback font does, we use it
          if (font !== lastFont) {
            if (lastFont) {
              res.push(new Run(lastIndex, index, { font: lastFont }));
            }

            lastFont = font;
            lastIndex = index;
          }

          index += char.length;
        }
      }

      if (lastIndex < string.length) {
        res.push(new Run(lastIndex, string.length, { font: lastFont }));
      }

      return res;
    }
  };
