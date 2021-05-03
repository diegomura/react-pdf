import r from 'restructure';

// PostScript information
export default new r.VersionedStruct(r.fixed32, {
  header: { // these fields exist at the top of all versions
    italicAngle:        r.fixed32, // Italic angle in counter-clockwise degrees from the vertical.
    underlinePosition:  r.int16,   // Suggested distance of the top of the underline from the baseline
    underlineThickness: r.int16,   // Suggested values for the underline thickness
    isFixedPitch:       r.uint32,  // Whether the font is monospaced
    minMemType42:       r.uint32,  // Minimum memory usage when a TrueType font is downloaded as a Type 42 font
    maxMemType42:       r.uint32,  // Maximum memory usage when a TrueType font is downloaded as a Type 42 font
    minMemType1:        r.uint32,  // Minimum memory usage when a TrueType font is downloaded as a Type 1 font
    maxMemType1:        r.uint32   // Maximum memory usage when a TrueType font is downloaded as a Type 1 font
  },

  1: {}, // version 1 has no additional fields

  2: {
    numberOfGlyphs: r.uint16,
    glyphNameIndex: new r.Array(r.uint16, 'numberOfGlyphs'),
    names:          new r.Array(new r.String(r.uint8))
  },

  2.5: {
    numberOfGlyphs: r.uint16,
    offsets:        new r.Array(r.uint8, 'numberOfGlyphs')
  },

  3: {}, // version 3 has no additional fields

  4: {
    map: new r.Array(r.uint32, t => t.parent.maxp.numGlyphs)
  }
});
