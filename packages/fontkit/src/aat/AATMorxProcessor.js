import AATStateMachine from './AATStateMachine';
import AATLookupTable from './AATLookupTable';
import {cache} from '../decorators';

// indic replacement flags
const MARK_FIRST = 0x8000;
const MARK_LAST  = 0x2000;
const VERB       = 0x000F;

// contextual substitution and glyph insertion flag
const SET_MARK = 0x8000;

// ligature entry flags
const SET_COMPONENT  = 0x8000;
const PERFORM_ACTION = 0x2000;

// ligature action masks
const LAST_MASK   = 0x80000000;
const STORE_MASK  = 0x40000000;
const OFFSET_MASK = 0x3FFFFFFF;

const VERTICAL_ONLY           = 0x800000;
const REVERSE_DIRECTION       = 0x400000;
const HORIZONTAL_AND_VERTICAL = 0x200000;

// glyph insertion flags
const CURRENT_IS_KASHIDA_LIKE = 0x2000;
const MARKED_IS_KASHIDA_LIKE  = 0x1000;
const CURRENT_INSERT_BEFORE   = 0x0800;
const MARKED_INSERT_BEFORE    = 0x0400;
const CURRENT_INSERT_COUNT    = 0x03E0;
const MARKED_INSERT_COUNT     = 0x001F;

export default class AATMorxProcessor {
  constructor(font) {
    this.processIndicRearragement = this.processIndicRearragement.bind(this);
    this.processContextualSubstitution = this.processContextualSubstitution.bind(this);
    this.processLigature = this.processLigature.bind(this);
    this.processNoncontextualSubstitutions = this.processNoncontextualSubstitutions.bind(this);
    this.processGlyphInsertion = this.processGlyphInsertion.bind(this);
    this.font = font;
    this.morx = font.morx;
    this.inputCache = null;
  }

  // Processes an array of glyphs and applies the specified features
  // Features should be in the form of {featureType:{featureSetting:boolean}}
  process(glyphs, features = {}) {
    for (let chain of this.morx.chains) {
      let flags = chain.defaultFlags;

      // enable/disable the requested features
      for (let feature of chain.features) {
        let f;
        if (f = features[feature.featureType]) {
          if (f[feature.featureSetting]) {
            flags &= feature.disableFlags;
            flags |= feature.enableFlags;
          } else if (f[feature.featureSetting] === false) {
            flags |= ~feature.disableFlags;
            flags &= ~feature.enableFlags;
          }
        }
      }

      for (let subtable of chain.subtables) {
        if (subtable.subFeatureFlags & flags) {
          this.processSubtable(subtable, glyphs);
        }
      }
    }

    // remove deleted glyphs
    let index = glyphs.length - 1;
    while (index >= 0) {
      if (glyphs[index].id === 0xffff) {
        glyphs.splice(index, 1);
      }

      index--;
    }

    return glyphs;
  }

  processSubtable(subtable, glyphs) {
    this.subtable = subtable;
    this.glyphs = glyphs;
    if (this.subtable.type === 4) {
      this.processNoncontextualSubstitutions(this.subtable, this.glyphs);
      return;
    }

    this.ligatureStack = [];
    this.markedGlyph = null;
    this.firstGlyph = null;
    this.lastGlyph = null;
    this.markedIndex = null;

    let stateMachine = this.getStateMachine(subtable);
    let process = this.getProcessor();

    let reverse = !!(this.subtable.coverage & REVERSE_DIRECTION);
    return stateMachine.process(this.glyphs, reverse, process);
  }

  @cache
  getStateMachine(subtable) {
    return new AATStateMachine(subtable.table.stateTable);
  }

  getProcessor() {
    switch (this.subtable.type) {
      case 0:
        return this.processIndicRearragement;
      case 1:
        return this.processContextualSubstitution;
      case 2:
        return this.processLigature;
      case 4:
        return this.processNoncontextualSubstitutions;
      case 5:
        return this.processGlyphInsertion;
      default:
        throw new Error(`Invalid morx subtable type: ${this.subtable.type}`);
    }
  }

  processIndicRearragement(glyph, entry, index) {
    if (entry.flags & MARK_FIRST) {
      this.firstGlyph = index;
    }

    if (entry.flags & MARK_LAST) {
      this.lastGlyph = index;
    }

    reorderGlyphs(this.glyphs, entry.flags & VERB, this.firstGlyph, this.lastGlyph);
  }

  processContextualSubstitution(glyph, entry, index) {
    let subsitutions = this.subtable.table.substitutionTable.items;
    if (entry.markIndex !== 0xffff) {
      let lookup = subsitutions.getItem(entry.markIndex);
      let lookupTable = new AATLookupTable(lookup);
      glyph = this.glyphs[this.markedGlyph];
      var gid = lookupTable.lookup(glyph.id);
      if (gid) {
        this.glyphs[this.markedGlyph] = this.font.getGlyph(gid, glyph.codePoints);
      }
    }

    if (entry.currentIndex !== 0xffff) {
      let lookup = subsitutions.getItem(entry.currentIndex);
      let lookupTable = new AATLookupTable(lookup);
      glyph = this.glyphs[index];
      var gid = lookupTable.lookup(glyph.id);
      if (gid) {
        this.glyphs[index] = this.font.getGlyph(gid, glyph.codePoints);
      }
    }

    if (entry.flags & SET_MARK) {
      this.markedGlyph = index;
    }
  }

  processLigature(glyph, entry, index) {
    if (entry.flags & SET_COMPONENT) {
      this.ligatureStack.push(index);
    }

    if (entry.flags & PERFORM_ACTION) {
      let actions = this.subtable.table.ligatureActions;
      let components = this.subtable.table.components;
      let ligatureList = this.subtable.table.ligatureList;

      let actionIndex = entry.action;
      let last = false;
      let ligatureIndex = 0;
      let codePoints = [];
      let ligatureGlyphs = [];

      while (!last) {
        let componentGlyph = this.ligatureStack.pop();
        codePoints.unshift(...this.glyphs[componentGlyph].codePoints);

        let action = actions.getItem(actionIndex++);
        last = !!(action & LAST_MASK);
        let store = !!(action & STORE_MASK);
        let offset = (action & OFFSET_MASK) << 2 >> 2; // sign extend 30 to 32 bits
        offset += this.glyphs[componentGlyph].id;

        let component = components.getItem(offset);
        ligatureIndex += component;

        if (last || store) {
          let ligatureEntry = ligatureList.getItem(ligatureIndex);
          this.glyphs[componentGlyph] = this.font.getGlyph(ligatureEntry, codePoints);
          ligatureGlyphs.push(componentGlyph);
          ligatureIndex = 0;
          codePoints = [];
        } else {
          this.glyphs[componentGlyph] = this.font.getGlyph(0xffff);
        }
      }

      // Put ligature glyph indexes back on the stack
      this.ligatureStack.push(...ligatureGlyphs);
    }
  }

  processNoncontextualSubstitutions(subtable, glyphs, index) {
    let lookupTable = new AATLookupTable(subtable.table.lookupTable);

    for (index = 0; index < glyphs.length; index++) {
      let glyph = glyphs[index];
      if (glyph.id !== 0xffff) {
        let gid = lookupTable.lookup(glyph.id);
        if (gid) { // 0 means do nothing
          glyphs[index] = this.font.getGlyph(gid, glyph.codePoints);
        }
      }
    }
  }

  _insertGlyphs(glyphIndex, insertionActionIndex, count, isBefore) {
    let insertions = [];
    while (count--) {
      let gid = this.subtable.table.insertionActions.getItem(insertionActionIndex++);
      insertions.push(this.font.getGlyph(gid));
    }

    if (!isBefore) {
      glyphIndex++;
    }

    this.glyphs.splice(glyphIndex, 0, ...insertions);
  }

  processGlyphInsertion(glyph, entry, index) {
    if (entry.flags & SET_MARK) {
      this.markedIndex = index;
    }

    if (entry.markedInsertIndex !== 0xffff) {
      let count = (entry.flags & MARKED_INSERT_COUNT) >>> 5;
      let isBefore = !!(entry.flags & MARKED_INSERT_BEFORE);
      this._insertGlyphs(this.markedIndex, entry.markedInsertIndex, count, isBefore);
    }

    if (entry.currentInsertIndex !== 0xffff) {
      let count = (entry.flags & CURRENT_INSERT_COUNT) >>> 5;
      let isBefore = !!(entry.flags & CURRENT_INSERT_BEFORE);
      this._insertGlyphs(index, entry.currentInsertIndex, count, isBefore);
    }
  }

  getSupportedFeatures() {
    let features = [];
    for (let chain of this.morx.chains) {
      for (let feature of chain.features) {
        features.push([feature.featureType, feature.featureSetting]);
      }
    }

    return features;
  }

  generateInputs(gid) {
    if (!this.inputCache) {
      this.generateInputCache();
    }

    return this.inputCache[gid] || [];
  }

  generateInputCache() {
    this.inputCache = {};

    for (let chain of this.morx.chains) {
      let flags = chain.defaultFlags;

      for (let subtable of chain.subtables) {
        if (subtable.subFeatureFlags & flags) {
          this.generateInputsForSubtable(subtable);
        }
      }
    }
  }

  generateInputsForSubtable(subtable) {
    // Currently, only supporting ligature subtables.
    if (subtable.type !== 2) {
      return;
    }

    let reverse = !!(subtable.coverage & REVERSE_DIRECTION);
    if (reverse) {
      throw new Error('Reverse subtable, not supported.');
    }

    this.subtable = subtable;
    this.ligatureStack = [];

    let stateMachine = this.getStateMachine(subtable);
    let process = this.getProcessor();

    let input = [];
    let stack = [];
    this.glyphs = [];

    stateMachine.traverse({
      enter: (glyph, entry) => {
        let glyphs = this.glyphs;
        stack.push({
          glyphs: glyphs.slice(),
          ligatureStack: this.ligatureStack.slice()
        });

        // Add glyph to input and glyphs to process.
        let g = this.font.getGlyph(glyph);
        input.push(g);
        glyphs.push(input[input.length - 1]);

        // Process ligature substitution
        process(glyphs[glyphs.length - 1], entry, glyphs.length - 1);

        // Add input to result if only one matching (non-deleted) glyph remains.
        let count = 0;
        let found = 0;
        for (let i = 0; i < glyphs.length && count <= 1; i++) {
          if (glyphs[i].id !== 0xffff) {
            count++;
            found = glyphs[i].id;
          }
        }

        if (count === 1) {
          let result = input.map(g => g.id);
          let cache = this.inputCache[found];
          if (cache) {
            cache.push(result);
          } else {
            this.inputCache[found] = [result];
          }
        }
      },

      exit: () => {
        ({glyphs: this.glyphs, ligatureStack: this.ligatureStack} = stack.pop());
        input.pop();
      }
    });
  }
}

// swaps the glyphs in rangeA with those in rangeB
// reverse the glyphs inside those ranges if specified
// ranges are in [offset, length] format
function swap(glyphs, rangeA, rangeB, reverseA = false, reverseB = false) {
  let end = glyphs.splice(rangeB[0] - (rangeB[1] - 1), rangeB[1]);
  if (reverseB) {
    end.reverse();
  }

  let start = glyphs.splice(rangeA[0], rangeA[1], ...end);
  if (reverseA) {
    start.reverse();
  }

  glyphs.splice(rangeB[0] - (rangeA[1] - 1), 0, ...start);
  return glyphs;
}

function reorderGlyphs(glyphs, verb, firstGlyph, lastGlyph) {
  let length = lastGlyph - firstGlyph + 1;
  switch (verb) {
    case 0: // no change
      return glyphs;

    case 1: // Ax => xA
      return swap(glyphs, [firstGlyph, 1], [lastGlyph, 0]);

    case 2: // xD => Dx
      return swap(glyphs, [firstGlyph, 0], [lastGlyph, 1]);

    case 3: // AxD => DxA
      return swap(glyphs, [firstGlyph, 1], [lastGlyph, 1]);

    case 4: // ABx => xAB
      return swap(glyphs, [firstGlyph, 2], [lastGlyph, 0]);

    case 5: // ABx => xBA
      return swap(glyphs, [firstGlyph, 2], [lastGlyph, 0], true, false);

    case 6: // xCD => CDx
      return swap(glyphs, [firstGlyph, 0], [lastGlyph, 2]);

    case 7: // xCD => DCx
      return swap(glyphs, [firstGlyph, 0], [lastGlyph, 2], false, true);

    case 8: // AxCD => CDxA
      return swap(glyphs, [firstGlyph, 1], [lastGlyph, 2]);

    case 9: // AxCD => DCxA
      return swap(glyphs, [firstGlyph, 1], [lastGlyph, 2], false, true);

    case 10: // ABxD => DxAB
      return swap(glyphs, [firstGlyph, 2], [lastGlyph, 1]);

    case 11: // ABxD => DxBA
      return swap(glyphs, [firstGlyph, 2], [lastGlyph, 1], true, false);

    case 12: // ABxCD => CDxAB
      return swap(glyphs, [firstGlyph, 2], [lastGlyph, 2]);

    case 13: // ABxCD => CDxBA
      return swap(glyphs, [firstGlyph, 2], [lastGlyph, 2], true, false);

    case 14: // ABxCD => DCxAB
      return swap(glyphs, [firstGlyph, 2], [lastGlyph, 2], false, true);

    case 15: // ABxCD => DCxBA
      return swap(glyphs, [firstGlyph, 2], [lastGlyph, 2], true, true);

    default:
      throw new Error(`Unknown verb: ${verb}`);
  }
}
