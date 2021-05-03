import r from 'restructure';
import { cache } from './decorators';
import fontkit from './base';
import Directory from './tables/directory';
import tables from './tables';
import CmapProcessor from './CmapProcessor';
import LayoutEngine from './layout/LayoutEngine';
import TTFGlyph from './glyph/TTFGlyph';
import CFFGlyph from './glyph/CFFGlyph';
import SBIXGlyph from './glyph/SBIXGlyph';
import COLRGlyph from './glyph/COLRGlyph';
import GlyphVariationProcessor from './glyph/GlyphVariationProcessor';
import TTFSubset from './subset/TTFSubset';
import CFFSubset from './subset/CFFSubset';
import BBox from './glyph/BBox';

/**
 * This is the base class for all SFNT-based font formats in fontkit.
 * It supports TrueType, and PostScript glyphs, and several color glyph formats.
 */
export default class TTFFont {
  static probe(buffer) {
    let format = buffer.toString('ascii', 0, 4);
    return format === 'true' || format === 'OTTO' || format === String.fromCharCode(0, 1, 0, 0);
  }

  constructor(stream, variationCoords = null) {
    this.defaultLanguage = null;
    this.stream = stream;
    this.variationCoords = variationCoords;

    this._directoryPos = this.stream.pos;
    this._tables = {};
    this._glyphs = {};
    this._decodeDirectory();

    // define properties for each table to lazily parse
    for (let tag in this.directory.tables) {
      let table = this.directory.tables[tag];
      if (tables[tag] && table.length > 0) {
        Object.defineProperty(this, tag, {
          get: this._getTable.bind(this, table)
        });
      }
    }
  }

  setDefaultLanguage(lang = null) {
    this.defaultLanguage = lang;
  }

  _getTable(table) {
    if (!(table.tag in this._tables)) {
      try {
        this._tables[table.tag] = this._decodeTable(table);
      } catch (e) {
        if (fontkit.logErrors) {
          console.error(`Error decoding table ${table.tag}`);
          console.error(e.stack);
        }
      }
    }

    return this._tables[table.tag];
  }

  _getTableStream(tag) {
    let table = this.directory.tables[tag];
    if (table) {
      this.stream.pos = table.offset;
      return this.stream;
    }

    return null;
  }

  _decodeDirectory() {
    return this.directory = Directory.decode(this.stream, {_startOffset: 0});
  }

  _decodeTable(table) {
    let pos = this.stream.pos;

    let stream = this._getTableStream(table.tag);
    let result = tables[table.tag].decode(stream, this, table.length);

    this.stream.pos = pos;
    return result;
  }

  /**
   * Gets a string from the font's `name` table
   * `lang` is a BCP-47 language code.
   * @return {string}
   */
  getName(key, lang = this.defaultLanguage || fontkit.defaultLanguage) {
    let record = this.name && this.name.records[key];
    if (record) {
      // Attempt to retrieve the entry, depending on which translation is available:
      return (
          record[lang]
          || record[this.defaultLanguage]
          || record[fontkit.defaultLanguage]
          || record['en']
          || record[Object.keys(record)[0]] // Seriously, ANY language would be fine
          || null
      );
    }

    return null;
  }

  /**
   * The unique PostScript name for this font, e.g. "Helvetica-Bold"
   * @type {string}
   */
  get postscriptName() {
    return this.getName('postscriptName');
  }

  /**
   * The font's full name, e.g. "Helvetica Bold"
   * @type {string}
   */
  get fullName() {
    return this.getName('fullName');
  }

  /**
   * The font's family name, e.g. "Helvetica"
   * @type {string}
   */
  get familyName() {
    return this.getName('fontFamily');
  }

  /**
   * The font's sub-family, e.g. "Bold".
   * @type {string}
   */
  get subfamilyName() {
    return this.getName('fontSubfamily');
  }

  /**
   * The font's copyright information
   * @type {string}
   */
  get copyright() {
    return this.getName('copyright');
  }

  /**
   * The font's version number
   * @type {string}
   */
  get version() {
    return this.getName('version');
  }

  /**
   * The font’s [ascender](https://en.wikipedia.org/wiki/Ascender_(typography))
   * @type {number}
   */
  get ascent() {
    return this.hhea.ascent;
  }

  /**
   * The font’s [descender](https://en.wikipedia.org/wiki/Descender)
   * @type {number}
   */
  get descent() {
    return this.hhea.descent;
  }

  /**
   * The amount of space that should be included between lines
   * @type {number}
   */
  get lineGap() {
    return this.hhea.lineGap;
  }

  /**
   * The offset from the normal underline position that should be used
   * @type {number}
   */
  get underlinePosition() {
    return this.post.underlinePosition;
  }

  /**
   * The weight of the underline that should be used
   * @type {number}
   */
  get underlineThickness() {
    return this.post.underlineThickness;
  }

  /**
   * If this is an italic font, the angle the cursor should be drawn at to match the font design
   * @type {number}
   */
  get italicAngle() {
    return this.post.italicAngle;
  }

  /**
   * The height of capital letters above the baseline.
   * See [here](https://en.wikipedia.org/wiki/Cap_height) for more details.
   * @type {number}
   */
  get capHeight() {
    let os2 = this['OS/2'];
    return os2 ? os2.capHeight : this.ascent;
  }

  /**
   * The height of lower case letters in the font.
   * See [here](https://en.wikipedia.org/wiki/X-height) for more details.
   * @type {number}
   */
  get xHeight() {
    let os2 = this['OS/2'];
    return os2 ? os2.xHeight : 0;
  }

  /**
   * The number of glyphs in the font.
   * @type {number}
   */
  get numGlyphs() {
    return this.maxp.numGlyphs;
  }

  /**
   * The size of the font’s internal coordinate grid
   * @type {number}
   */
  get unitsPerEm() {
    return this.head.unitsPerEm;
  }

  /**
   * The font’s bounding box, i.e. the box that encloses all glyphs in the font.
   * @type {BBox}
   */
  @cache
  get bbox() {
    return Object.freeze(new BBox(this.head.xMin, this.head.yMin, this.head.xMax, this.head.yMax));
  }

  @cache
  get _cmapProcessor() {
    return new CmapProcessor(this.cmap);
  }

  /**
   * An array of all of the unicode code points supported by the font.
   * @type {number[]}
   */
  @cache
  get characterSet() {
    return this._cmapProcessor.getCharacterSet();
  }

  /**
   * Returns whether there is glyph in the font for the given unicode code point.
   *
   * @param {number} codePoint
   * @return {boolean}
   */
  hasGlyphForCodePoint(codePoint) {
    return !!this._cmapProcessor.lookup(codePoint);
  }

  /**
   * Maps a single unicode code point to a Glyph object.
   * Does not perform any advanced substitutions (there is no context to do so).
   *
   * @param {number} codePoint
   * @return {Glyph}
   */
  glyphForCodePoint(codePoint) {
    return this.getGlyph(this._cmapProcessor.lookup(codePoint), [codePoint]);
  }

  /**
   * Returns an array of Glyph objects for the given string.
   * This is only a one-to-one mapping from characters to glyphs.
   * For most uses, you should use font.layout (described below), which
   * provides a much more advanced mapping supporting AAT and OpenType shaping.
   *
   * @param {string} string
   * @return {Glyph[]}
   */
  glyphsForString(string) {
    let glyphs = [];
    let len = string.length;
    let idx = 0;
    let last = -1;
    let state = -1;

    while (idx <= len) {
      let code = 0;
      let nextState = 0;

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
        nextState = ((0xfe00 <= code && code <= 0xfe0f) || (0xe0100 <= code && code <= 0xe01ef)) ? 1 : 0;
      } else {
        idx++;
      }

      if (state === 0 && nextState === 1) {
        // Variation selector following normal codepoint.
        glyphs.push(this.getGlyph(this._cmapProcessor.lookup(last, code), [last, code]));
      } else if (state === 0 && nextState === 0) {
        // Normal codepoint following normal codepoint.
        glyphs.push(this.glyphForCodePoint(last));
      }

      last = code;
      state = nextState;
    }

    return glyphs;
  }

  @cache
  get _layoutEngine() {
    return new LayoutEngine(this);
  }

  /**
   * Returns a GlyphRun object, which includes an array of Glyphs and GlyphPositions for the given string.
   *
   * @param {string} string
   * @param {string[]} [userFeatures]
   * @param {string} [script]
   * @param {string} [language]
   * @param {string} [direction]
   * @return {GlyphRun}
   */
  layout(string, userFeatures, script, language, direction) {
    return this._layoutEngine.layout(string, userFeatures, script, language, direction);
  }

  /**
   * Returns an array of strings that map to the given glyph id.
   * @param {number} gid - glyph id
   */
  stringsForGlyph(gid) {
    return this._layoutEngine.stringsForGlyph(gid);
  }

  /**
   * An array of all [OpenType feature tags](https://www.microsoft.com/typography/otspec/featuretags.htm)
   * (or mapped AAT tags) supported by the font.
   * The features parameter is an array of OpenType feature tags to be applied in addition to the default set.
   * If this is an AAT font, the OpenType feature tags are mapped to AAT features.
   *
   * @type {string[]}
   */
  get availableFeatures() {
    return this._layoutEngine.getAvailableFeatures();
  }

  getAvailableFeatures(script, language) {
    return this._layoutEngine.getAvailableFeatures(script, language);
  }

  _getBaseGlyph(glyph, characters = []) {
    if (!this._glyphs[glyph]) {
      if (this.directory.tables.glyf) {
        this._glyphs[glyph] = new TTFGlyph(glyph, characters, this);

      } else if (this.directory.tables['CFF '] || this.directory.tables.CFF2) {
        this._glyphs[glyph] = new CFFGlyph(glyph, characters, this);
      }
    }

    return this._glyphs[glyph] || null;
  }

  /**
   * Returns a glyph object for the given glyph id.
   * You can pass the array of code points this glyph represents for
   * your use later, and it will be stored in the glyph object.
   *
   * @param {number} glyph
   * @param {number[]} characters
   * @return {Glyph}
   */
  getGlyph(glyph, characters = []) {
    if (!this._glyphs[glyph]) {
      if (this.directory.tables.sbix) {
        this._glyphs[glyph] = new SBIXGlyph(glyph, characters, this);

      } else if ((this.directory.tables.COLR) && (this.directory.tables.CPAL)) {
        this._glyphs[glyph] = new COLRGlyph(glyph, characters, this);

      } else {
        this._getBaseGlyph(glyph, characters);
      }
    }

    return this._glyphs[glyph] || null;
  }

  /**
   * Returns a Subset for this font.
   * @return {Subset}
   */
  createSubset() {
    if (this.directory.tables['CFF ']) {
      return new CFFSubset(this);
    }

    return new TTFSubset(this);
  }

  /**
   * Returns an object describing the available variation axes
   * that this font supports. Keys are setting tags, and values
   * contain the axis name, range, and default value.
   *
   * @type {object}
   */
  @cache
  get variationAxes() {
    let res = {};
    if (!this.fvar) {
      return res;
    }

    for (let axis of this.fvar.axis) {
      res[axis.axisTag.trim()] = {
        name: axis.name.en,
        min: axis.minValue,
        default: axis.defaultValue,
        max: axis.maxValue
      };
    }

    return res;
  }

  /**
   * Returns an object describing the named variation instances
   * that the font designer has specified. Keys are variation names
   * and values are the variation settings for this instance.
   *
   * @type {object}
   */
  @cache
  get namedVariations() {
    let res = {};
    if (!this.fvar) {
      return res;
    }

    for (let instance of this.fvar.instance) {
      let settings = {};
      for (let i = 0; i < this.fvar.axis.length; i++) {
        let axis = this.fvar.axis[i];
        settings[axis.axisTag.trim()] = instance.coord[i];
      }

      res[instance.name.en] = settings;
    }

    return res;
  }

  /**
   * Returns a new font with the given variation settings applied.
   * Settings can either be an instance name, or an object containing
   * variation tags as specified by the `variationAxes` property.
   *
   * @param {object} settings
   * @return {TTFFont}
   */
  getVariation(settings) {
    if (!(this.directory.tables.fvar && ((this.directory.tables.gvar && this.directory.tables.glyf) || this.directory.tables.CFF2))) {
      throw new Error('Variations require a font with the fvar, gvar and glyf, or CFF2 tables.');
    }

    if (typeof settings === 'string') {
      settings = this.namedVariations[settings];
    }

    if (typeof settings !== 'object') {
      throw new Error('Variation settings must be either a variation name or settings object.');
    }

    // normalize the coordinates
    let coords = this.fvar.axis.map((axis, i) => {
      let axisTag = axis.axisTag.trim();
      if (axisTag in settings) {
        return Math.max(axis.minValue, Math.min(axis.maxValue, settings[axisTag]));
      } else {
        return axis.defaultValue;
      }
    });

    let stream = new r.DecodeStream(this.stream.buffer);
    stream.pos = this._directoryPos;

    let font = new TTFFont(stream, coords);
    font._tables = this._tables;

    return font;
  }

  @cache
  get _variationProcessor() {
    if (!this.fvar) {
      return null;
    }

    let variationCoords = this.variationCoords;

    // Ignore if no variation coords and not CFF2
    if (!variationCoords && !this.CFF2) {
      return null;
    }

    if (!variationCoords) {
      variationCoords = this.fvar.axis.map(axis => axis.defaultValue);
    }

    return new GlyphVariationProcessor(this, variationCoords);
  }

  // Standardized format plugin API
  getFont(name) {
    return this.getVariation(name);
  }
}
