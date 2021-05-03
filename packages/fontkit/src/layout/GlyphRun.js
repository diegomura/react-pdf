import BBox from '../glyph/BBox';
import * as Script from '../layout/Script';

/**
 * Represents a run of Glyph and GlyphPosition objects.
 * Returned by the font layout method.
 */
export default class GlyphRun {
  constructor(glyphs, features, script, language, direction) {
    /**
     * An array of Glyph objects in the run
     * @type {Glyph[]}
     */
    this.glyphs = glyphs;

    /**
     * An array of GlyphPosition objects for each glyph in the run
     * @type {GlyphPosition[]}
     */
    this.positions = null;

    /**
     * The script that was requested for shaping. This was either passed in or detected automatically.
     * @type {string}
     */
    this.script = script;

    /**
     * The language requested for shaping, as passed in. If `null`, the default language for the
     * script was used.
     * @type {string}
     */
    this.language = language || null;

    /**
     * The direction requested for shaping, as passed in (either ltr or rtl).
     * If `null`, the default direction of the script is used.
     * @type {string}
     */
    this.direction = direction || Script.direction(script);

    /**
     * The features requested during shaping. This is a combination of user
     * specified features and features chosen by the shaper.
     * @type {object}
     */
    this.features = {};

    // Convert features to an object
    if (Array.isArray(features)) {
      for (let tag of features) {
        this.features[tag] = true;
      }
    } else if (typeof features === 'object') {
      this.features = features;
    }
  }

  /**
   * The total advance width of the run.
   * @type {number}
   */
  get advanceWidth() {
    let width = 0;
    for (let position of this.positions) {
      width += position.xAdvance;
    }

    return width;
  }

 /**
  * The total advance height of the run.
  * @type {number}
  */
  get advanceHeight() {
    let height = 0;
    for (let position of this.positions) {
      height += position.yAdvance;
    }

    return height;
  }

 /**
  * The bounding box containing all glyphs in the run.
  * @type {BBox}
  */
  get bbox() {
    let bbox = new BBox;

    let x = 0;
    let y = 0;
    for (let index = 0; index < this.glyphs.length; index++) {
      let glyph = this.glyphs[index];
      let p = this.positions[index];
      let b = glyph.bbox;

      bbox.addPoint(b.minX + x + p.xOffset, b.minY + y + p.yOffset);
      bbox.addPoint(b.maxX + x + p.xOffset, b.maxY + y + p.yOffset);

      x += p.xAdvance;
      y += p.yAdvance;
    }

    return bbox;
  }
}
