// Updated: 417af0c79c5664271a07a783574ec7fac7ebad0c

import r from 'restructure';
import { UnboundedArray, LookupTable, StateTable } from './aat';

const LigatureData = {
  action: r.uint16,
};

const ContextualData = {
  markIndex: r.uint16,
  currentIndex: r.uint16,
};

const InsertionData = {
  currentInsertIndex: r.uint16,
  markedInsertIndex: r.uint16,
};

const SubstitutionTable = new r.Struct({
  items: new UnboundedArray(new r.Pointer(r.uint32, new LookupTable())),
});

const SubtableData = new r.VersionedStruct('type', {
  0: {
    // Indic Rearrangement Subtable
    stateTable: new StateTable(),
  },

  1: {
    // Contextual Glyph Substitution Subtable
    stateTable: new StateTable(ContextualData),
    substitutionTable: new r.Pointer(r.uint32, SubstitutionTable),
  },

  2: {
    // Ligature subtable
    stateTable: new StateTable(LigatureData),
    ligatureActions: new r.Pointer(r.uint32, new UnboundedArray(r.uint32)),
    components: new r.Pointer(r.uint32, new UnboundedArray(r.uint16)),
    ligatureList: new r.Pointer(r.uint32, new UnboundedArray(r.uint16)),
  },

  4: {
    // Non-contextual Glyph Substitution Subtable
    lookupTable: new LookupTable(),
  },

  5: {
    // Glyph Insertion Subtable
    stateTable: new StateTable(InsertionData),
    insertionActions: new r.Pointer(r.uint32, new UnboundedArray(r.uint16)),
  },
});

const Subtable = new r.Struct({
  length: r.uint32,
  coverage: r.uint24,
  type: r.uint8,
  subFeatureFlags: r.uint32,
  table: SubtableData,
  padding: new r.Reserved(r.uint8, t => t.length - t._currentOffset),
});

const FeatureEntry = new r.Struct({
  featureType: r.uint16,
  featureSetting: r.uint16,
  enableFlags: r.uint32,
  disableFlags: r.uint32,
});

const MorxChain = new r.Struct({
  defaultFlags: r.uint32,
  chainLength: r.uint32,
  nFeatureEntries: r.uint32,
  nSubtables: r.uint32,
  features: new r.Array(FeatureEntry, 'nFeatureEntries'),
  subtables: new r.Array(Subtable, 'nSubtables'),
});

export default new r.Struct({
  version: r.uint16,
  unused: new r.Reserved(r.uint16),
  nChains: r.uint32,
  chains: new r.Array(MorxChain, 'nChains'),
});
