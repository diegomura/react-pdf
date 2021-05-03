import r from 'restructure';

let HmtxEntry = new r.Struct({
  advance: r.uint16,
  bearing: r.int16
});

export default new r.Struct({
  metrics:    new r.LazyArray(HmtxEntry, t => t.parent.hhea.numberOfMetrics),
  bearings:   new r.LazyArray(r.int16, t => t.parent.maxp.numGlyphs - t.parent.hhea.numberOfMetrics)
});
