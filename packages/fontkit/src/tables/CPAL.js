import r from 'restructure';

let ColorRecord = new r.Struct({
  blue: r.uint8,
  green: r.uint8,
  red: r.uint8,
  alpha: r.uint8
});

export default new r.VersionedStruct(r.uint16, {
  header: {
    numPaletteEntries: r.uint16,
    numPalettes: r.uint16,
    numColorRecords: r.uint16,
    colorRecords: new r.Pointer(r.uint32, new r.Array(ColorRecord, 'numColorRecords')),
    colorRecordIndices: new r.Array(r.uint16, 'numPalettes'),
  },
  0: {},
  1: {
    offsetPaletteTypeArray: new r.Pointer(r.uint32, new r.Array(r.uint32, 'numPalettes')),
    offsetPaletteLabelArray: new r.Pointer(r.uint32, new r.Array(r.uint16, 'numPalettes')),
    offsetPaletteEntryLabelArray: new r.Pointer(r.uint32, new r.Array(r.uint16, 'numPaletteEntries'))
  }
});
