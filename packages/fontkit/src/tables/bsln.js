import r from 'restructure';
import { LookupTable } from './aat';

let BslnSubtable = new r.VersionedStruct('format', {
  0: { // Distance-based, no mapping
    deltas: new r.Array(r.int16, 32)
  },

  1: { // Distance-based, with mapping
    deltas: new r.Array(r.int16, 32),
    mappingData: new LookupTable(r.uint16)
  },

  2: { // Control point-based, no mapping
    standardGlyph: r.uint16,
    controlPoints: new r.Array(r.uint16, 32)
  },

  3: { // Control point-based, with mapping
    standardGlyph: r.uint16,
    controlPoints: new r.Array(r.uint16, 32),
    mappingData: new LookupTable(r.uint16)
  }
});

export default new r.Struct({
  version: r.fixed32,
  format: r.uint16,
  defaultBaseline: r.uint16,
  subtable: BslnSubtable
});
