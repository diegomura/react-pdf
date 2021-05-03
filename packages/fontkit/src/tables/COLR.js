import r from 'restructure';

let LayerRecord = new r.Struct({
  gid: r.uint16,          // Glyph ID of layer glyph (must be in z-order from bottom to top).
  paletteIndex: r.uint16  // Index value to use in the appropriate palette. This value must
});                       // be less than numPaletteEntries in the CPAL table, except for
                          // the special case noted below. Each palette entry is 16 bits.
                          // A palette index of 0xFFFF is a special case indicating that
                          // the text foreground color should be used.

let BaseGlyphRecord = new r.Struct({
  gid: r.uint16,             // Glyph ID of reference glyph. This glyph is for reference only
                             // and is not rendered for color.
  firstLayerIndex: r.uint16, // Index (from beginning of the Layer Records) to the layer record.
                             // There will be numLayers consecutive entries for this base glyph.
  numLayers: r.uint16
});

export default new r.Struct({
  version: r.uint16,
  numBaseGlyphRecords: r.uint16,
  baseGlyphRecord: new r.Pointer(r.uint32, new r.Array(BaseGlyphRecord, 'numBaseGlyphRecords')),
  layerRecords: new r.Pointer(r.uint32, new r.Array(LayerRecord, 'numLayerRecords'), { lazy: true }),
  numLayerRecords: r.uint16
});
