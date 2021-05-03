import r from 'restructure';
import {ScriptList, FeatureList, LookupList, Coverage, ClassDef, Device, Context, ChainingContext} from './opentype';
import {FeatureVariations} from './variations';

let ValueFormat = new r.Bitfield(r.uint16, [
  'xPlacement', 'yPlacement',
  'xAdvance', 'yAdvance',
  'xPlaDevice', 'yPlaDevice',
  'xAdvDevice', 'yAdvDevice'
]);

let types = {
  xPlacement: r.int16,
  yPlacement: r.int16,
  xAdvance:   r.int16,
  yAdvance:   r.int16,
  xPlaDevice: new r.Pointer(r.uint16, Device, { type: 'global', relativeTo: 'rel' }),
  yPlaDevice: new r.Pointer(r.uint16, Device, { type: 'global', relativeTo: 'rel' }),
  xAdvDevice: new r.Pointer(r.uint16, Device, { type: 'global', relativeTo: 'rel' }),
  yAdvDevice: new r.Pointer(r.uint16, Device, { type: 'global', relativeTo: 'rel' })
};

class ValueRecord {
  constructor(key = 'valueFormat') {
    this.key = key;
  }

  buildStruct(parent) {
    let struct = parent;
    while (!struct[this.key] && struct.parent) {
      struct = struct.parent;
    }

    if (!struct[this.key]) return;

    let fields = {};
    fields.rel = () => struct._startOffset;

    let format = struct[this.key];
    for (let key in format) {
      if (format[key]) {
        fields[key] = types[key];
      }
    }

    return new r.Struct(fields);
  }

  size(val, ctx) {
    return this.buildStruct(ctx).size(val, ctx);
  }

  decode(stream, parent) {
    let res = this.buildStruct(parent).decode(stream, parent);
    delete res.rel;
    return res;
  }
}

let PairValueRecord = new r.Struct({
  secondGlyph:    r.uint16,
  value1:         new ValueRecord('valueFormat1'),
  value2:         new ValueRecord('valueFormat2')
});

let PairSet = new r.Array(PairValueRecord, r.uint16);

let Class2Record = new r.Struct({
  value1: new ValueRecord('valueFormat1'),
  value2: new ValueRecord('valueFormat2')
});

let Anchor = new r.VersionedStruct(r.uint16, {
  1: { // Design units only
    xCoordinate:    r.int16,
    yCoordinate:    r.int16
  },

  2: { // Design units plus contour point
    xCoordinate:    r.int16,
    yCoordinate:    r.int16,
    anchorPoint:    r.uint16
  },

  3: { // Design units plus Device tables
    xCoordinate:    r.int16,
    yCoordinate:    r.int16,
    xDeviceTable:   new r.Pointer(r.uint16, Device),
    yDeviceTable:   new r.Pointer(r.uint16, Device)
  }
});

let EntryExitRecord = new r.Struct({
  entryAnchor:    new r.Pointer(r.uint16, Anchor, {type: 'parent'}),
  exitAnchor:     new r.Pointer(r.uint16, Anchor, {type: 'parent'})
});

let MarkRecord = new r.Struct({
  class:      r.uint16,
  markAnchor: new r.Pointer(r.uint16, Anchor, {type: 'parent'})
});

let MarkArray = new r.Array(MarkRecord, r.uint16);

let BaseRecord  = new r.Array(new r.Pointer(r.uint16, Anchor), t => t.parent.classCount);
let BaseArray   = new r.Array(BaseRecord, r.uint16);

let ComponentRecord = new r.Array(new r.Pointer(r.uint16, Anchor), t => t.parent.parent.classCount);
let LigatureAttach  = new r.Array(ComponentRecord, r.uint16);
let LigatureArray   = new r.Array(new r.Pointer(r.uint16, LigatureAttach), r.uint16);

let GPOSLookup = new r.VersionedStruct('lookupType', {
  1: new r.VersionedStruct(r.uint16, { // Single Adjustment
    1: { // Single positioning value
      coverage:       new r.Pointer(r.uint16, Coverage),
      valueFormat:    ValueFormat,
      value:          new ValueRecord()
    },
    2: {
      coverage:       new r.Pointer(r.uint16, Coverage),
      valueFormat:    ValueFormat,
      valueCount:     r.uint16,
      values:         new r.LazyArray(new ValueRecord(), 'valueCount')
    }
  }),

  2: new r.VersionedStruct(r.uint16, { // Pair Adjustment Positioning
    1: { // Adjustments for glyph pairs
      coverage:       new r.Pointer(r.uint16, Coverage),
      valueFormat1:   ValueFormat,
      valueFormat2:   ValueFormat,
      pairSetCount:   r.uint16,
      pairSets:       new r.LazyArray(new r.Pointer(r.uint16, PairSet), 'pairSetCount')
    },

    2: { // Class pair adjustment
      coverage:       new r.Pointer(r.uint16, Coverage),
      valueFormat1:   ValueFormat,
      valueFormat2:   ValueFormat,
      classDef1:      new r.Pointer(r.uint16, ClassDef),
      classDef2:      new r.Pointer(r.uint16, ClassDef),
      class1Count:    r.uint16,
      class2Count:    r.uint16,
      classRecords:   new r.LazyArray(new r.LazyArray(Class2Record, 'class2Count'), 'class1Count')
    }
  }),

  3: { // Cursive Attachment Positioning
    format:             r.uint16,
    coverage:           new r.Pointer(r.uint16, Coverage),
    entryExitCount:     r.uint16,
    entryExitRecords:   new r.Array(EntryExitRecord, 'entryExitCount')
  },

  4: { // MarkToBase Attachment Positioning
    format:             r.uint16,
    markCoverage:       new r.Pointer(r.uint16, Coverage),
    baseCoverage:       new r.Pointer(r.uint16, Coverage),
    classCount:         r.uint16,
    markArray:          new r.Pointer(r.uint16, MarkArray),
    baseArray:          new r.Pointer(r.uint16, BaseArray)
  },

  5: { // MarkToLigature Attachment Positioning
    format:             r.uint16,
    markCoverage:       new r.Pointer(r.uint16, Coverage),
    ligatureCoverage:   new r.Pointer(r.uint16, Coverage),
    classCount:         r.uint16,
    markArray:          new r.Pointer(r.uint16, MarkArray),
    ligatureArray:      new r.Pointer(r.uint16, LigatureArray)
  },

  6: { // MarkToMark Attachment Positioning
    format:             r.uint16,
    mark1Coverage:      new r.Pointer(r.uint16, Coverage),
    mark2Coverage:      new r.Pointer(r.uint16, Coverage),
    classCount:         r.uint16,
    mark1Array:         new r.Pointer(r.uint16, MarkArray),
    mark2Array:         new r.Pointer(r.uint16, BaseArray)
  },

  7: Context,          // Contextual positioning
  8: ChainingContext,  // Chaining contextual positioning

  9: { // Extension Positioning
    posFormat:   r.uint16,
    lookupType:  r.uint16,   // cannot also be 9
    extension:   new r.Pointer(r.uint32, GPOSLookup)
  }
});

// Fix circular reference
GPOSLookup.versions[9].extension.type = GPOSLookup;

export default new r.VersionedStruct(r.uint32, {
  header: {
    scriptList:     new r.Pointer(r.uint16, ScriptList),
    featureList:    new r.Pointer(r.uint16, FeatureList),
    lookupList:     new r.Pointer(r.uint16, new LookupList(GPOSLookup))
  },

  0x00010000: {},
  0x00010001: {
    featureVariations: new r.Pointer(r.uint32, FeatureVariations)
  }
});

// export GPOSLookup for JSTF table
export { GPOSLookup };
