import r from 'restructure';

var OS2 = new r.VersionedStruct(r.uint16, {
  header: {
    xAvgCharWidth:          r.int16,   // average weighted advance width of lower case letters and space
    usWeightClass:          r.uint16,  // visual weight of stroke in glyphs
    usWidthClass:           r.uint16,  // relative change from the normal aspect ratio (width to height ratio)
    fsType:                 new r.Bitfield(r.uint16, [ // Indicates font embedding licensing rights
      null, 'noEmbedding', 'viewOnly', 'editable', null,
      null, null, null, 'noSubsetting', 'bitmapOnly'
    ]),
    ySubscriptXSize:        r.int16,   // recommended horizontal size in pixels for subscripts
    ySubscriptYSize:        r.int16,   // recommended vertical size in pixels for subscripts
    ySubscriptXOffset:      r.int16,   // recommended horizontal offset for subscripts
    ySubscriptYOffset:      r.int16,   // recommended vertical offset form the baseline for subscripts
    ySuperscriptXSize:      r.int16,   // recommended horizontal size in pixels for superscripts
    ySuperscriptYSize:      r.int16,   // recommended vertical size in pixels for superscripts
    ySuperscriptXOffset:    r.int16,   // recommended horizontal offset for superscripts
    ySuperscriptYOffset:    r.int16,   // recommended vertical offset from the baseline for superscripts
    yStrikeoutSize:         r.int16,   // width of the strikeout stroke
    yStrikeoutPosition:     r.int16,   // position of the strikeout stroke relative to the baseline
    sFamilyClass:           r.int16,   // classification of font-family design
    panose:                 new r.Array(r.uint8, 10),   // describe the visual characteristics of a given typeface
    ulCharRange:            new r.Array(r.uint32, 4),
    vendorID:               new r.String(4),          // four character identifier for the font vendor
    fsSelection:            new r.Bitfield(r.uint16, [  // bit field containing information about the font
      'italic', 'underscore', 'negative', 'outlined', 'strikeout',
      'bold', 'regular', 'useTypoMetrics', 'wws', 'oblique'
    ]),
    usFirstCharIndex:       r.uint16,  // The minimum Unicode index in this font
    usLastCharIndex:        r.uint16   // The maximum Unicode index in this font
  },

  // The Apple version of this table ends here, but the Microsoft one continues on...
  0: {},

  1: {
    typoAscender:       r.int16,
    typoDescender:      r.int16,
    typoLineGap:        r.int16,
    winAscent:          r.uint16,
    winDescent:         r.uint16,
    codePageRange:      new r.Array(r.uint32, 2)
  },

  2: {
    // these should be common with version 1 somehow
    typoAscender:       r.int16,
    typoDescender:      r.int16,
    typoLineGap:        r.int16,
    winAscent:          r.uint16,
    winDescent:         r.uint16,
    codePageRange:      new r.Array(r.uint32, 2),

    xHeight:            r.int16,
    capHeight:          r.int16,
    defaultChar:        r.uint16,
    breakChar:          r.uint16,
    maxContent:         r.uint16
  },

  5: {
    typoAscender:       r.int16,
    typoDescender:      r.int16,
    typoLineGap:        r.int16,
    winAscent:          r.uint16,
    winDescent:         r.uint16,
    codePageRange:      new r.Array(r.uint32, 2),

    xHeight:            r.int16,
    capHeight:          r.int16,
    defaultChar:        r.uint16,
    breakChar:          r.uint16,
    maxContent:         r.uint16,

    usLowerOpticalPointSize: r.uint16,
    usUpperOpticalPointSize: r.uint16
  }
});

let versions = OS2.versions;
versions[3] = versions[4] = versions[2];

export default OS2;
