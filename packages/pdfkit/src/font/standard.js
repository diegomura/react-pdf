import AFMFont from './afm';
import FontData from './data/index.json';
// import Courier from './data/Courier.json';
// import CourierBold from './data/Courier-Bold.json';
// import CourierOblique from './data/Courier-Oblique.json';
// import Helvetica from './data/Helvetica.json';
// import HelveticaBold from './data/Helvetica-Bold.json';
// import HelveticaOblique from './data/Helvetica-Oblique.json';
// import TimesRoman from './data/Times-Roman.json';
// import TimesBold from './data/Times-Bold.json';
// import TimesItalic from './data/Times-Italic.json';

const STANDARD_FONTS = FontData;

// const STANDARD_FONTS = {
// Courier,
// 'Courier-Bold': CourierBold,
// 'Courier-Oblique': CourierOblique,
// Helvetica,
// 'Helvetica-Bold': HelveticaBold,
// 'Helvetica-Oblique': HelveticaOblique,
// 'Times-Roman': TimesRoman,
// 'Times-Bold': TimesBold,
// 'Times-Italic': TimesItalic
// };

const createStandardFont = PDFFont =>
  class StandardFont extends PDFFont {
    constructor(document, name, id) {
      super();

      this.document = document;
      this.name = name;
      this.id = id;
      this.font = AFMFont.fromJson(STANDARD_FONTS[this.name]);
      this.ascender = this.font.ascender;
      this.descender = this.font.descender;
      this.bbox = this.font.bbox;
      this.lineGap = this.font.lineGap;
    }

    embed() {
      this.dictionary.data = {
        Type: 'Font',
        BaseFont: this.name,
        Subtype: 'Type1',
        Encoding: 'WinAnsiEncoding'
      };

      return this.dictionary.end();
    }

    encode(text) {
      const encoded = this.font.encodeText(text);
      const glyphs = this.font.glyphsForString(`${text}`);
      const advances = this.font.advancesForGlyphs(glyphs);
      const positions = [];

      for (let i = 0; i < glyphs.length; i++) {
        const glyph = glyphs[i];
        positions.push({
          xAdvance: advances[i],
          yAdvance: 0,
          xOffset: 0,
          yOffset: 0,
          advanceWidth: this.font.widthOfGlyph(glyph)
        });
      }

      return [encoded, positions];
    }

    encodeGlyphs(glyphs) {
      const res = [];

      for (let glyph of Array.from(glyphs)) {
        res.push(`00${glyph.id.toString(16)}`.slice(-2));
      }

      return res;
    }

    widthOfString(string, size) {
      const glyphs = this.font.glyphsForString(`${string}`);
      const advances = this.font.advancesForGlyphs(glyphs);

      let width = 0;
      for (let advance of Array.from(advances)) {
        width += advance;
      }

      const scale = size / 1000;
      return width * scale;
    }

    static isStandardFont(name) {
      return name in STANDARD_FONTS;
    }
  };

export default createStandardFont;
