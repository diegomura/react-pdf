import r from 'restructure';
import { LookupTable, StateTable1 } from './aat';

let ClassTable = new r.Struct({
  length: r.uint16,
  coverage: r.uint16,
  subFeatureFlags: r.uint32,
  stateTable: new StateTable1
});

let WidthDeltaRecord = new r.Struct({
  justClass: r.uint32,
  beforeGrowLimit: r.fixed32,
  beforeShrinkLimit: r.fixed32,
  afterGrowLimit: r.fixed32,
  afterShrinkLimit: r.fixed32,
  growFlags: r.uint16,
  shrinkFlags: r.uint16
});

let WidthDeltaCluster = new r.Array(WidthDeltaRecord, r.uint32);

let ActionData = new r.VersionedStruct('actionType', {
  0: { // Decomposition action
    lowerLimit: r.fixed32,
    upperLimit: r.fixed32,
    order: r.uint16,
    glyphs: new r.Array(r.uint16, r.uint16)
  },

  1: { // Unconditional add glyph action
    addGlyph: r.uint16
  },

  2: { // Conditional add glyph action
    substThreshold: r.fixed32,
    addGlyph: r.uint16,
    substGlyph: r.uint16
  },

  3: {}, // Stretch glyph action (no data, not supported by CoreText)

  4: { // Ductile glyph action (not supported by CoreText)
    variationAxis: r.uint32,
    minimumLimit: r.fixed32,
    noStretchValue: r.fixed32,
    maximumLimit: r.fixed32
  },

  5: { // Repeated add glyph action
    flags: r.uint16,
    glyph: r.uint16
  }
});

let Action = new r.Struct({
  actionClass: r.uint16,
  actionType: r.uint16,
  actionLength: r.uint32,
  actionData: ActionData,
  padding: new r.Reserved(r.uint8, t => t.actionLength - t._currentOffset)
});

let PostcompensationAction = new r.Array(Action, r.uint32);
let PostCompensationTable = new r.Struct({
  lookupTable: new LookupTable(new r.Pointer(r.uint16, PostcompensationAction))
});

let JustificationTable = new r.Struct({
  classTable: new r.Pointer(r.uint16, ClassTable, { type: 'parent' }),
  wdcOffset: r.uint16,
  postCompensationTable: new r.Pointer(r.uint16, PostCompensationTable, { type: 'parent' }),
  widthDeltaClusters: new LookupTable(new r.Pointer(r.uint16, WidthDeltaCluster, { type: 'parent', relativeTo: ctx => ctx.wdcOffset }))
});

export default new r.Struct({
  version: r.uint32,
  format: r.uint16,
  horizontal: new r.Pointer(r.uint16, JustificationTable),
  vertical: new r.Pointer(r.uint16, JustificationTable)
});
