import r from 'restructure';

//########################
// Scripts and Languages #
//########################

let LangSysTable = new r.Struct({
  reserved:         new r.Reserved(r.uint16),
  reqFeatureIndex:  r.uint16,
  featureCount:     r.uint16,
  featureIndexes:   new r.Array(r.uint16, 'featureCount')
});

let LangSysRecord = new r.Struct({
  tag:      new r.String(4),
  langSys:  new r.Pointer(r.uint16, LangSysTable, { type: 'parent' })
});

let Script = new r.Struct({
  defaultLangSys: new r.Pointer(r.uint16, LangSysTable),
  count:          r.uint16,
  langSysRecords: new r.Array(LangSysRecord, 'count')
});

let ScriptRecord = new r.Struct({
  tag:    new r.String(4),
  script: new r.Pointer(r.uint16, Script, { type: 'parent' })
});

export let ScriptList = new r.Array(ScriptRecord, r.uint16);

//#######################
// Features and Lookups #
//#######################

export let Feature = new r.Struct({
  featureParams:      r.uint16, // pointer
  lookupCount:        r.uint16,
  lookupListIndexes:  new r.Array(r.uint16, 'lookupCount')
});

let FeatureRecord = new r.Struct({
  tag:      new r.String(4),
  feature:  new r.Pointer(r.uint16, Feature, { type: 'parent' })
});

export let FeatureList = new r.Array(FeatureRecord, r.uint16);

let LookupFlags = new r.Struct({
  markAttachmentType: r.uint8,
  flags: new r.Bitfield(r.uint8, [
    'rightToLeft', 'ignoreBaseGlyphs', 'ignoreLigatures',
    'ignoreMarks', 'useMarkFilteringSet'
  ])
});

export function LookupList(SubTable) {
  let Lookup = new r.Struct({
    lookupType:         r.uint16,
    flags:              LookupFlags,
    subTableCount:      r.uint16,
    subTables:          new r.Array(new r.Pointer(r.uint16, SubTable), 'subTableCount'),
    markFilteringSet:   new r.Optional(r.uint16, t => t.flags.flags.useMarkFilteringSet)
  });

  return new r.LazyArray(new r.Pointer(r.uint16, Lookup), r.uint16);
}

//#################
// Coverage Table #
//#################

let RangeRecord = new r.Struct({
  start:              r.uint16,
  end:                r.uint16,
  startCoverageIndex: r.uint16
});

export let Coverage = new r.VersionedStruct(r.uint16, {
  1: {
    glyphCount:   r.uint16,
    glyphs:       new r.Array(r.uint16, 'glyphCount')
  },
  2: {
    rangeCount:   r.uint16,
    rangeRecords: new r.Array(RangeRecord, 'rangeCount')
  }
});

//#########################
// Class Definition Table #
//#########################

let ClassRangeRecord = new r.Struct({
  start:  r.uint16,
  end:    r.uint16,
  class:  r.uint16
});

export let ClassDef = new r.VersionedStruct(r.uint16, {
  1: { // Class array
    startGlyph:       r.uint16,
    glyphCount:       r.uint16,
    classValueArray:  new r.Array(r.uint16, 'glyphCount')
  },
  2: { // Class ranges
    classRangeCount:  r.uint16,
    classRangeRecord: new r.Array(ClassRangeRecord, 'classRangeCount')
  }
});

//###############
// Device Table #
//###############

export let Device = new r.Struct({
  a: r.uint16, // startSize for hinting Device, outerIndex for VariationIndex
  b: r.uint16, // endSize for Device, innerIndex for VariationIndex
  deltaFormat: r.uint16
});

//#############################################
// Contextual Substitution/Positioning Tables #
//#############################################

let LookupRecord = new r.Struct({
  sequenceIndex:      r.uint16,
  lookupListIndex:    r.uint16
});

let Rule = new r.Struct({
  glyphCount:     r.uint16,
  lookupCount:    r.uint16,
  input:          new r.Array(r.uint16, t => t.glyphCount - 1),
  lookupRecords:  new r.Array(LookupRecord, 'lookupCount')
});

let RuleSet = new r.Array(new r.Pointer(r.uint16, Rule), r.uint16);

let ClassRule = new r.Struct({
  glyphCount:     r.uint16,
  lookupCount:    r.uint16,
  classes:        new r.Array(r.uint16, t => t.glyphCount - 1),
  lookupRecords:  new r.Array(LookupRecord, 'lookupCount')
});

let ClassSet = new r.Array(new r.Pointer(r.uint16, ClassRule), r.uint16);

export let Context = new r.VersionedStruct(r.uint16, {
  1: { // Simple context
    coverage:      new r.Pointer(r.uint16, Coverage),
    ruleSetCount:  r.uint16,
    ruleSets:      new r.Array(new r.Pointer(r.uint16, RuleSet), 'ruleSetCount')
  },
  2: { // Class-based context
    coverage:      new r.Pointer(r.uint16, Coverage),
    classDef:      new r.Pointer(r.uint16, ClassDef),
    classSetCnt:   r.uint16,
    classSet:      new r.Array(new r.Pointer(r.uint16, ClassSet), 'classSetCnt')
  },
  3: {
    glyphCount:    r.uint16,
    lookupCount:   r.uint16,
    coverages:     new r.Array(new r.Pointer(r.uint16, Coverage), 'glyphCount'),
    lookupRecords: new r.Array(LookupRecord, 'lookupCount')
  }
});

//######################################################
// Chaining Contextual Substitution/Positioning Tables #
//######################################################

let ChainRule = new r.Struct({
  backtrackGlyphCount:  r.uint16,
  backtrack:            new r.Array(r.uint16, 'backtrackGlyphCount'),
  inputGlyphCount:      r.uint16,
  input:                new r.Array(r.uint16, t => t.inputGlyphCount - 1),
  lookaheadGlyphCount:  r.uint16,
  lookahead:            new r.Array(r.uint16, 'lookaheadGlyphCount'),
  lookupCount:          r.uint16,
  lookupRecords:        new r.Array(LookupRecord, 'lookupCount')
});

let ChainRuleSet = new r.Array(new r.Pointer(r.uint16, ChainRule), r.uint16);

export let ChainingContext = new r.VersionedStruct(r.uint16, {
  1: { // Simple context glyph substitution
    coverage:           new r.Pointer(r.uint16, Coverage),
    chainCount:         r.uint16,
    chainRuleSets:      new r.Array(new r.Pointer(r.uint16, ChainRuleSet), 'chainCount')
  },

  2: { // Class-based chaining context
    coverage:           new r.Pointer(r.uint16, Coverage),
    backtrackClassDef:  new r.Pointer(r.uint16, ClassDef),
    inputClassDef:      new r.Pointer(r.uint16, ClassDef),
    lookaheadClassDef:  new r.Pointer(r.uint16, ClassDef),
    chainCount:         r.uint16,
    chainClassSet:      new r.Array(new r.Pointer(r.uint16, ChainRuleSet), 'chainCount')
  },

  3: { // Coverage-based chaining context
    backtrackGlyphCount:    r.uint16,
    backtrackCoverage:      new r.Array(new r.Pointer(r.uint16, Coverage), 'backtrackGlyphCount'),
    inputGlyphCount:        r.uint16,
    inputCoverage:          new r.Array(new r.Pointer(r.uint16, Coverage), 'inputGlyphCount'),
    lookaheadGlyphCount:    r.uint16,
    lookaheadCoverage:      new r.Array(new r.Pointer(r.uint16, Coverage), 'lookaheadGlyphCount'),
    lookupCount:            r.uint16,
    lookupRecords:          new r.Array(LookupRecord, 'lookupCount')
  }
});
