import r from 'restructure';

// font header
export default new r.Struct({
  version:            r.int32,                   // 0x00010000 (version 1.0)
  revision:           r.int32,                   // set by font manufacturer
  checkSumAdjustment: r.uint32,
  magicNumber:        r.uint32,                  // set to 0x5F0F3CF5
  flags:              r.uint16,
  unitsPerEm:         r.uint16,                  // range from 64 to 16384
  created:            new r.Array(r.int32, 2),
  modified:           new r.Array(r.int32, 2),
  xMin:               r.int16,                   // for all glyph bounding boxes
  yMin:               r.int16,                   // for all glyph bounding boxes
  xMax:               r.int16,                   // for all glyph bounding boxes
  yMax:               r.int16,                   // for all glyph bounding boxes
  macStyle:           new r.Bitfield(r.uint16, [
    'bold', 'italic', 'underline', 'outline',
    'shadow', 'condensed', 'extended'
  ]),
  lowestRecPPEM:      r.uint16,                  // smallest readable size in pixels
  fontDirectionHint:  r.int16,
  indexToLocFormat:   r.int16,                   // 0 for short offsets, 1 for long
  glyphDataFormat:    r.int16                    // 0 for current format
});
