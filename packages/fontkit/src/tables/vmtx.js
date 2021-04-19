import r from 'restructure';

let VmtxEntry = new r.Struct({
  advance: r.uint16,  // The advance height of the glyph
  bearing: r.int16    // The top sidebearing of the glyph
});

// Vertical Metrics Table
export default new r.Struct({
  metrics:  new r.LazyArray(VmtxEntry, t => t.parent.vhea.numberOfMetrics),
  bearings: new r.LazyArray(r.int16, t => t.parent.maxp.numGlyphs - t.parent.vhea.numberOfMetrics)
});
