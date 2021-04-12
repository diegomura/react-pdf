import LZString from 'lz-string';
import AFMFont from './afm';
import Courier from './data/Courier.b64.afm';
import CourierBold from './data/Courier-Bold.b64.afm';
import CourierOblique from './data/Courier-Oblique.b64.afm';
import Helvetica from './data/Helvetica.b64.afm';
import HelveticaBold from './data/Helvetica-Bold.b64.afm';
import HelveticaOblique from './data/Helvetica-Oblique.b64.afm';
import TimesRoman from './data/Times-Roman.b64.afm';
import TimesBold from './data/Times-Bold.b64.afm';
import TimesItalic from './data/Times-Italic.b64.afm';

const STANDARD_FONTS = {
  Courier: LZString.decompressFromBase64(Courier),
  'Courier-Bold': LZString.decompressFromBase64(CourierBold),
  'Courier-Oblique': LZString.decompressFromBase64(CourierOblique),
  Helvetica: LZString.decompressFromBase64(Helvetica),
  'Helvetica-Bold': LZString.decompressFromBase64(HelveticaBold),
  'Helvetica-Oblique': LZString.decompressFromBase64(HelveticaOblique),
  'Times-Roman': LZString.decompressFromBase64(TimesRoman),
  'Times-Bold': LZString.decompressFromBase64(TimesBold),
  'Times-Italic': LZString.decompressFromBase64(TimesItalic),
};

const createStandardFont = PDFFont =>
  class StandardFont extends PDFFont {
    constructor(document, name, id) {
      super();

      this.document = document;
      this.name = name;
      this.id = id;
      this.font = new AFMFont(STANDARD_FONTS[this.name]);
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
        Encoding: 'WinAnsiEncoding',
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
          advanceWidth: this.font.widthOfGlyph(glyph),
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
