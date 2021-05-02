// Updated: 417af0c79c5664271a07a783574ec7fac7ebad0c

import TTFGlyph from './TTFGlyph';

/**
 * Represents a TrueType glyph in the WOFF2 format, which compresses glyphs differently.
 */
export default class WOFF2Glyph extends TTFGlyph {
  _decode() {
    // We have to decode in advance (in WOFF2Font), so just return the pre-decoded data.
    return this._font._transformedGlyphs[this.id];
  }

  _getCBox() {
    return this.path.bbox;
  }
}
