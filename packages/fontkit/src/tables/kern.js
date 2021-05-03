import r from 'restructure';

let KernPair = new r.Struct({
  left:   r.uint16,
  right:  r.uint16,
  value:  r.int16
});

let ClassTable = new r.Struct({
  firstGlyph: r.uint16,
  nGlyphs: r.uint16,
  offsets: new r.Array(r.uint16, 'nGlyphs'),
  max: t => t.offsets.length && Math.max.apply(Math, t.offsets)
});

let Kern2Array = new r.Struct({
  off: t => t._startOffset - t.parent.parent._startOffset,
  len: t => (((t.parent.leftTable.max - t.off) / t.parent.rowWidth) + 1) * (t.parent.rowWidth / 2),
  values: new r.LazyArray(r.int16, 'len')
});

let KernSubtable = new r.VersionedStruct('format', {
  0: {
    nPairs:         r.uint16,
    searchRange:    r.uint16,
    entrySelector:  r.uint16,
    rangeShift:     r.uint16,
    pairs:          new r.Array(KernPair, 'nPairs')
  },

  2: {
    rowWidth:   r.uint16,
    leftTable:  new r.Pointer(r.uint16, ClassTable, {type: 'parent'}),
    rightTable: new r.Pointer(r.uint16, ClassTable, {type: 'parent'}),
    array:      new r.Pointer(r.uint16, Kern2Array, {type: 'parent'})
  },

  3: {
    glyphCount:       r.uint16,
    kernValueCount:   r.uint8,
    leftClassCount:   r.uint8,
    rightClassCount:  r.uint8,
    flags:            r.uint8,
    kernValue:        new r.Array(r.int16, 'kernValueCount'),
    leftClass:        new r.Array(r.uint8, 'glyphCount'),
    rightClass:       new r.Array(r.uint8, 'glyphCount'),
    kernIndex:        new r.Array(r.uint8, t => t.leftClassCount * t.rightClassCount)
  }
});

let KernTable = new r.VersionedStruct('version', {
  0: { // Microsoft uses this format
    subVersion: r.uint16,  // Microsoft has an extra sub-table version number
    length:     r.uint16,  // Length of the subtable, in bytes
    format:     r.uint8,   // Format of subtable
    coverage:   new r.Bitfield(r.uint8, [
      'horizontal',    // 1 if table has horizontal data, 0 if vertical
      'minimum',       // If set to 1, the table has minimum values. If set to 0, the table has kerning values.
      'crossStream',   // If set to 1, kerning is perpendicular to the flow of the text
      'override'      // If set to 1 the value in this table replaces the accumulated value
    ]),
    subtable:   KernSubtable,
    padding: new r.Reserved(r.uint8, t => t.length - t._currentOffset)
  },
  1: { // Apple uses this format
    length:     r.uint32,
    coverage:   new r.Bitfield(r.uint8, [
      null, null, null, null, null,
      'variation',     // Set if table has variation kerning values
      'crossStream',   // Set if table has cross-stream kerning values
      'vertical'      // Set if table has vertical kerning values
    ]),
    format:     r.uint8,
    tupleIndex: r.uint16,
    subtable:   KernSubtable,
    padding: new r.Reserved(r.uint8, t => t.length - t._currentOffset)
  }
});

export default new r.VersionedStruct(r.uint16, {
  0: { // Microsoft Version
    nTables:    r.uint16,
    tables:     new r.Array(KernTable, 'nTables')
  },

  1: { // Apple Version
    reserved:   new r.Reserved(r.uint16), // the other half of the version number
    nTables:    r.uint32,
    tables:     new r.Array(KernTable, 'nTables')
  }
});
