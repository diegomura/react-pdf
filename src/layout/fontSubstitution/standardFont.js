import { PDFFont } from '@react-pdf/pdfkit';

class StandardFont {
  constructor(src) {
    this.name = src;
    this.src = PDFFont.open(null, src);
  }

  layout(str) {
    const [encoded, positions] = this.src.encode(str);

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

  get ascent() {
    return this.src.ascender;
  }

  get descent() {
    return this.src.descender;
  }

  get lineGap() {
    return this.src.lineGap;
  }

  get unitsPerEm() {
    return 1000;
  }
}

export default StandardFont;
