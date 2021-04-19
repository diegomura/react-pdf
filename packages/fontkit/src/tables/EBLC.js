import r from 'restructure';
import {BigMetrics} from './EBDT';

let SBitLineMetrics = new r.Struct({
  ascender: r.int8,
  descender: r.int8,
  widthMax: r.uint8,
  caretSlopeNumerator: r.int8,
  caretSlopeDenominator: r.int8,
  caretOffset: r.int8,
  minOriginSB: r.int8,
  minAdvanceSB: r.int8,
  maxBeforeBL: r.int8,
  minAfterBL: r.int8,
  pad: new r.Reserved(r.int8, 2)
});

let CodeOffsetPair = new r.Struct({
  glyphCode: r.uint16,
  offset: r.uint16
});

let IndexSubtable = new r.VersionedStruct(r.uint16, {
  header: {
    imageFormat: r.uint16,
    imageDataOffset: r.uint32
  },

  1: {
    offsetArray: new r.Array(r.uint32, t => t.parent.lastGlyphIndex - t.parent.firstGlyphIndex + 1)
  },

  2: {
    imageSize: r.uint32,
    bigMetrics: BigMetrics
  },

  3: {
    offsetArray: new r.Array(r.uint16, t => t.parent.lastGlyphIndex - t.parent.firstGlyphIndex + 1)
  },

  4: {
    numGlyphs: r.uint32,
    glyphArray: new r.Array(CodeOffsetPair, t => t.numGlyphs + 1)
  },

  5: {
    imageSize: r.uint32,
    bigMetrics: BigMetrics,
    numGlyphs: r.uint32,
    glyphCodeArray: new r.Array(r.uint16, 'numGlyphs')
  }
});

let IndexSubtableArray = new r.Struct({
  firstGlyphIndex: r.uint16,
  lastGlyphIndex: r.uint16,
  subtable: new r.Pointer(r.uint32, IndexSubtable)
});

let BitmapSizeTable = new r.Struct({
  indexSubTableArray: new r.Pointer(r.uint32, new r.Array(IndexSubtableArray, 1), { type: 'parent' }),
  indexTablesSize: r.uint32,
  numberOfIndexSubTables: r.uint32,
  colorRef: r.uint32,
  hori: SBitLineMetrics,
  vert: SBitLineMetrics,
  startGlyphIndex: r.uint16,
  endGlyphIndex: r.uint16,
  ppemX: r.uint8,
  ppemY: r.uint8,
  bitDepth: r.uint8,
  flags: new r.Bitfield(r.uint8, ['horizontal', 'vertical'])
});

export default new r.Struct({
  version:  r.uint32, // 0x00020000
  numSizes: r.uint32,
  sizes:    new r.Array(BitmapSizeTable, 'numSizes')
});
