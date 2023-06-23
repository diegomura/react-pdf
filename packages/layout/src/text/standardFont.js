/* eslint-disable class-methods-use-this */

import { PDFFont } from '@nutshelllabs/pdfkit';

class StandardFont {
  constructor(src) {
    this.name = src;
    this.src = PDFFont.open(null, src);
  }

  encode(str) {
    return this.src.encode(str);
  }

  layout(str) {
    const [encoded, positions] = this.encode(str);

    return {
      positions,
      stringIndices: positions.map((_, i) => i),
      glyphs: encoded.map((g, i) => {
        const glyph = this.getGlyph(parseInt(g, 16));
        glyph.advanceWidth = positions[i].advanceWidth;
        return glyph;
      }),
    };
  }

  glyphForCodePoint(codePoint) {
    const glyph = this.getGlyph(codePoint);
    glyph.advanceWidth = 400;
    return glyph;
  }

  getGlyph(id) {
    return {
      id,
      _font: this.src,
      codePoints: [id],
      isLigature: false,
      name: this.src.font.characterToGlyph(id),
    };
  }

  hasGlyphForCodePoint(codePoint) {
    return this.src.font.characterToGlyph(codePoint) !== '.notdef';
  }

  // Based on empirical observation
  get ascent() {
    return 900;
  }

  // Based on empirical observation
  get capHeight() {
    switch (this.name) {
      case 'Times-Roman':
      case 'Times-Bold':
      case 'Times-Italic':
      case 'Times-BoldItalic':
        return 650;
      case 'Courier':
      case 'Courier-Bold':
      case 'Courier-Oblique':
      case 'Courier-BoldOblique':
        return 550;
      default:
        return 690;
    }
  }

  // Based on empirical observation
  get xHeight() {
    switch (this.name) {
      case 'Times-Roman':
      case 'Times-Bold':
      case 'Times-Italic':
      case 'Times-BoldItalic':
        return 440;
      case 'Courier':
      case 'Courier-Bold':
      case 'Courier-Oblique':
      case 'Courier-BoldOblique':
        return 390;
      default:
        return 490;
    }
  }

  // Based on empirical observation
  get descent() {
    switch (this.name) {
      case 'Times-Roman':
      case 'Times-Bold':
      case 'Times-Italic':
      case 'Times-BoldItalic':
        return -220;
      case 'Courier':
      case 'Courier-Bold':
      case 'Courier-Oblique':
      case 'Courier-BoldOblique':
        return -230;
      default:
        return -200;
    }
  }

  get lineGap() {
    return 0;
  }

  get unitsPerEm() {
    return 1000;
  }
}

export default StandardFont;
