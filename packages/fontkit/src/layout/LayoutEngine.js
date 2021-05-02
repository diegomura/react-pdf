// TO-UPDATE

import unicode from '@react-pdf/unicode-properties';
import KernProcessor from './KernProcessor';
import UnicodeLayoutEngine from './UnicodeLayoutEngine';
import GlyphRun from './GlyphRun';
import GlyphPosition from './GlyphPosition';
import * as Script from './Script';
import AATLayoutEngine from '../aat/AATLayoutEngine';
import OTLayoutEngine from '../opentype/OTLayoutEngine';
import GlyphInfo from '../opentype/GlyphInfo';

export default class LayoutEngine {
  constructor(font) {
    this.font = font;
    this.unicodeLayoutEngine = null;
    this.kernProcessor = null;

    // Choose an advanced layout engine. We try the AAT morx table first since more
    // scripts are currently supported because the shaping logic is built into the font.
    if (this.font.morx) {
      this.engine = new AATLayoutEngine(this.font);
    } else if (this.font.GSUB || this.font.GPOS) {
      this.engine = new OTLayoutEngine(this.font);
    }
  }

  layout(string, features, script, language, direction) {
    // Make the features parameter optional
    if (typeof features === 'string') {
      direction = language;
      language = script;
      script = features;
      features = [];
    }

    // Attempt to detect the script from the string if not provided.
    if (script == null) {
      script = Script.forString(string);
    }

    var glyphs = this.glyphsForString(string);

    let glyphRun = new GlyphRun(glyphs, features, script, language, direction);

    // Return early if there are no glyphs
    if (glyphs.length === 0) {
      glyphRun.positions = [];
      return glyphRun;
    }

    // Setup the advanced layout engine
    if (this.engine && this.engine.setup) {
      this.engine.setup(glyphRun);
    }

    // Substitute and position the glyphs
    this.substitute(glyphRun);
    this.position(glyphRun);

    this.hideDefaultIgnorables(glyphRun.glyphs, glyphRun.positions);

    // Let the layout engine clean up any state it might have
    if (this.engine && this.engine.cleanup) {
      this.engine.cleanup();
    }

    // Map glyph infos back to normal Glyph objects
    glyphRun.stringIndices = glyphRun.glyphs.map(
      glyphInfo => glyphInfo.stringIndex,
    );
    glyphRun.glyphs = glyphRun.glyphs.map(glyphInfo =>
      this.font.getGlyph(glyphInfo.id, glyphInfo.codePoints),
    );
    return glyphRun;
  }

  glyphsForString(string) {
    let glyphs = [];
    let len = string.length;
    let idx = 0;
    let last = -1;
    let state = -1;

    while (idx <= len) {
      let code = 0;
      let nextState = 0;
      let stringIndex = idx - 1;
      if (idx < len) {
        // Decode the next codepoint from UTF 16
        code = string.charCodeAt(idx++);
        if (0xd800 <= code && code <= 0xdbff && idx < len) {
          let next = string.charCodeAt(idx);
          if (0xdc00 <= next && next <= 0xdfff) {
            idx++;
            code = ((code & 0x3ff) << 10) + (next & 0x3ff) + 0x10000;
          }
        }
        // Compute the next state: 1 if the next codepoint is a variation selector, 0 otherwise.
        nextState =
          (0xfe00 <= code && code <= 0xfe0f) ||
          (0xe0100 <= code && code <= 0xe01ef)
            ? 1
            : 0;
      } else {
        idx++;
      }
      if (state === 0 && nextState === 1) {
        // Variation selector following normal codepoint.
        glyphs.push(
          new GlyphInfo(
            this.font,
            this.font._cmapProcessor.lookup(last, code),
            [last, code],
            null,
            stringIndex,
          ),
        );
      } else if (state === 0 && nextState === 0) {
        // Normal codepoint following normal codepoint.
        glyphs.push(
          new GlyphInfo(
            this.font,
            this.font._cmapProcessor.lookup(last),
            [last],
            null,
            stringIndex,
          ),
        );
      }
      last = code;
      state = nextState;
    }

    return glyphs;
  }

  substitute(glyphRun) {
    // Call the advanced layout engine to make substitutions
    if (this.engine && this.engine.substitute) {
      this.engine.substitute(glyphRun);
    }
  }

  position(glyphRun) {
    // Get initial glyph positions
    glyphRun.positions = glyphRun.glyphs.map(
      glyph => new GlyphPosition(glyph.advanceWidth),
    );
    let positioned = null;

    // Call the advanced layout engine. Returns the features applied.
    if (this.engine && this.engine.position) {
      positioned = this.engine.position(glyphRun);
    }

    // if there is no GPOS table, use unicode properties to position marks.
    if (!positioned && (!this.engine || this.engine.fallbackPosition)) {
      if (!this.unicodeLayoutEngine) {
        this.unicodeLayoutEngine = new UnicodeLayoutEngine(this.font);
      }

      this.unicodeLayoutEngine.positionGlyphs(
        glyphRun.glyphs,
        glyphRun.positions,
      );
    }

    // if kerning is not supported by GPOS, do kerning with the TrueType/AAT kern table
    if (
      (!positioned || !positioned.kern) &&
      glyphRun.features.kern !== false &&
      this.font.kern
    ) {
      if (!this.kernProcessor) {
        this.kernProcessor = new KernProcessor(this.font);
      }

      this.kernProcessor.process(glyphRun.glyphs, glyphRun.positions);
      glyphRun.features.kern = true;
    }
  }

  hideDefaultIgnorables(glyphs, positions) {
    let space = this.font.glyphForCodePoint(0x20);
    for (let i = 0; i < glyphs.length; i++) {
      if (this.isDefaultIgnorable(glyphs[i].codePoints[0])) {
        glyphs[i] = space;
        positions[i].xAdvance = 0;
        positions[i].yAdvance = 0;
      }
    }
  }

  isDefaultIgnorable(ch) {
    // From DerivedCoreProperties.txt in the Unicode database,
    // minus U+115F, U+1160, U+3164 and U+FFA0, which is what
    // Harfbuzz and Uniscribe do.
    let plane = ch >> 16;
    if (plane === 0) {
      // BMP
      switch (ch >> 8) {
        case 0x00:
          return ch === 0x00ad;
        case 0x03:
          return ch === 0x034f;
        case 0x06:
          return ch === 0x061c;
        case 0x17:
          return 0x17b4 <= ch && ch <= 0x17b5;
        case 0x18:
          return 0x180b <= ch && ch <= 0x180e;
        case 0x20:
          return (
            (0x200b <= ch && ch <= 0x200f) ||
            (0x202a <= ch && ch <= 0x202e) ||
            (0x2060 <= ch && ch <= 0x206f)
          );
        case 0xfe:
          return (0xfe00 <= ch && ch <= 0xfe0f) || ch === 0xfeff;
        case 0xff:
          return 0xfff0 <= ch && ch <= 0xfff8;
        default:
          return false;
      }
    } else {
      // Other planes
      switch (plane) {
        case 0x01:
          return (
            (0x1bca0 <= ch && ch <= 0x1bca3) || (0x1d173 <= ch && ch <= 0x1d17a)
          );
        case 0x0e:
          return 0xe0000 <= ch && ch <= 0xe0fff;
        default:
          return false;
      }
    }
  }

  getAvailableFeatures(script, language) {
    let features = [];

    if (this.engine) {
      features.push(...this.engine.getAvailableFeatures(script, language));
    }

    if (this.font.kern && features.indexOf('kern') === -1) {
      features.push('kern');
    }

    return features;
  }

  stringsForGlyph(gid) {
    let result = new Set();

    let codePoints = this.font._cmapProcessor.codePointsForGlyph(gid);
    for (let codePoint of codePoints) {
      result.add(String.fromCodePoint(codePoint));
    }

    if (this.engine && this.engine.stringsForGlyph) {
      for (let string of this.engine.stringsForGlyph(gid)) {
        result.add(string);
      }
    }

    return Array.from(result);
  }
}
