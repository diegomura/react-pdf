// Updated: 417af0c79c5664271a07a783574ec7fac7ebad0c

import r from 'restructure';

const HmtxEntry = new r.Struct({
  advance: r.uint16,
  bearing: r.int16
});

export default new r.Struct({
  metrics:    new r.LazyArray(HmtxEntry, t => t.parent.hhea.numberOfMetrics),
  bearings:   new r.LazyArray(r.int16, t => t.parent.maxp.numGlyphs - t.parent.hhea.numberOfMetrics)
});
