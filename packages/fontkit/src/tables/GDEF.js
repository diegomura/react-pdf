import r from 'restructure';
import {ScriptList, FeatureList, LookupList, Coverage, ClassDef, Device} from './opentype';
import {ItemVariationStore} from './variations';

let AttachPoint = new r.Array(r.uint16, r.uint16);
let AttachList = new r.Struct({
  coverage:       new r.Pointer(r.uint16, Coverage),
  glyphCount:     r.uint16,
  attachPoints:   new r.Array(new r.Pointer(r.uint16, AttachPoint), 'glyphCount')
});

let CaretValue = new r.VersionedStruct(r.uint16, {
  1: { // Design units only
    coordinate: r.int16
  },

  2: { // Contour point
    caretValuePoint: r.uint16
  },

  3: { // Design units plus Device table
    coordinate:     r.int16,
    deviceTable:    new r.Pointer(r.uint16, Device)
  }
});

let LigGlyph = new r.Array(new r.Pointer(r.uint16, CaretValue), r.uint16);

let LigCaretList = new r.Struct({
  coverage:       new r.Pointer(r.uint16, Coverage),
  ligGlyphCount:  r.uint16,
  ligGlyphs:      new r.Array(new r.Pointer(r.uint16, LigGlyph), 'ligGlyphCount')
});

let MarkGlyphSetsDef = new r.Struct({
  markSetTableFormat: r.uint16,
  markSetCount:       r.uint16,
  coverage:           new r.Array(new r.Pointer(r.uint32, Coverage), 'markSetCount')
});

export default new r.VersionedStruct(r.uint32, {
  header: {
    glyphClassDef:      new r.Pointer(r.uint16, ClassDef),
    attachList:         new r.Pointer(r.uint16, AttachList),
    ligCaretList:       new r.Pointer(r.uint16, LigCaretList),
    markAttachClassDef: new r.Pointer(r.uint16, ClassDef)
  },

  0x00010000: {},
  0x00010002: {
    markGlyphSetsDef:   new r.Pointer(r.uint16, MarkGlyphSetsDef)
  },
  0x00010003: {
    markGlyphSetsDef:   new r.Pointer(r.uint16, MarkGlyphSetsDef),
    itemVariationStore: new r.Pointer(r.uint32, ItemVariationStore)
  }
});
