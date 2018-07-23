import StandardFont from './standardFont';

export default () => ({ Run }) =>
  class FontSubstitutionEngine {
    constructor() {
      this.fallbackFontInstance = null;
    }

    get fallbackFont() {
      if (!this.fallbackFontInstance) {
        this.fallbackFontInstance = new StandardFont('Helvetica');
      }

      return this.fallbackFontInstance;
    }

    getRuns(string, runs) {
      const res = [];
      let lastFont = null;
      let lastIndex = 0;
      let index = 0;

      for (const run of runs) {
        let defaultFont;

        if (typeof run.attributes.font === 'string') {
          defaultFont = new StandardFont(run.attributes.font);
        } else {
          defaultFont = run.attributes.font;
        }

        if (string.length === 0) {
          res.push(new Run(0, 0, { font: defaultFont }));
          break;
        }

        for (const char of string.slice(run.start, run.end)) {
          const codePoint = char.codePointAt();
          let font = defaultFont;

          // If the default font does not have a glyph
          // and the fallback font does, we use it
          if (
            !defaultFont.hasGlyphForCodePoint(codePoint) &&
            this.fallbackFont.hasGlyphForCodePoint(codePoint)
          ) {
            font = this.fallbackFont;
          }

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
