import r from 'restructure';

class UnboundedArrayAccessor {
  constructor(type, stream, parent) {
    this.type = type;
    this.stream = stream;
    this.parent = parent;
    this.base = this.stream.pos;
    this._items = [];
  }

  getItem(index) {
    if (this._items[index] == null) {
      let pos = this.stream.pos;
      this.stream.pos = this.base + this.type.size(null, this.parent) * index;
      this._items[index] = this.type.decode(this.stream, this.parent);
      this.stream.pos = pos;
    }

    return this._items[index];
  }

  inspect() {
    return `[UnboundedArray ${this.type.constructor.name}]`;
  }
}

export class UnboundedArray extends r.Array {
  constructor(type) {
    super(type, 0);
  }

  decode(stream, parent) {
    return new UnboundedArrayAccessor(this.type, stream, parent);
  }
}

export let LookupTable = function(ValueType = r.uint16) {
  // Helper class that makes internal structures invisible to pointers
  class Shadow {
    constructor(type) {
      this.type = type;
    }

    decode(stream, ctx) {
      ctx = ctx.parent.parent;
      return this.type.decode(stream, ctx);
    }

    size(val, ctx) {
      ctx = ctx.parent.parent;
      return this.type.size(val, ctx);
    }

    encode(stream, val, ctx) {
      ctx = ctx.parent.parent;
      return this.type.encode(stream, val, ctx);
    }
  }

  ValueType = new Shadow(ValueType);

  let BinarySearchHeader = new r.Struct({
    unitSize: r.uint16,
    nUnits: r.uint16,
    searchRange: r.uint16,
    entrySelector: r.uint16,
    rangeShift: r.uint16
  });

  let LookupSegmentSingle = new r.Struct({
    lastGlyph: r.uint16,
    firstGlyph: r.uint16,
    value: ValueType
  });

  let LookupSegmentArray = new r.Struct({
    lastGlyph: r.uint16,
    firstGlyph: r.uint16,
    values: new r.Pointer(r.uint16, new r.Array(ValueType, t => t.lastGlyph - t.firstGlyph + 1), {type: 'parent'})
  });

  let LookupSingle = new r.Struct({
    glyph: r.uint16,
    value: ValueType
  });

  return new r.VersionedStruct(r.uint16, {
    0: {
      values: new UnboundedArray(ValueType) // length == number of glyphs maybe?
    },
    2: {
      binarySearchHeader: BinarySearchHeader,
      segments: new r.Array(LookupSegmentSingle, t => t.binarySearchHeader.nUnits)
    },
    4: {
      binarySearchHeader: BinarySearchHeader,
      segments: new r.Array(LookupSegmentArray, t => t.binarySearchHeader.nUnits)
    },
    6: {
      binarySearchHeader: BinarySearchHeader,
      segments: new r.Array(LookupSingle, t => t.binarySearchHeader.nUnits)
    },
    8: {
      firstGlyph: r.uint16,
      count: r.uint16,
      values: new r.Array(ValueType, 'count')
    }
  });
};

export function StateTable(entryData = {}, lookupType = r.uint16) {
  let entry = Object.assign({
    newState: r.uint16,
    flags: r.uint16
  }, entryData);

  let Entry = new r.Struct(entry);
  let StateArray = new UnboundedArray(new r.Array(r.uint16, t => t.nClasses));

  let StateHeader = new r.Struct({
    nClasses: r.uint32,
    classTable: new r.Pointer(r.uint32, new LookupTable(lookupType)),
    stateArray: new r.Pointer(r.uint32, StateArray),
    entryTable: new r.Pointer(r.uint32, new UnboundedArray(Entry))
  });

  return StateHeader;
}

// This is the old version of the StateTable structure
export function StateTable1(entryData = {}, lookupType = r.uint16) {
  let ClassLookupTable = new r.Struct({
    version() { return 8; }, // simulate LookupTable
    firstGlyph: r.uint16,
    values: new r.Array(r.uint8, r.uint16)
  });

  let entry = Object.assign({
    newStateOffset: r.uint16,
    // convert offset to stateArray index
    newState: t => (t.newStateOffset - (t.parent.stateArray.base - t.parent._startOffset)) / t.parent.nClasses,
    flags: r.uint16
  }, entryData);

  let Entry = new r.Struct(entry);
  let StateArray = new UnboundedArray(new r.Array(r.uint8, t => t.nClasses));

  let StateHeader1 = new r.Struct({
    nClasses: r.uint16,
    classTable: new r.Pointer(r.uint16, ClassLookupTable),
    stateArray: new r.Pointer(r.uint16, StateArray),
    entryTable: new r.Pointer(r.uint16, new UnboundedArray(Entry))
  });

  return StateHeader1;
}
