import r from 'restructure';

let ImageTable = new r.Struct({
  ppem: r.uint16,
  resolution: r.uint16,
  imageOffsets: new r.Array(new r.Pointer(r.uint32, 'void'), t => t.parent.parent.maxp.numGlyphs + 1)
});

// This is the Apple sbix table, used by the "Apple Color Emoji" font.
// It includes several image tables with images for each bitmap glyph
// of several different sizes.
export default new r.Struct({
  version: r.uint16,
  flags: new r.Bitfield(r.uint16, ['renderOutlines']),
  numImgTables: r.uint32,
  imageTables: new r.Array(new r.Pointer(r.uint32, ImageTable), 'numImgTables')
});
