import r from 'restructure';
import {ScriptList, FeatureList, LookupList, Coverage, ClassDef, Device, Context, ChainingContext} from './opentype';
import {FeatureVariations} from './variations';

let Sequence = new r.Array(r.uint16, r.uint16);
let AlternateSet = Sequence;

let Ligature = new r.Struct({
  glyph:      r.uint16,
  compCount:  r.uint16,
  components: new r.Array(r.uint16, t => t.compCount - 1)
});

let LigatureSet = new r.Array(new r.Pointer(r.uint16, Ligature), r.uint16);

let GSUBLookup = new r.VersionedStruct('lookupType', {
  1: new r.VersionedStruct(r.uint16, {// Single Substitution
    1: {
      coverage:       new r.Pointer(r.uint16, Coverage),
      deltaGlyphID:   r.int16
    },
    2: {
      coverage:       new r.Pointer(r.uint16, Coverage),
      glyphCount:     r.uint16,
      substitute:     new r.LazyArray(r.uint16, 'glyphCount')
    }
  }),

  2: { // Multiple Substitution
    substFormat:    r.uint16,
    coverage:       new r.Pointer(r.uint16, Coverage),
    count:          r.uint16,
    sequences:      new r.LazyArray(new r.Pointer(r.uint16, Sequence), 'count')
  },

  3: { // Alternate Substitution
    substFormat:    r.uint16,
    coverage:       new r.Pointer(r.uint16, Coverage),
    count:          r.uint16,
    alternateSet:   new r.LazyArray(new r.Pointer(r.uint16, AlternateSet), 'count')
  },

  4: { // Ligature Substitution
    substFormat:    r.uint16,
    coverage:       new r.Pointer(r.uint16, Coverage),
    count:          r.uint16,
    ligatureSets:   new r.LazyArray(new r.Pointer(r.uint16, LigatureSet), 'count')
  },

  5: Context,         // Contextual Substitution
  6: ChainingContext, // Chaining Contextual Substitution

  7: { // Extension Substitution
    substFormat:   r.uint16,
    lookupType:    r.uint16,   // cannot also be 7
    extension:     new r.Pointer(r.uint32, GSUBLookup)
  },

  8: { // Reverse Chaining Contextual Single Substitution
    substFormat:            r.uint16,
    coverage:               new r.Pointer(r.uint16, Coverage),
    backtrackCoverage:      new r.Array(new r.Pointer(r.uint16, Coverage), 'backtrackGlyphCount'),
    lookaheadGlyphCount:    r.uint16,
    lookaheadCoverage:      new r.Array(new r.Pointer(r.uint16, Coverage), 'lookaheadGlyphCount'),
    glyphCount:             r.uint16,
    substitutes:            new r.Array(r.uint16, 'glyphCount')
  }
});

// Fix circular reference
GSUBLookup.versions[7].extension.type = GSUBLookup;

export default new r.VersionedStruct(r.uint32, {
  header: {
    scriptList:     new r.Pointer(r.uint16, ScriptList),
    featureList:    new r.Pointer(r.uint16, FeatureList),
    lookupList:     new r.Pointer(r.uint16, new LookupList(GSUBLookup))
  },

  0x00010000: {},
  0x00010001: {
    featureVariations: new r.Pointer(r.uint32, FeatureVariations)
  }
});
