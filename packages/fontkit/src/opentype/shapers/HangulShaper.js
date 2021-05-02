// Updated: 417af0c79c5664271a07a783574ec7fac7ebad0c

import DefaultShaper from './DefaultShaper';
import GlyphInfo from '../GlyphInfo';

/**
 * This is a shaper for the Hangul script, used by the Korean language.
 * It does the following:
 *   - decompose if unsupported by the font:
 *     <LV>   -> <L,V>
 *     <LVT>  -> <L,V,T>
 *     <LV,T> -> <L,V,T>
 *
 *   - compose if supported by the font:
 *     <L,V>   -> <LV>
 *     <L,V,T> -> <LVT>
 *     <LV,T>  -> <LVT>
 *
 *   - reorder tone marks (S is any valid syllable):
 *     <S, M> -> <M, S>
 *
 *   - apply ljmo, vjmo, and tjmo OpenType features to decomposed Jamo sequences.
 *
 * This logic is based on the following documents:
 *   - http://www.microsoft.com/typography/OpenTypeDev/hangul/intro.htm
 *   - http://ktug.org/~nomos/harfbuzz-hangul/hangulshaper.pdf
 */
export default class HangulShaper extends DefaultShaper {
  static zeroMarkWidths = 'NONE';
  static planFeatures(plan) {
    plan.add(['ljmo', 'vjmo', 'tjmo'], false);
  }

  static assignFeatures(plan, glyphs) {
    let state = 0;
    let i = 0;
    while (i < glyphs.length) {
      let action;
      let glyph = glyphs[i];
      let code = glyph.codePoints[0];
      let type = getType(code);

      [action, state] = STATE_TABLE[state][type];

      switch (action) {
        case DECOMPOSE:
          // Decompose the composed syllable if it is not supported by the font.
          if (!plan.font.hasGlyphForCodePoint(code)) {
            i = decompose(glyphs, i, plan.font);
          }
          break;

        case COMPOSE:
          // Found a decomposed syllable. Try to compose if supported by the font.
          i = compose(glyphs, i, plan.font);
          break;

        case TONE_MARK:
          // Got a valid syllable, followed by a tone mark. Move the tone mark to the beginning of the syllable.
          reorderToneMark(glyphs, i, plan.font);
          break;

        case INVALID:
          // Tone mark has no valid syllable to attach to, so insert a dotted circle
          i = insertDottedCircle(glyphs, i, plan.font);
          break;
      }

      i++;
    }
  }
}

const HANGUL_BASE = 0xac00;
const HANGUL_END = 0xd7a4;
const HANGUL_COUNT = HANGUL_END - HANGUL_BASE + 1;
const L_BASE = 0x1100; // lead
const V_BASE = 0x1161; // vowel
const T_BASE = 0x11a7; // trail
const L_COUNT = 19;
const V_COUNT = 21;
const T_COUNT = 28;
const L_END = L_BASE + L_COUNT - 1;
const V_END = V_BASE + V_COUNT - 1;
const T_END = T_BASE + T_COUNT - 1;
const DOTTED_CIRCLE = 0x25cc;

const isL = code =>
  (0x1100 <= code && code <= 0x115f) || (0xa960 <= code && code <= 0xa97c);
const isV = code =>
  (0x1160 <= code && code <= 0x11a7) || (0xd7b0 <= code && code <= 0xd7c6);
const isT = code =>
  (0x11a8 <= code && code <= 0x11ff) || (0xd7cb <= code && code <= 0xd7fb);
const isTone = code => 0x302e <= code && code <= 0x302f;
const isLVT = code => HANGUL_BASE <= code && code <= HANGUL_END;
const isLV = code =>
  code - HANGUL_BASE < HANGUL_COUNT && (code - HANGUL_BASE) % T_COUNT === 0;
const isCombiningL = code => L_BASE <= code && code <= L_END;
const isCombiningV = code => V_BASE <= code && code <= V_END;
const isCombiningT = code => T_BASE + 1 && 1 <= code && code <= T_END;

// Character categories
const X = 0; // Other character
const L = 1; // Leading consonant
const V = 2; // Medial vowel
const T = 3; // Trailing consonant
const LV = 4; // Composed <LV> syllable
const LVT = 5; // Composed <LVT> syllable
const M = 6; // Tone mark

// This function classifies a character using the above categories.
function getType(code) {
  if (isL(code)) {
    return L;
  }
  if (isV(code)) {
    return V;
  }
  if (isT(code)) {
    return T;
  }
  if (isLV(code)) {
    return LV;
  }
  if (isLVT(code)) {
    return LVT;
  }
  if (isTone(code)) {
    return M;
  }
  return X;
}

// State machine actions
const NO_ACTION = 0;
const DECOMPOSE = 1;
const COMPOSE = 2;
const TONE_MARK = 4;
const INVALID = 5;

// Build a state machine that accepts valid syllables, and applies actions along the way.
// The logic this is implementing is documented at the top of the file.
const STATE_TABLE = [
  //       X                 L                 V                T                  LV                LVT               M
  // State 0: start state
  [
    [NO_ACTION, 0],
    [NO_ACTION, 1],
    [NO_ACTION, 0],
    [NO_ACTION, 0],
    [DECOMPOSE, 2],
    [DECOMPOSE, 3],
    [INVALID, 0],
  ],

  // State 1: <L>
  [
    [NO_ACTION, 0],
    [NO_ACTION, 1],
    [COMPOSE, 2],
    [NO_ACTION, 0],
    [DECOMPOSE, 2],
    [DECOMPOSE, 3],
    [INVALID, 0],
  ],

  // State 2: <L,V> or <LV>
  [
    [NO_ACTION, 0],
    [NO_ACTION, 1],
    [NO_ACTION, 0],
    [COMPOSE, 3],
    [DECOMPOSE, 2],
    [DECOMPOSE, 3],
    [TONE_MARK, 0],
  ],

  // State 3: <L,V,T> or <LVT>
  [
    [NO_ACTION, 0],
    [NO_ACTION, 1],
    [NO_ACTION, 0],
    [NO_ACTION, 0],
    [DECOMPOSE, 2],
    [DECOMPOSE, 3],
    [TONE_MARK, 0],
  ],
];

function getGlyph(font, code, features) {
  return new GlyphInfo(font, font.glyphForCodePoint(code).id, [code], features);
}

function decompose(glyphs, i, font) {
  let glyph = glyphs[i];
  let code = glyph.codePoints[0];

  let s = code - HANGUL_BASE;
  let t = T_BASE + (s % T_COUNT);
  s = (s / T_COUNT) | 0;
  let l = (L_BASE + s / V_COUNT) | 0;
  let v = V_BASE + (s % V_COUNT);

  // Don't decompose if all of the components are not available
  if (
    !font.hasGlyphForCodePoint(l) ||
    !font.hasGlyphForCodePoint(v) ||
    (t !== T_BASE && !font.hasGlyphForCodePoint(t))
  ) {
    return i;
  }

  // Replace the current glyph with decomposed L, V, and T glyphs,
  // and apply the proper OpenType features to each component.
  let ljmo = getGlyph(font, l, glyph.features);
  ljmo.features.ljmo = true;

  let vjmo = getGlyph(font, v, glyph.features);
  vjmo.features.vjmo = true;

  let insert = [ljmo, vjmo];

  if (t > T_BASE) {
    let tjmo = getGlyph(font, t, glyph.features);
    tjmo.features.tjmo = true;
    insert.push(tjmo);
  }

  glyphs.splice(i, 1, ...insert);
  return i + insert.length - 1;
}

function compose(glyphs, i, font) {
  let glyph = glyphs[i];
  let code = glyphs[i].codePoints[0];
  let type = getType(code);

  let prev = glyphs[i - 1].codePoints[0];
  let prevType = getType(prev);

  // Figure out what type of syllable we're dealing with
  let lv, ljmo, vjmo, tjmo;
  if (prevType === LV && type === T) {
    // <LV,T>
    lv = prev;
    tjmo = glyph;
  } else {
    if (type === V) {
      // <L,V>
      ljmo = glyphs[i - 1];
      vjmo = glyph;
    } else {
      // <L,V,T>
      ljmo = glyphs[i - 2];
      vjmo = glyphs[i - 1];
      tjmo = glyph;
    }

    let l = ljmo.codePoints[0];
    let v = vjmo.codePoints[0];

    // Make sure L and V are combining characters
    if (isCombiningL(l) && isCombiningV(v)) {
      lv = HANGUL_BASE + ((l - L_BASE) * V_COUNT + (v - V_BASE)) * T_COUNT;
    }
  }

  let t = (tjmo && tjmo.codePoints[0]) || T_BASE;
  if (lv != null && (t === T_BASE || isCombiningT(t))) {
    let s = lv + (t - T_BASE);

    // Replace with a composed glyph if supported by the font,
    // otherwise apply the proper OpenType features to each component.
    if (font.hasGlyphForCodePoint(s)) {
      let del = prevType === V ? 3 : 2;
      glyphs.splice(i - del + 1, del, getGlyph(font, s, glyph.features));
      return i - del + 1;
    }
  }

  // Didn't compose (either a non-combining component or unsupported by font).
  if (ljmo) {
    ljmo.features.ljmo = true;
  }
  if (vjmo) {
    vjmo.features.vjmo = true;
  }
  if (tjmo) {
    tjmo.features.tjmo = true;
  }

  if (prevType === LV) {
    // Sequence was originally <L,V>, which got combined earlier.
    // Either the T was non-combining, or the LVT glyph wasn't supported.
    // Decompose the glyph again and apply OT features.
    decompose(glyphs, i - 1, font);
    return i + 1;
  }

  return i;
}

function getLength(code) {
  switch (getType(code)) {
    case LV:
    case LVT:
      return 1;
    case V:
      return 2;
    case T:
      return 3;
  }
}

function reorderToneMark(glyphs, i, font) {
  let glyph = glyphs[i];
  let code = glyphs[i].codePoints[0];

  // Move tone mark to the beginning of the previous syllable, unless it is zero width
  if (font.glyphForCodePoint(code).advanceWidth === 0) {
    return;
  }

  let prev = glyphs[i - 1].codePoints[0];
  let len = getLength(prev);

  glyphs.splice(i, 1);
  return glyphs.splice(i - len, 0, glyph);
}

function insertDottedCircle(glyphs, i, font) {
  let glyph = glyphs[i];
  let code = glyphs[i].codePoints[0];

  if (font.hasGlyphForCodePoint(DOTTED_CIRCLE)) {
    let dottedCircle = getGlyph(font, DOTTED_CIRCLE, glyph.features);

    // If the tone mark is zero width, insert the dotted circle before, otherwise after
    let idx = font.glyphForCodePoint(code).advanceWidth === 0 ? i : i + 1;
    glyphs.splice(idx, 0, dottedCircle);
    i++;
  }

  return i;
}
