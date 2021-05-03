import {Feature} from './opentype';
import r from 'restructure';

/*******************
 * Variation Store *
 *******************/

let F2DOT14 = new r.Fixed(16, 'BE', 14);
let RegionAxisCoordinates = new r.Struct({
  startCoord: F2DOT14,
  peakCoord: F2DOT14,
  endCoord: F2DOT14
});

let VariationRegionList = new r.Struct({
  axisCount: r.uint16,
  regionCount: r.uint16,
  variationRegions: new r.Array(new r.Array(RegionAxisCoordinates, 'axisCount'), 'regionCount')
});

let DeltaSet = new r.Struct({
  shortDeltas: new r.Array(r.int16, t => t.parent.shortDeltaCount),
  regionDeltas: new r.Array(r.int8, t => t.parent.regionIndexCount - t.parent.shortDeltaCount),
  deltas: t => t.shortDeltas.concat(t.regionDeltas)
});

let ItemVariationData = new r.Struct({
  itemCount: r.uint16,
  shortDeltaCount: r.uint16,
  regionIndexCount: r.uint16,
  regionIndexes: new r.Array(r.uint16, 'regionIndexCount'),
  deltaSets: new r.Array(DeltaSet, 'itemCount')
});

export let ItemVariationStore = new r.Struct({
  format: r.uint16,
  variationRegionList: new r.Pointer(r.uint32, VariationRegionList),
  variationDataCount: r.uint16,
  itemVariationData: new r.Array(new r.Pointer(r.uint32, ItemVariationData), 'variationDataCount')
});

/**********************
 * Feature Variations *
 **********************/

let ConditionTable = new r.VersionedStruct(r.uint16, {
  1: {
    axisIndex: r.uint16,
    axisIndex: r.uint16,
    filterRangeMinValue: F2DOT14,
    filterRangeMaxValue: F2DOT14
  }
});

let ConditionSet = new r.Struct({
  conditionCount: r.uint16,
  conditionTable: new r.Array(new r.Pointer(r.uint32, ConditionTable), 'conditionCount')
});

let FeatureTableSubstitutionRecord = new r.Struct({
  featureIndex: r.uint16,
  alternateFeatureTable: new r.Pointer(r.uint32, Feature, {type: 'parent'})
});

let FeatureTableSubstitution = new r.Struct({
  version: r.fixed32,
  substitutionCount: r.uint16,
  substitutions: new r.Array(FeatureTableSubstitutionRecord, 'substitutionCount')
});

let FeatureVariationRecord = new r.Struct({
  conditionSet: new r.Pointer(r.uint32, ConditionSet, {type: 'parent'}),
  featureTableSubstitution: new r.Pointer(r.uint32, FeatureTableSubstitution, {type: 'parent'})
});

export let FeatureVariations = new r.Struct({
  majorVersion: r.uint16,
  minorVersion: r.uint16,
  featureVariationRecordCount: r.uint32,
  featureVariationRecords: new r.Array(FeatureVariationRecord, 'featureVariationRecordCount')
});
