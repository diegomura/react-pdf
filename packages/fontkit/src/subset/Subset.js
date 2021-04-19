import r from 'restructure';

export default class Subset {
  constructor(font) {
    this.font = font;
    this.glyphs = [];
    this.mapping = {};

    // always include the missing glyph
    this.includeGlyph(0);
  }

  includeGlyph(glyph) {
    if (typeof glyph === 'object') {
      glyph = glyph.id;
    }

    if (this.mapping[glyph] == null) {
      this.glyphs.push(glyph);
      this.mapping[glyph] = this.glyphs.length - 1;
    }

    return this.mapping[glyph];
  }

  encodeStream() {
    let s = new r.EncodeStream();

    process.nextTick(() => {
      this.encode(s);
      return s.end();
    });

    return s;
  }
}
