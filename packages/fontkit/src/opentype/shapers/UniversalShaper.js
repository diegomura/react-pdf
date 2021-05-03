// Updated: 417af0c79c5664271a07a783574ec7fac7ebad0c

import DefaultShaper from './DefaultShaper';
import StateMachine from 'dfa';
import UnicodeTrie from 'unicode-trie';
import GlyphInfo from '../GlyphInfo';
import useData from './use.json';
import trieData from './useTrie.json';

const { categories, decompositions } = useData;
const trie = new UnicodeTrie(new Uint8Array(trieData.data));
const stateMachine = new StateMachine(useData);

/**
 * This shaper is an implementation of the Universal Shaping Engine, which
 * uses Unicode data to shape a number of scripts without a dedicated shaping engine.
 * See https://www.microsoft.com/typography/OpenTypeDev/USE/intro.htm.
 */
export default class UniversalShaper extends DefaultShaper {
  static zeroMarkWidths = 'BEFORE_GPOS';
  static planFeatures(plan) {
    plan.addStage(setupSyllables);

    // Default glyph pre-processing group
    plan.addStage(['locl', 'ccmp', 'nukt', 'akhn']);

    // Reordering group
    plan.addStage(clearSubstitutionFlags);
    plan.addStage(['rphf'], false);
    plan.addStage(recordRphf);
    plan.addStage(clearSubstitutionFlags);
    plan.addStage(['pref']);
    plan.addStage(recordPref);

    // Orthographic unit shaping group
    plan.addStage(['rkrf', 'abvf', 'blwf', 'half', 'pstf', 'vatu', 'cjct']);
    plan.addStage(reorder);

    // Topographical features
    // Scripts that need this are handled by the Arabic shaper, not implemented here for now.
    // plan.addStage(['isol', 'init', 'medi', 'fina', 'med2', 'fin2', 'fin3'], false);

    // Standard topographic presentation and positional feature application
    plan.addStage(['abvs', 'blws', 'pres', 'psts', 'dist', 'abvm', 'blwm']);
  }

  static assignFeatures(plan, glyphs) {
    // Decompose split vowels
    // TODO: do this in a more general unicode normalizer
    for (let i = glyphs.length - 1; i >= 0; i--) {
      let codepoint = glyphs[i].codePoints[0];
      if (decompositions[codepoint]) {
        let decomposed = decompositions[codepoint].map(c => {
          let g = plan.font.glyphForCodePoint(c);
          return new GlyphInfo(plan.font, g.id, [c], glyphs[i].features);
        });

        glyphs.splice(i, 1, ...decomposed);
      }
    }
  }
}

function useCategory(glyph) {
  return trie.get(glyph.codePoints[0]);
}

class USEInfo {
  constructor(category, syllableType, syllable) {
    this.category = category;
    this.syllableType = syllableType;
    this.syllable = syllable;
  }
}

function setupSyllables(font, glyphs) {
  let syllable = 0;
  for (let [start, end, tags] of stateMachine.match(glyphs.map(useCategory))) {
    ++syllable;

    // Create shaper info
    for (let i = start; i <= end; i++) {
      glyphs[i].shaperInfo = new USEInfo(
        categories[useCategory(glyphs[i])],
        tags[0],
        syllable,
      );
    }

    // Assign rphf feature
    let limit =
      glyphs[start].shaperInfo.category === 'R' ? 1 : Math.min(3, end - start);
    for (let i = start; i < start + limit; i++) {
      glyphs[i].features.rphf = true;
    }
  }
}

function clearSubstitutionFlags(font, glyphs) {
  for (let glyph of glyphs) {
    glyph.substituted = false;
  }
}

function recordRphf(font, glyphs) {
  for (let glyph of glyphs) {
    if (glyph.substituted && glyph.features.rphf) {
      // Mark a substituted repha.
      glyph.shaperInfo.category = 'R';
    }
  }
}

function recordPref(font, glyphs) {
  for (let glyph of glyphs) {
    if (glyph.substituted) {
      // Mark a substituted pref as VPre, as they behave the same way.
      glyph.shaperInfo.category = 'VPre';
    }
  }
}

function reorder(font, glyphs) {
  let dottedCircle = font.glyphForCodePoint(0x25cc).id;

  for (
    let start = 0, end = nextSyllable(glyphs, 0);
    start < glyphs.length;
    start = end, end = nextSyllable(glyphs, start)
  ) {
    let i, j;
    let info = glyphs[start].shaperInfo;
    let type = info.syllableType;

    // Only a few syllable types need reordering.
    if (
      type !== 'virama_terminated_cluster' &&
      type !== 'standard_cluster' &&
      type !== 'broken_cluster'
    ) {
      continue;
    }

    // Insert a dotted circle glyph in broken clusters.
    if (type === 'broken_cluster' && dottedCircle) {
      let g = new GlyphInfo(font, dottedCircle, [0x25cc]);
      g.shaperInfo = info;

      // Insert after possible Repha.
      for (i = start; i < end && glyphs[i].shaperInfo.category === 'R'; i++);
      glyphs.splice(++i, 0, g);
      end++;
    }

    // Move things forward.
    if (info.category === 'R' && end - start > 1) {
      // Got a repha. Reorder it to after first base, before first halant.
      for (i = start + 1; i < end; i++) {
        info = glyphs[i].shaperInfo;
        if (isBase(info) || isHalant(glyphs[i])) {
          // If we hit a halant, move before it; otherwise it's a base: move to it's
          // place, and shift things in between backward.
          if (isHalant(glyphs[i])) {
            i--;
          }

          glyphs.splice(
            start,
            0,
            ...glyphs.splice(start + 1, i - start),
            glyphs[i],
          );
          break;
        }
      }
    }

    // Move things back.
    for (i = start, j = end; i < end; i++) {
      info = glyphs[i].shaperInfo;
      if (isBase(info) || isHalant(glyphs[i])) {
        // If we hit a halant, move after it; otherwise it's a base: move to it's
        // place, and shift things in between backward.
        j = isHalant(glyphs[i]) ? i + 1 : i;
      } else if (
        (info.category === 'VPre' || info.category === 'VMPre') &&
        j < i
      ) {
        glyphs.splice(j, 1, glyphs[i], ...glyphs.splice(j, i - j));
      }
    }
  }
}

function nextSyllable(glyphs, start) {
  if (start >= glyphs.length) return start;
  let syllable = glyphs[start].shaperInfo.syllable;
  while (
    ++start < glyphs.length &&
    glyphs[start].shaperInfo.syllable === syllable
  );
  return start;
}

function isHalant(glyph) {
  return glyph.shaperInfo.category === 'H' && !glyph.isLigated;
}

function isBase(info) {
  return info.category === 'B' || info.category === 'GB';
}
